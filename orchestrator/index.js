// orchestrator/index.js
import { WebSocketServer } from 'ws';
import { orchestrate } from './orchestrator.js';

const PORT = Number(process.env.ORCH_PORT || 9001);
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", socket => {
  console.log("Orchestrator connected");

  socket.on("message", async msg => {
    if (!msg || msg.length === 0) return;

    let req;
    try {
      req = JSON.parse(msg.toString());
    } catch {
      console.log("Invalid JSON:", msg.toString());
      return;
    }

    if (req.method === "orchestrate") {
      const result = await orchestrate(req.params.customers || []);
      socket.send(JSON.stringify({
        jsonrpc: "2.0",
        id: req.id,
        result
      }));
    }
  });
});

console.log(`Orchestrator MCP server running on ws://0.0.0.0:${PORT}`);
