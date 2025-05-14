import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import jwt from '@fastify/jwt'
import { configDotenv } from "dotenv";
import fastifyPlugin from "fastify-plugin";

configDotenv()

async function fastifyToken(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET || "",
    sign: {
      expiresIn: '1h'
    }
  })
}

export default fastifyPlugin(fastifyToken)