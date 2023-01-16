import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { authenticate } from "../../plugins/authenticate";


export async function GetGuessInPools(fastify: FastifyInstance) {
  fastify.get(
    "/pools/:id/guesses",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getPoolParams = z.object({
        id: z.string(),
      });

      const { id } = getPoolParams.parse(request.params);

      const guesses = await prisma.guess.findMany({
        where: {
          participant: {
            poolId: id
          },
        },
        include: {
          participant: {
            select: {
              user: {
                select: {
                  avatarUrl: true,
                  name: true,
                }
              }
            }
          }
        }
      });

      return guesses;
    }
  );
}