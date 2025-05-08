import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import fastifyMongo from '@fastify/mongodb'
import fastifyPlugin from "fastify-plugin";

async function dbConnecter(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.register(fastifyMongo, {
    url: process.env.MONGODB_URI
  })
}

export default fastifyPlugin(dbConnecter)