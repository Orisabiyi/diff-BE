import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getDirectories } from "../controllers/directory.controller";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/directories/:action", getDirectories);
}


export default routes;