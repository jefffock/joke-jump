import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

export function createGrpcClient() {
  console.log("dirname:>>", __dirname);
  const PROTO_PATH = path.resolve(__dirname, "../proto/service.proto");
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
    process.env.GRPC_SERVER_URL || "grpc-server:50051",
    grpc.credentials.createInsecure()
  );
}
