import WebSocket from "ws";
import http from "http";

/**
 *  ERR_PNPM_ADDING_TO_ROOT  
 * Running this command will add the dependency to the workspace root,
 * which might not be what you want - if you really meant it,
 * make it explicit by running this command again with the -w flag (or --workspace-root). 
 * If you don't want to see this warning anymore, you may set the ignore-workspace-root-check setting to true.
 */

const wss = new WebSocket.Server({ noServer: true });
// const setupWSConnection = require("./utils.js").setupWSConnection;

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("okay");
});

// wss.on("connection", setupWSConnection);

server.on("upgrade", (request, socket, head) => {
  // @ts-ignore
  const handleAuth = (ws) => {
    wss.emit("connection", ws, request);
  };
  wss.handleUpgrade(request, socket, head, handleAuth);
});

// @ts-ignore
server.listen(port, host, () => {
  console.log(`running at '${host}' on port ${port}`);
});
