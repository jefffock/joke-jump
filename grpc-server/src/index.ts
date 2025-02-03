import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { Pool } from "pg";

// Create PostgreSQL connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "myapp",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
});

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

const serviceImplementation = {
 
  GetVideos: async (_: any, callback: any) => {
    try {
      const result = await pool.query("SELECT * FROM videos");
      const videos = result.rows.map((row) => ({
        id: row.id,
        youtube_id: row.youtube_id,
        created_at: row.created_at.toISOString(),
        updated_at: row.updated_at.toISOString(),
      }));
      callback(null, { videos });
    } catch (error) {
      callback(error);
    }
  },
};

const GRPC_PORT = process.env.GRPC_PORT || "50051";
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
