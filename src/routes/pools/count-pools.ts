import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function CountPool(fastify: FastifyInstance) {
  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });
}
