import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { SubmitDirectoryProps } from "../types/controller";

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

export async function submitGrantOpportunity(this: FastifyInstance, request: FastifyRequest<{ Body: SubmitDirectoryProps }>, reply: FastifyReply) {
  const {
    type,
    name,
    organisation,
    website,
    applicationLink,
    description,
    deadline,
    eligibility,
    tags,
    grantAmount,
    grantFrequency,
    checkSize,
    investmentStage,
    duration,
    location,
    stipend,
    userName,
    email,
  } = request.body;

  const collection = this.mongo.db?.collection("directory-data");

  if (!collection) {
    return reply.status(500).send({
      message: "Failed to connect to the database",
    });
  }

  const existingEntry = await collection.findOne({
    name,
    type,
    organisation,
    website,
    applicationLink,
  });

  if (existingEntry) {
    return reply.status(400).send({
      message: "This data already exists in our directory",
    });
  }

  const newOpportunity: Record<string, string | string[]> = {
    type,
    name,
    organisation,
    website,
    applicationLink,
    description,
    deadline,
    eligibility,
    tags,
  }

  const optionalFields = {
    grantAmount,
    grantFrequency,
    checkSize,
    investmentStage,
    duration,
    location,
    stipend,
    userName,
    email,
  }

  for (const [key, value] of Object.entries(optionalFields)) {
    if (typeof value === "string" && value.trim() !== "") {
      newOpportunity[key] = value;
    }
  }

  const result = await collection.insertOne(newOpportunity);

  this.log.info(`Information ${result.acknowledged}`)

  if (!result.acknowledged) {
    return reply.status(500).send({
      message: "Failed to submit the grant opportunity",
    });
  }

  return reply.status(200).send({
    message: "Grant opportunity submitted successfully",
  })
}