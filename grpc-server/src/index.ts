import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

// Proto file path
const PROTO_PATH = path.resolve(__dirname, "../proto/service.proto");

// Load proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Implement your service methods here
const serviceImplementation = {
  // Example method
  SayHello: (call: any, callback: any) => {
    const { name } = call.request;
    callback(null, { message: `Hello ${name}!` });
  },
};

// gRPC server port
const GRPC_PORT = process.env.GRPC_PORT || "50051";
// Health check port
const HEALTH_PORT = process.env.HEALTH_PORT || "50052";

// Create gRPC server
function startServer() {
  const server = new grpc.Server();
  // @ts-ignore - Add your service here
  server.addService(protoDescriptor.YourService.service, serviceImplementation);

  server.bindAsync(
    `0.0.0.0:${GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error("Failed to start server:", error);
        return;
      }
      console.log(`gRPC Server running at http://0.0.0.0:${port}`);
    }
  );
}

startServer();

// Health check endpoint
import http from "http";
const healthServer = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200);
    res.end("OK");
    return;
  }
  res.writeHead(404);
  res.end();
});

healthServer.listen(HEALTH_PORT, () => {
  console.log(`Health check server running on port ${HEALTH_PORT}`);
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  healthServer.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
