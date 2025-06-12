import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { getDirectories, submitGrantOpportunity } from "../controllers/directory.controller";
import { submitDirectorySchema } from "../models/submitDirectory.schema";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/directories/:action", getDirectories);
  fastify.post("/directories/submit", { schema: submitDirectorySchema }, submitGrantOpportunity);
}


export default routes;