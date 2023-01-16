import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { authenticate } from "../../plugins/authenticate";

export async function GetUser(fastify: FastifyInstance) {
  fastify.get(
    "/users/:id",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const getUserParams = z.object({
        id: z.string(),
      });

      const { id } = getUserParams.parse(request.params);

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          participatingAt: {
            where: {
              userId: id,
            },
          },
          ownPools: {
            where: {
              ownerId: id,
            },
            include: {
              _count: {
                select: {
                  participants: true,
                },
              },
            },
          },
        },
      });

      return { user };
    }
  );
}
