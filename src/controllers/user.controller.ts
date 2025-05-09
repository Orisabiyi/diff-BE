import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUser } from '../types/auth'
import { validateExistingUser } from "../utils/db-validation";

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
    isDeleted: false
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