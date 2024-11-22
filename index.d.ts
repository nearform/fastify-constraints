import { FastifyPluginAsync } from 'fastify'

type FastifyConstraints = FastifyPluginAsync

declare namespace fastifyConstraints {
  export const fastifyConstraints: FastifyConstraints
  export { fastifyConstraints as default }
}

declare function fastifyConstraints(
  ...params: Parameters<FastifyConstraints>
): ReturnType<FastifyConstraints>
export = fastifyConstraints
