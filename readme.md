This repository contains a production ready multi agent AI system built with:

Gemini 1.5 Flash for reasoning
MCP Agents (AgentA & AgentB)
AI enabled Orchestrator
FastAPI as the public API
PostgreSQL with two isolated schemas
Docker Compose for full deployment

Each agent handles a separate schema, performs AI powered analysis, and stores long term memory.
The orchestrator uses Gemini to decide which agent to call and merges results into a final answer.

FastAPI (Public API)
        │
        ▼
AI Orchestrator (Gemini Reasoning)
        │
 ┌──────┴────────┐
 ▼               ▼
AgentA         AgentB
(schema1)     (schema2)
        │
        ▼
PostgreSQL (Single DB, Two Schemas)

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
	
	
Real Time Flow Diagram:
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
  │       ├── fetch data
  │       ├── analyze with Gemini
  │       └── return results
  │
  └──► AgentB (schema2)
          ├── fetch data
          ├── analyze with Gemini
          └── return results
  │
  ▼
Orchestrator → Gemini final reasoning
  │
  ▼
FastAPI → Client

pip install -r requirements.txt

cd agentA
python server.py

cd agentB
python server.py

cd fastapi_app
uvicorn main:app --reload --port 9000

	
Run the Entire System
docker compose up -d --build
docker ps -a

Services:
| Component | Port |
| --- | --- |
| FastAPI | **9000** |
| Orchestrator | **9001** |
| AgentA | **8001** |
| AgentB | **8002** |
| PostgreSQL | **5432** |

Database Setup:
docker exec -it pg_main psql -U admin -d maindb

Inside psql:
CREATE SCHEMA customer1;
CREATE SCHEMA customer2;

CREATE TABLE IF NOT EXISTS customer1.customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    country TEXT
);

CREATE TABLE IF NOT EXISTS customer2.customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    country TEXT
);

INSERT INTO customer1.customers (name, email, phone, city, country) VALUES
('Aarav Kumar', 'aarav.kumar@example.com', '+971501112233', 'Dubai', 'UAE'),
('Riya Sharma', 'riya.sharma@example.com', '+971502223344', 'Abu Dhabi', 'UAE'),
('Karan Patel', 'karan.patel@example.com', '+971503334455', 'Sharjah', 'UAE'),
('Sneha Reddy', 'sneha.reddy@example.com', '+971504445566', 'Hyderabad', 'India'),
('Vikram Singh', 'vikram.singh@example.com', '+971505556677', 'Delhi', 'India'),
('Meera Joshi', 'meera.joshi@example.com', '+971506667788', 'Mumbai', 'India'),
('Arjun Verma', 'arjun.verma@example.com', '+971507778899', 'Dubai', 'UAE'),
('Pooja Nair', 'pooja.nair@example.com', '+971508889900', 'Kochi', 'India'),
('Rahul Mehta', 'rahul.mehta@example.com', '+971509990011', 'Pune', 'India'),
('Divya Kapoor', 'divya.kapoor@example.com', '+971501234567', 'Bangalore', 'India');

INSERT INTO customer2.customers (name, email, phone, city, country) VALUES
('Sameer Khan', 'sameer.khan@example.com', '+971501778899', 'Dubai', 'UAE'),
('Anita Desai', 'anita.desai@example.com', '+971502889900', 'Abu Dhabi', 'UAE'),
('Farhan Ali', 'farhan.ali@example.com', '+971503990011', 'Sharjah', 'UAE'),
('Lakshmi Menon', 'lakshmi.menon@example.com', '+971504110022', 'Chennai', 'India'),
('Suresh Babu', 'suresh.babu@example.com', '+971505220033', 'Hyderabad', 'India'),
('Nisha Kulkarni', 'nisha.kulkarni@example.com', '+971506330044', 'Pune', 'India'),
('Imran Sheikh', 'imran.sheikh@example.com', '+971507440055', 'Dubai', 'UAE'),
('Harini Iyer', 'harini.iyer@example.com', '+971508550066', 'Bangalore', 'India'),
('Rohit Chawla', 'rohit.chawla@example.com', '+971509660077', 'Delhi', 'India'),
('Aditi Rao', 'aditi.rao@example.com', '+971501770088', 'Mumbai', 'India');


Public API — POST(FastAPI):

curl -X POST http://localhost:9000/insights \
  -H "Content-Type: application/json" \
  -d '{"customer_type": "schema1", "question": "Give insights"}'


Internal API — Orchestrator API:

curl -X POST http://localhost:9001/orchestrate \
  -H "Content-Type: application/json" \
  -d '{"customer_type": "schema2", "question": "Analyze schema2"}'