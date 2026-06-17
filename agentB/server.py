import os
import json
from pathlib import Path
import psycopg2
from mcp.server import Server
from common.gemini_client import get_model

MEMORY_FILE = Path("memory_agentB.json")
server = Server("AgentB")
model = get_model()

def load_memory():
    if MEMORY_FILE.exists():
        return json.loads(MEMORY_FILE.read_text())
    return {}

def save_memory(memory):
    MEMORY_FILE.write_text(json.dumps(memory, indent=2))

@server.tool()
def fetch_schema2_customers():
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "postgres"),
        port=int(os.getenv("DB_PORT", "5432")),
        user=os.getenv("DB_USER", "admin"),
        password=os.getenv("DB_PASS", "admin123"),
        dbname=os.getenv("DB_NAME", "maindb"),
    )
    cur = conn.cursor()
    cur.execute("SET search_path TO customer2;")
    cur.execute("SELECT id, name FROM customers;")
    rows = cur.fetchall()
    conn.close()
    return rows

@server.tool()
def analyze_customer_data():
    data = fetch_schema2_customers()
    memory = load_memory()

    prompt = f"""
You are AgentB, responsible for schema2 customers.
Memory: {memory}
Data: {data}

1. Summarize key insights.
2. Highlight any patterns.
3. Suggest one action item.
"""

    resp = model.generate_content(prompt)
    text = resp.text

    mem = load_memory()
    mem.setdefault("insights", []).append(text)
    save_memory(mem)

    return text

@server.tool()
def recall_memory():
    return load_memory()

if __name__ == "__main__":
    server.run(host="0.0.0.0", port=8002)
