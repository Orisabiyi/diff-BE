import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateChat } from "../types/controller";

export async function recommendFund(
  this: FastifyInstance,
  request: FastifyRequest<{ Body: CreateChat }>,
  reply: FastifyReply
) {
  const { userId, chatId, text } = request.body;

  if (!userId || !chatId || !text) {
    return reply.status(400).send({
      message: "userId, chatId and text are required"
    });
  }

  // check if user exists
  const userCollection = this.mongo.db?.collection("users");
  const user = await userCollection?.findOne({ id: userId });

  if (!user) {
    return reply.status(400).send({
      message: "userId is not valid"
    });
  }

  // get existing directory funds
  const directoryCollection = this.mongo.db?.collection("directory");
  const directoryFunds = await directoryCollection?.find({}).toArray();

  return reply.status(200).send({
    message: "Directory funds retrieved successfully",
    data: directoryFunds
  });

  // const collection = this.mongo.db?.collection("recommedations");
}

export async function startChat() { }

export async function getUserAllChat() { }

export async function getChatById() { }