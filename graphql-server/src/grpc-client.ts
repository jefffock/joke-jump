import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

export function createGrpcClient() {
  const PROTO_PATH = __dirname + "/../proto/service.proto";
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

  // @ts-ignore
  return new protoDescriptor.YourService(
    process.env.GRPC_SERVER_URL || "localhost:4000",
    grpc.credentials.createInsecure()
  );
}
