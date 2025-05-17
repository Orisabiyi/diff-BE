import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function getDirectories(this: FastifyInstance, request: FastifyRequest<{ Params: { action: string } }>, reply: FastifyReply) {
  const { action } = request.params;
  const collection = this.mongo.db?.collection("directory-data");

  if (!collection) {
    return reply.status(500).send({
      message: "Failed to connect to the database",
    });
  }

  const directories = await collection.find({}).toArray();

  if (action === "all") {
    return reply.status(200).send({
      message: "Directories retrieved successfully",
      data: directories,
    });
  }
}