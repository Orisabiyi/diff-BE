import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createUser } from "../controllers/user.controller";
import { userSchema } from "../models/user.schema";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/create-user', { schema: userSchema }, createUser)
}

export default routes