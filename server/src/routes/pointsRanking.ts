import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function pointsRankingRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/pools/:id/ranking",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getPoolParams = z.object({
        id: z.string(),
      });

      const { id } = getPoolParams.parse(request.params);

      const participants = await prisma.participant.findMany({
        where: {
          poolId: id,
        },
        include: {
            guesses: {
                select:{
                    firstTeamPoints: true,
                    secondTeamPoints: true,
                    gameId: true,
                }
            },
        }
      });

      const games = await prisma.game.findMany({
        include: {  
          guesses: {
            where: {
              participant: {
                poolId: id,
              },

            }
          },
        },
      });

      return games
    }
  );
}
