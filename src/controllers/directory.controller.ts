import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function getDirectories(this: FastifyInstance, request: FastifyRequest<{ Params: { action: string }, Querystring: { tag?: string } }>, reply: FastifyReply) {
  const { action } = request.params;
  const { tag } = request.query;
  const collection = this.mongo.db?.collection("directory-data");

  if (!collection) {
    return reply.status(500).send({
      message: "Failed to connect to the database",
    });
  }


  if (action === "all") {
    const directories = await collection.find({}, {
      projection: {
        _id: 0,
        name: 1,
        type: 1,
        description: 1,
        website: 1,
        tags: 1
      }
    }).limit(100).toArray();

    return reply.status(200).send({
      message: "Directories retrieved successfully",
      data: directories,
    });
  }

  if (action === 'category' && tag) {
    const regex = new RegExp(tag, 'i');

    const directories = await collection.find({ tags: { $elemMatch: { $regex: regex } } }, {
      projection: {
        _id: 0,
        name: 1,
        type: 1,
        description: 1,
        website: 1,
        tags: 1
      }
    }).limit(100).toArray();

    return reply.status(200).send({
      message: "Directories retrieved successfully",
      data: directories,
    });
  }

  if (action === 'type' && tag) {
    const directories = await collection.find({ type: tag }, {
      projection: {
        _id: 0,
        name: 1,
        type: 1,
        description: 1,
        website: 1,
        tags: 1
      }
    }).limit(100).toArray();

    return reply.status(200).send({
      message: "Directories retrieved successfully",
      data: directories,
    });
  }

  return reply.status(400).send({
    message: "Invalid action",
  });
}

// export async function submitGrantOpportunity(thi: FastifyInstance, request: FastifyRequest, reply: FastifyReply) {
//   const { type, opportunityName, organisation, website, appLink, opportunityDesc, grantAmount, frequency, deadline, eligibility } = request.body
// }