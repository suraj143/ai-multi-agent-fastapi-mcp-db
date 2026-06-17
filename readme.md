# Multi-Agent AI System with Gemini & MCP

A production-ready, multi-agent AI architecture built to handle isolated data schemas using decentralized intelligence. The system dynamically orchestrates data analysis across separate database environments using LLM-driven reasoning.

## 🚀 Features

* **Gemini 1.5 Flash:** Core engine driving the system's reasoning, agent routing, and final synthesis.
* **MCP Agents (AgentA & AgentB):** Specialized agents managing distinct data schemas with long-term memory capabilities.
* **AI-Enabled Orchestrator:** Intelligent router that evaluates tasks and delegates queries to the appropriate agent.
* **FastAPI Gateway:** High-performance, public-facing REST API.
* **PostgreSQL Multi-Tenancy:** Single database engine utilizing fully isolated database schemas for data security.
* **Dockerized Deployment:** Full environment orchestration using Docker Compose.

---

## 🏗️ System Architecture

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
PostgreSQL (Single DB, Two Schemas)

File Structure:
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
	
Real-Time Data Flow:
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
  │     ├── fetch data
  │     ├── analyze with Gemini
  │     └── return results
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

Port & Service Matrix:
| **Component** | **Port** | **Description** |
| --- | --- | --- |
| **[FastAPI](ca://s?q=What_is_FastAPI)** | **9000** | Public API Gateway |
| **[Orchestrator](ca://s?q=What_is_an_AI_Orchestrator)** | **9001** | Internal Router Engine |
| **[AgentA](ca://s?q=Explain_MCP_Agents)** | **8001** | Dedicated Agent for Schema 1 |
| **[AgentB](ca://s?q=Explain_MCP_Agents)** | **8002** | Dedicated Agent for Schema 2 |
| **[PostgreSQL](ca://s?q=PostgreSQL_overview)** | **5432** | Core System Database |
```

Deployment & Setup
Option 1: Docker Compose (Recommended):
```bash
# Build and run all services in the background
docker compose up -d --build

# Verify that all containers are running successfully
docker ps -a
```

Option 2: Local Development Setup
If you prefer to run the services individually for testing:
```python
# Install dependencies
pip install -r requirements.txt

# Start Agent A
cd agentA
python server.py

# Start Agent B
cd ../agentB
python server.py

# Start the Public API Gateway
cd ../fastapi_app
uvicorn main:app --reload --port 9000
```

Database Initialization:
After starting the containers, seed your database schemas and sample data by executing the following steps.
1. Access the PostgreSQL CLI container
sh ```
docker exec -it pg_main psql -U admin -d maindb
```
2. Execute SQL Seed Script
Inside the psql interactive prompt, run the following commands:
sh ```
-- Create Isolated Schemas
CREATE SCHEMA customer1;
CREATE SCHEMA customer2;

-- Schema 1 Structure
CREATE TABLE IF NOT EXISTS customer1.customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    country TEXT
);

-- Schema 2 Structure
CREATE TABLE IF NOT EXISTS customer2.customers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    city TEXT,
    country TEXT
);

-- Seed Schema 1 Data
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

-- Seed Schema 2 Data
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
```

API Usage & Examples:
Public Gateway Endpoint (FastAPI):
Query the system via the entrypoint. The router automatically decides how to process the request based on the context payload.
sh ```
curl -X POST http://localhost:9000/insights \
  -H "Content-Type: application/json" \
  -d '{
    "customer_type": "schema1",
    "question": "Give insights"
  }'
```
Internal Orchestrator Endpoint:
Bypass the entry gateway to hit the engine directly for debugging router configurations
sh ```
curl -X POST http://localhost:9001/orchestrate \
  -H "Content-Type: application/json" \
  -d '{
    "customer_type": "schema2",
    "question": "Analyze schema2"
  }'
```