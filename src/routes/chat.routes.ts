import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { chatAuthMiddleware } from "../middleware/auth.middleware";
import { recommendFund } from "../controllers/chat.controller";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/recommendFund", { preHandler: chatAuthMiddleware }, recommendFund);
}


export default routes;