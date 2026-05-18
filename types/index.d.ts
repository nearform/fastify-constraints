import { FastifyPluginAsync } from 'fastify'

type FastifyConstraints = FastifyPluginAsync

declare function fastifyConstraints(
  ...params: Parameters<FastifyConstraints>
): ReturnType<FastifyConstraints>

declare namespace fastifyConstraints {
  export const fastifyConstraints: FastifyConstraints
}

export default fastifyConstraints