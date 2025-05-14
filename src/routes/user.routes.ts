import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createUser, getUser } from "../controllers/user.controller";
import { getUserSchema, userSchema } from "../models/user.schema";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/create-user', { schema: userSchema }, createUser)
  fastify.post('/login', { schema: getUserSchema }, getUser)
}

export default routes