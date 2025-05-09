import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUser } from '../types/auth'
import { validateExistingUser } from "../utils/db-validation";

export async function createUser(this: FastifyInstance, request: FastifyRequest<{ Body: CreateUser }>, reply: FastifyReply) {
  const { email, mobile, fullname, username } = request.body

  const collection = this.mongo.db?.collection('diff-users')

  const userEmailExists = (await validateExistingUser(collection, email))?.status
  const userMobileExists = (await collection?.findOne({ mobile }))?.status

  if (!userEmailExists || !userMobileExists) {
    return reply.status(400).send({
      message: 'user already exist'
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