# fastapi_app/main.py
from fastapi import FastAPI
import websockets
import json

app = FastAPI()

async def call_orchestrator(customers):
    async with websockets.connect("ws://mcp_orchestrator:9001") as ws:
        await ws.send(json.dumps({
            "jsonrpc": "2.0",
            "id": 1,
            "method": "orchestrate",
            "params": {"customers": customers}
        }))
        response = await ws.recv()
        return json.loads(response)
        
@app.post("/insights")
async def insights():
    payload = {
        "customers": [
            {"schema": "schema1", "analyze": True},
            {"schema": "schema2", "analyze": True}
        ]
    }
    return await call_orchestrator(payload["customers"])

@app.post("/orchestrate")
async def run_orchestration(payload: dict):
    customers = payload.get("customers", [])
    result = await call_orchestrator(customers)
    return {"result": result}
