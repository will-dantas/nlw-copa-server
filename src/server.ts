import Fastify from "fastify"
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"

import { GetUserAuth } from "./routes/auth/get-user-auth"
import { GetGames } from "./routes/games/get-games"
import { GetGuessInPools } from "./routes/guesses/get-guess-in-pool"
import { PostGuessInPools } from "./routes/guesses/post-guess-in-pool"
import { PostUserAuth } from "./routes/auth/post-user-auth"
import { GetPoolId } from "./routes/pools/get-pool-id"
import { GetPoolsAll } from "./routes/pools/get-pools-all"
import { CountPool } from "./routes/pools/count-pools"
import { PostPool } from "./routes/pools/post-pool"
import { PostPoolsJoin } from "./routes/pools/post-pools-join"
import { GetUser } from "./routes/user/get-user"
import { CountUser } from "./routes/user/count-user"

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  await fastify.register(jwt, {
    secret: 'will',
  })

  // Pools routes
  await fastify.register(GetPoolId)
  await fastify.register(GetPoolsAll)
  await fastify.register(CountPool)
  await fastify.register(PostPool)
  await fastify.register(PostPoolsJoin)

  // User authentication routes
  await fastify.register(GetUserAuth)
  await fastify.register(PostUserAuth)

  // Games routes
  await fastify.register(GetGames)

  // Guesses routes
  await fastify.register(GetGuessInPools)
  await fastify.register(PostGuessInPools)

  // await fastify.register(guessRoutes)
  await fastify.register(GetUser)
  await fastify.register(CountUser)

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()
