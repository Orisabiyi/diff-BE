import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createUser } from "../controllers/user.controller";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post('/create-user', createUser)
}

export default routes