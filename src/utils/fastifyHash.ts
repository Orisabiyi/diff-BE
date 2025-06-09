import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { configDotenv } from "dotenv";
import fastifyPlugin from "fastify-plugin";
import fastifyBcrypt from "fastify-bcrypt";

configDotenv()

async function fastifyHash(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(fastifyBcrypt, {
    saltWorkFactor: 12
  })
}

export default fastifyPlugin(fastifyHash)