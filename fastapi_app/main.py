import os
from fastapi import FastAPI
import httpx

ORCHESTRATOR_URL = os.getenv("ORCHESTRATOR_URL", "http://orchestrator:9001/orchestrate")

app = FastAPI()

@app.post("/insights")
async def get_insights(payload: dict):
    async with httpx.AsyncClient() as client:
        resp = await client.post(ORCHESTRATOR_URL, json=payload)
        return resp.json()
