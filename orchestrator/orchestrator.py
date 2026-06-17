import os
from fastapi import FastAPI
from mcp.client import Client
from common.gemini_client import get_model

model = get_model()
app = FastAPI()

async def orchestrate(request: dict):
    decision_prompt = f"""
You are the Orchestrator AI.

We have:
- AgentA: handles schema1 customers
- AgentB: handles schema2 customers

Request: {request}

Decide which agent to use. Respond with exactly 'AgentA' or 'AgentB'.
"""

    decision_resp = model.generate_content(decision_prompt)
    decision = decision_resp.text.strip()

    if "AgentB" in decision:
        agent_name = "AgentB"
        agent_url = "ws://agentb:8002"
        fetch_tool = "fetch_schema2_customers"
        analyze_tool = "analyze_customer_data"
    else:
        agent_name = "AgentA"
        agent_url = "ws://agenta:8001"
        fetch_tool = "fetch_schema1_customers"
        analyze_tool = "analyze_customer_data"

    agent = Client(agent_name, agent_url)
    await agent.connect()

    raw = await agent.call_tool(fetch_tool)
    analysis = await agent.call_tool(analyze_tool)

    await agent.close()

    final_prompt = f"""
You are the Orchestrator AI.

Agent used: {agent_name}
Raw data: {raw}
Agent analysis: {analysis}
User question: {request.get("question")}

Combine everything into a clear, concise answer for the user.
"""

    final_resp = model.generate_content(final_prompt)
    final_answer = final_resp.text

    return {
        "agent": agent_name,
        "raw_data": raw,
        "agent_analysis": analysis,
        "final_answer": final_answer,
    }

@app.post("/orchestrate")
async def orchestrate_endpoint(payload: dict):
    return await orchestrate(payload)
