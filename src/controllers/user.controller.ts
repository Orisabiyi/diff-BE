import { configDotenv } from "dotenv";
import { CreateUser, GetUser } from '../types/auth'
import { validateExistingUser } from "../utils/db-validation";
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";

configDotenv()

export async function createUser(this: FastifyInstance, request: FastifyRequest<{ Body: CreateUser }>, reply: FastifyReply) {
  const { email, mobile, fullname, username, lastLoginBrowser, lastLoginDevice, lastLoginLocation } = request.body

  const collection = this.mongo.db?.collection('diff-users')

  const userEmailExists = (await validateExistingUser(collection, email))?.status
  const userMobileExists = (await validateExistingUser(collection, mobile))?.status

  if (!userEmailExists || !userMobileExists) {
    return reply.status(400).send({
      message: 'user already exist'
    })
  }

  // create user
  const user = await collection?.insertOne({
    email,
    mobile,
    fullname,
    username,
    lastLoginDevice,
    lastLoginLocation,
    lastLoginBrowser,
    loginCount: 0,
    lastLogin: null,
    lastLogout: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
    isDeleted: false,
    token: null,
    tokenExpire: null,
  })

  if (!user) {
    return reply.status(500).send({
      message: 'Failed to create user'
    })
  }


  reply.status(200).send({
    message: 'User created successfully',
    data: {
      email,
      mobile,
      fullname,
      username
    }
  })
}

export async function getUser(this: FastifyInstance, request: FastifyRequest<{ Body: GetUser }>, reply: FastifyReply) {
  const collection = this.mongo.db?.collection('diff-users')

  const { username, password, email } = request.body

  const userExist = await collection?.findOne({ username, password, email })

  if (!userExist) {
    return reply.status(400).send({
      message: 'user not found'
    })
  }

  const token = this.jwt.sign({ username, email, password }, { expiresIn: '1day' })

  const updateCurrentUser = await collection?.updateOne(
    { username, email, password },
    {
      $set: {
        lastLogin: new Date(),
        lastLoginDevice: request.headers['user-agent'] || 'unknown',
        lastLoginLocation: request.headers['user-location'] || request.ip,
        lastLoginBrowser: request.headers['user-agent'] || 'unknown',
        token,
      }
    })

  return reply.status(200).send({
    message: 'User logged in successfully',
    data: {
      username: userExist.username,
      email: userExist.email,
      token,
    }
  })
}