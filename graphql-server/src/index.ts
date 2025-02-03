import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { createGrpcClient } from "./grpc-client";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";

async function startServer() {
  // Create gRPC client
  const grpcClient = createGrpcClient();

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // GraphQL server port
  const GRAPHQL_PORT = process.env.GRAPHQL_PORT || "4001"; // Main GraphQL port
  // Health check port
  const HEALTH_PORT = process.env.HEALTH_PORT || "4002"; // GraphQL health check port

  await server.start();

  const app = express();

  // Enable CORS for all routes
  app.use(cors());
  app.use(express.json());

  app.use(
    "/",
    expressMiddleware(server, {
      context: async () => ({
        grpcClient,
      }),
    })
  );

  app.listen(parseInt(GRAPHQL_PORT), "0.0.0.0", () => {
    console.log(`🚀 Server ready at http://0.0.0.0:${GRAPHQL_PORT}/`);
  });

  // Health check endpoint
  const healthServer = express();
  healthServer.get("/health", (_, res) => {
    res.send("OK");
  });

  healthServer.listen(HEALTH_PORT, () => {
    console.log(`Health check server running on port ${HEALTH_PORT}`);
  });
}

startServer().catch(console.error);
