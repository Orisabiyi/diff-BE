import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function getDirectories(this: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
  const collection = this.mongo.db?.collection("directory-data");

  if (!collection) {
    return reply.status(500).send({
      message: "Failed to connect to the database",
    });
  }

  const directories = await collection.find({}).toArray();

  return reply.status(200).send({
    message: "Directories fetched successfully",
    data: directories,
  });
}