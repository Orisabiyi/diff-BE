import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { CreateChat } from "../types/controller";

export async function chatAuthMiddleware(request: FastifyRequest<{ Body: CreateChat }>, reply: FastifyReply) {
  const token = request.headers.authorization?.split(" ").pop();

  if (!token) {
    return reply.status(401).send({
      message: "Authorization token is required"
    });
  }

  try {
    const decoded = await request.jwtVerify();

    if (!decoded) {
      return reply.status(401).send({
        message: "Invalid token"
      });
    }

    request.user = decoded;
  } catch (error) {
    return reply.status(401).send({
      message: "Invalid token"
    });
  }
}