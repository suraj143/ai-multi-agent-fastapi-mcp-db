# 🚀 Multi-Agent AI System with Gemini & MCP

A production-ready, multi-agent AI architecture designed to analyze isolated data domains using decentralized intelligence. The platform dynamically orchestrates data analysis across separate PostgreSQL schemas through LLM-driven reasoning powered by Gemini.

---

## 📌 Overview

This system demonstrates how multiple AI agents can independently manage isolated datasets while a central AI orchestrator intelligently routes requests and synthesizes responses.

The architecture enables:

* Secure multi-tenant data isolation
* Agent-specific reasoning and memory
* Dynamic task routing
* LLM-powered analytics
* Containerized deployment using Docker

---

## ✨ Features

### 🧠 Gemini 1.5 Flash

Acts as the reasoning engine responsible for:

* Agent selection
* Task routing
* Data interpretation
* Final response synthesis

### 🤖 MCP Agents (AgentA & AgentB)

Dedicated AI agents that:

* Operate independently
* Manage isolated database schemas
* Perform schema-specific analysis
* Maintain contextual memory

### 🎯 AI Orchestrator

An intelligent routing layer that:

* Receives incoming requests
* Evaluates intent
* Selects the correct agent
* Aggregates results
* Produces final AI-generated insights

### ⚡ FastAPI Gateway

Public-facing REST API providing:

* High performance
* Async request handling
* Unified entry point

### 🗄 PostgreSQL Multi-Tenancy

Single PostgreSQL instance with:

* Schema-based isolation
* Secure tenant separation
* Shared infrastructure

### 🐳 Dockerized Infrastructure

Complete deployment stack managed through Docker Compose.

---

# 🏗 System Architecture

```text
FastAPI (Public API)
       │
       ▼
AI Orchestrator (Gemini Reasoning)
       │
 ┌─────┴─────┐
 ▼           ▼
AgentA     AgentB
(schema1)  (schema2)
       │
       ▼
PostgreSQL (Single DB, Multiple Schemas)
```

---

# 📂 Project Structure

```text
project/
│
├── docker-compose.yml
├── .env
│
├── fastapi_app/
│   ├── Dockerfile
│   └── main.py
│
├── orchestrator/
│   ├── Dockerfile
│   └── orchestrator.py
│
├── agentA/
│   ├── Dockerfile
│   └── server.py
│
├── agentB/
│   ├── Dockerfile
│   └── server.py
│
└── common/
    ├── __init__.py
    └── gemini_client.py
```

---

# 🔄 Real-Time Data Flow

```text
Client
  │
  ▼
POST /insights (FastAPI)
  │
  ▼
POST /orchestrate (Orchestrator)
  │
  ▼
Gemini → Decide Agent
  │
  ├──► AgentA (schema1)
  │     ├── Fetch Data
  │     ├── Analyze with Gemini
  │     └── Return Results
  │
  └──► AgentB (schema2)
        ├── Fetch Data
        ├── Analyze with Gemini
        └── Return Results
  │
  ▼
Orchestrator → Gemini Final Reasoning
  │
  ▼
FastAPI → Client
```

---

# 🌐 Service & Port Matrix

| Component       | Port | Description               |
| --------------- | ---- | ------------------------- |
| FastAPI Gateway | 9000 | Public API Endpoint       |
| AI Orchestrator | 9001 | Routing & Decision Engine |
| AgentA          | 8001 | Schema 1 AI Agent         |
| AgentB          | 8002 | Schema 2 AI Agent         |
| PostgreSQL      | 5432 | Primary Database          |

---

# 🚀 Deployment

## Option 1: Docker Compose (Recommended)

### Build & Start

```bash
docker compose up -d --build
```

### Verify Containers

```bash
docker ps -a
```

---

## Option 2: Local Development

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start Agent A

```bash
cd agentA
python server.py
```

### Start Agent B

```bash
cd ../agentB
python server.py
```

### Start FastAPI Gateway

```bash
cd ../fastapi_app
uvicorn main:app --reload --port 9000
```

---

# 🗄 Database Initialization

After all containers are running, initialize PostgreSQL schemas and seed sample data.

## Step 1: Access PostgreSQL

```bash
docker exec -it pg_main psql -U admin -d maindb
```

---

## Step 2: Create Schemas

```sql
CREATE SCHEMA customer1;
CREATE SCHEMA customer2;
```

---

## Step 3: Create Tables

### Schema 1

```sql
CREATE TABLE IF NOT EXISTS customer1.customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    country TEXT
);
```

### Schema 2

```sql
CREATE TABLE IF NOT EXISTS customer2.customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    country TEXT
);
```

---

## Step 4: Seed Sample Data

Insert sample customer records into both schemas.

> Use the SQL inserts provided in this repository's seed script or deployment guide.

---

# 📡 API Usage

## FAST-API Public Gateway Endpoint

The API gateway automatically routes requests to the appropriate AI agent.

### Request

```bash
curl -X POST http://localhost:9000/insights
```

### Response

```json
{"jsonrpc":"2.0","id":1,"result":[{"schema":"schema1","fetched":{"jsonrpc":"2.0","id":1782218591264,"result":{"content":[{"type":"application/json","data":[{"id":1,"name":"Aarav Kumar"},{"id":2,"name":"Riya Sharma"},{"id":3,"name":"Karan Patel"},{"id":4,"name":"Sneha Reddy"},{"id":5,"name":"Vikram Singh"},{"id":6,"name":"Meera Joshi"},{"id":7,"name":"Arjun Verma"},{"id":8,"name":"Pooja Nair"},{"id":9,"name":"Rahul Mehta"},{"id":10,"name":"Divya Kapoor"}]}],"isError":false}},"analyzed":{"jsonrpc":"2.0","id":1782218591391,"result":{"content":[{"type":"text","text":"Gemini Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent: [404 Not Found] models/gemini-pro is not found for API version v1beta, or is not supported for generateContent. Call ModelService.ListModels to see the list of available models and their supported methods."}],"isError":false}}},{"schema":"schema2","fetched":{"jsonrpc":"2.0","id":1782218592406,"result":{"content":[{"type":"application/json","data":[{"id":1,"name":"Sameer Khan"},{"id":2,"name":"Anita Desai"},{"id":3,"name":"Farhan Ali"},{"id":4,"name":"Lakshmi Menon"},{"id":5,"name":"Suresh Babu"},{"id":6,"name":"Nisha Kulkarni"},{"id":7,"name":"Imran Sheikh"},{"id":8,"name":"Harini Iyer"},{"id":9,"name":"Rohit Chawla"},{"id":10,"name":"Aditi Rao"}]}],"isError":false}},"analyzed":{"jsonrpc":"2.0","id":1782218592568,"result":{"content":[{"type":"text","text":"Gemini Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent: [404 Not Found] models/gemini-pro is not found for API version v1beta, or is not supported for generateContent. Call ModelService.ListModels to see the list of available models and their supported methods."}],"isError":false}}}]}
```

---

## Internal Orchestrator Endpoint

Useful for debugging routing decisions.

### Request

```bash
curl -X POST http://localhost:9001/orchestrate \
  -H "Content-Type: application/json" \
  -d '{
    "customer_type": "schema2",
    "question": "Analyze schema2"
  }'
```

---

# 🔐 Multi-Tenant Design

The platform uses PostgreSQL schema isolation:

```text
PostgreSQL
│
├── customer1
│   └── customers
│
└── customer2
    └── customers
```

Benefits:

* Strong tenant separation
* Shared infrastructure costs
* Independent agent reasoning
* Simplified scaling

---

# 📈 Example Use Cases

* Customer analytics
* Multi-tenant SaaS platforms
* AI-powered business intelligence
* Data domain isolation
* Autonomous agent ecosystems
* Enterprise AI orchestration

---

# 🛠 Technology Stack

| Layer            | Technology       |
| ---------------- | ---------------- |
| AI Engine        | Gemini 1.5 Flash |
| Agent Framework  | MCP              |
| API Gateway      | FastAPI          |
| Database         | PostgreSQL       |
| Containerization | Docker           |
| Orchestration    | Docker Compose   |
| Language         | Python           |

---

# 🔮 Future Enhancements

* Agent memory persistence
* Vector database integration
* RAG support
* Agent-to-agent collaboration
* Dynamic agent discovery
* Kubernetes deployment
* Observability with Prometheus & Grafana
* Role-based access control (RBAC)

---

# 📜 License

This project is released under the MIT License.

---

## ⭐ Contributing

Contributions, feature requests, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 👨‍💻 Author

Built to demonstrate enterprise-grade Multi-Agent AI architecture using Gemini, MCP, FastAPI, PostgreSQL, and Docker.
