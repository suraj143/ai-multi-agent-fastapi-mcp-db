// orchestrator/orchestrator.js
import WebSocket from "ws";

// --------------------------------------------------
// Connect to an MCP Agent via WebSocket
// --------------------------------------------------
function connectAgent(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    ws.on("open", () => resolve(ws));
    ws.on("error", (err) => reject(err));
  });
}

// --------------------------------------------------
// Call an MCP Tool on an Agent
// --------------------------------------------------
async function callTool(ws, name, args = {}) {
  return new Promise((resolve) => {
    const id = Date.now();

    ws.send(
      JSON.stringify({
        jsonrpc: "2.0",
        id,
        method: "tools/call",
        params: { name, arguments: args }
      })
    );

    ws.on("message", (msg) => {
      try {
        const data = JSON.parse(msg.toString());
        if (data.id === id) resolve(data);
      } catch {
        // ignore invalid JSON
      }
    });
  });
}

// --------------------------------------------------
// Main Orchestration Logic
// --------------------------------------------------
export async function orchestrate(customers) {
  const agentA = await connectAgent("ws://mcp_agentA:8001");
  const agentB = await connectAgent("ws://mcp_agentB:8002");

  const results = [];

  for (const c of customers) {

    // -------------------------
    // SCHEMA 1 (AgentA)
    // -------------------------
    if (c.schema === "schema1") {

      // 1) Fetch only
      if (!c.analyze) {
        const res = await callTool(agentA, "fetch_schema1_customers");
        results.push(res);
        continue;
      }

      // 2) Analyze only
      if (c.analyze === "only") {
        const res = await callTool(agentA, "analyze_customer_data");
        results.push(res);
        continue;
      }

      // 3) Fetch + Analyze
      const fetched = await callTool(agentA, "fetch_schema1_customers");
      const analyzed = await callTool(agentA, "analyze_customer_data");

      results.push({
        schema: "schema1",
        fetched,
        analyzed
      });
    }

    // -------------------------
    // SCHEMA 2 (AgentB)
    // -------------------------
    if (c.schema === "schema2") {

      if (!c.analyze) {
        const res = await callTool(agentB, "fetch_schema2_customers");
        results.push(res);
        continue;
      }

      if (c.analyze === "only") {
        const res = await callTool(agentB, "analyze_customer2_data");
        results.push(res);
        continue;
      }

      const fetched = await callTool(agentB, "fetch_schema2_customers");
      const analyzed = await callTool(agentB, "analyze_customer2_data");

      results.push({
        schema: "schema2",
        fetched,
        analyzed
      });
    }
  }

  return results;
}
