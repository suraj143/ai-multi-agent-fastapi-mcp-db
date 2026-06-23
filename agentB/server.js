// agentB/server.js
import 'dotenv/config';
import pg from 'pg';
import { WebSocketServer } from 'ws';
import { callGemini } from './common/gemini.js';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'admin123',
  database: process.env.DB_NAME || 'maindb',
});

function rpcResponse(id, result) {
  return JSON.stringify({ jsonrpc: "2.0", id, result });
}

function rpcError(id, message) {
  return JSON.stringify({ jsonrpc: "2.0", id, error: { message } });
}

const PORT = Number(process.env.AGENTB_PORT || 8002);
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws) => {
  console.log("AgentB connected");

  ws.on("message", async (msg) => {
    let req;
    try { req = JSON.parse(msg.toString()); }
    catch { return ws.send(rpcError(null, "invalid json")); }

    if (req.method !== "tools/call") {
      return ws.send(rpcError(req.id, "unsupported method"));
    }

    const tool = req.params.name;

    try {
      if (tool === "fetch_schema2_customers") {
        const client = await pool.connect();
        try {
          await client.query("SET search_path TO customer2;");
          const res = await client.query("SELECT id, name FROM customers;");
          ws.send(rpcResponse(req.id, { content: [{ type: "application/json", data: res.rows }], isError: false }));
        } finally { client.release(); }
      }

      else if (tool === "analyze_customer2_data") {
        const client = await pool.connect();
        try {
          await client.query("SET search_path TO customer2;");
          const res = await client.query("SELECT id, name FROM customers;");
          const prompt = `Analyze schema2 customers:\n${JSON.stringify(res.rows)}`;
          const analysis = await callGemini(prompt);
          ws.send(rpcResponse(req.id, { content: [{ type: "text", text: analysis }], isError: false }));
        } finally { client.release(); }
      }

      else {
        ws.send(rpcError(req.id, `unknown tool: ${tool}`));
      }

    } catch (err) {
      ws.send(rpcError(req.id, err.message));
    }
  });
});

console.log(`AgentB running on ws://0.0.0.0:${PORT}`);
