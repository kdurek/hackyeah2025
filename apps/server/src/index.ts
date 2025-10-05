import "dotenv/config";
import { createServer } from "node:http";
import fastifyCors from "@fastify/cors";
import fastifyWebsocket, { type WebSocket } from "@fastify/websocket";
import { OpenAPIHandler } from "@orpc/openapi/node";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/node";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import Fastify from "fastify";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";

const baseCorsConfig = {
  origin: process.env.CORS_ORIGIN || "",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  maxAge: 86_400,
};

const rpcHandler = new RPCHandler(appRouter, {
  plugins: [
    new CORSPlugin({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

const fastify = Fastify({
  logger: true,
  serverFactory: (fastifyHandler) => {
    const server = createServer(async (req, res) => {
      const { matched } = await rpcHandler.handle(req, res, {
        context: await createContext(req.headers),
        prefix: "/rpc",
      });

      if (matched) {
        return;
      }

      const apiResult = await apiHandler.handle(req, res, {
        context: await createContext(req.headers),
        prefix: "/api",
      });

      if (apiResult.matched) {
        return;
      }

      fastifyHandler(req, res);
    });

    return server;
  },
});

fastify.register(fastifyCors, baseCorsConfig);

fastify.register(fastifyWebsocket);

// Store all connected clients
const clients = new Set<WebSocket>();

fastify.register((f) =>
  f.get("/ws", { websocket: true }, (socket: WebSocket) => {
    // Add the new client to our set of clients
    clients.add(socket);
    f.log.info("Client connected");

    socket.on("message", (message) => {
      // The `message` is likely a Buffer containing the photo's byte array.
      // We are now broadcasting this message to all connected clients.
      for (const client of clients) {
        if (client.readyState === 1) {
          // Check if the connection is open
          client.send(message.toString());
        }
      }
    });

    socket.on("close", () => {
      // Remove the client from the set when they disconnect
      clients.delete(socket);
      f.log.info("Client disconnected");
    });
  })
);

fastify.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);
      const headers = new Headers();
      for (const [key, value] of Object.entries(request.headers)) {
        if (value) {
          headers.append(key, value.toString());
        }
      }
      const req = new Request(url.toString(), {
        method: request.method,
        headers,
        body: request.body ? JSON.stringify(request.body) : undefined,
      });
      const response = await auth.handler(req);
      reply.status(response.status);
      for (const [key, value] of response.headers) {
        reply.header(key, value);
      }
      reply.send(response.body ? await response.text() : null);
    } catch (error) {
      fastify.log.error({ err: error }, "Authentication Error:");
      reply.status(500).send({
        error: "Internal authentication error",
        code: "AUTH_FAILURE",
      });
    }
  },
});

fastify.get("/", async () => "OK");

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server running on port 3000");
});
