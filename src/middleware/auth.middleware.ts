import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.split(" ").pop();

  if (!token) {
    return reply.status(401).send({
      message: "Authorization token is required"
    });
  }
}