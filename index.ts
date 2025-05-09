import Fastify from 'fastify'
import dbConnector from './src/utils/dbConnector'
import userRoute from './src/routes/user.routes'
import dotenv from 'dotenv'

dotenv.configDotenv()

const fastify = Fastify({
  logger: true
})

// plugins
fastify.register(dbConnector)

// routes
fastify.register(userRoute)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  fastify.log.info(`Server connected successfully`)
})