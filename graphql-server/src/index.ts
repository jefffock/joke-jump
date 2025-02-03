import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { createGrpcClient } from "./grpc-client";

async function startServer() {
  // Create gRPC client
  const grpcClient = createGrpcClient();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // GraphQL server port
  const GRAPHQL_PORT = process.env.GRAPHQL_PORT || "4000"; // Main GraphQL port
  // Health check port
  const HEALTH_PORT = process.env.HEALTH_PORT || "4001"; // GraphQL health check port

  // Start server
  const { url } = await startStandaloneServer(server, {
    context: async () => ({
      grpcClient,
    }),
    listen: { port: parseInt(GRAPHQL_PORT) },
  });

  console.log(`🚀 Server ready at ${url}`);

  // Health check endpoint
  const http = require("http");
  const healthServer = http.createServer((req: any, res: any) => {
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
}

startServer().catch(console.error);
