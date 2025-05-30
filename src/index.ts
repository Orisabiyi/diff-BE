import Fastify from 'fastify'
import dbConnector from './utils/dbConnector'
import userRoute from './routes/user.routes'
import directoryRoute from './routes/directory.routes'
import dotenv from 'dotenv'
import fastifyToken from './utils/fastifyToken'
import { chatAuthMiddleware } from './middleware/auth.middleware'

dotenv.configDotenv()

const fastify = Fastify({
  logger: true
})

fastify.addHook('preHandler', chatAuthMiddleware)

// plugins
fastify.register(dbConnector)
fastify.register(fastifyToken)

// routes
fastify.register(userRoute)
fastify.register(directoryRoute)

fastify.listen({ host: "0.0.0.0", port: 8080 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  fastify.log.info(`Server connected successfully`)
})