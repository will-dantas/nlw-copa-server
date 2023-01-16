import { z } from "zod"
import { FastifyInstance } from "fastify"
import { authenticate } from "../../plugins/authenticate"
import { prisma } from "../../lib/prisma"

export async function PostPoolsJoin(fastify: FastifyInstance) {
  fastify.post('/pools/join', {
    onRequest: [authenticate]
  }, async (request, reply) => {
    const joinPoolBody = z.object({
      code: z.string(),
    })

    const { code } = joinPoolBody.parse(request.body)

    const pool = await prisma.pool.findUnique({
      where: {
        code,
      },
      include: {
        participants: {
          where: {
            userId: request.user.sub,
          }
        }
      }
    })

    if (!pool) {
      return reply.status(400).send({
        message: 'Pool not found.'
      })
    }

    if (pool.participants.length > 0) {
      return reply.status(400).send({
        message: 'You are already a join this pool.'
      })
    }

    if (!pool.ownerId) {
      await prisma.pool.update({
        where: {
          id: pool.id,
        },
        data: {
          ownerId: request.user.sub,
        }
      })
    }

    await prisma.participant.create({
      data: {
        poolId: pool.id,
        userId: request.user.sub,
      }
    })

    return reply.status(201).send()
  })
}
