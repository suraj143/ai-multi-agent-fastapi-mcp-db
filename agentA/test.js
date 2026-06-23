import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8001");

ws.on("open", () => {
  console.log("Connected");

  ws.send(JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
      name: "fetch_schema1_customers",
      arguments: {}
    }
  }));
});

ws.on("message", (msg) => {
  console.log("Response:", msg.toString());
});
