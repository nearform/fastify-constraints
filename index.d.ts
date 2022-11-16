type FastifyConstraintsOptions = {
  constraints: { [name: string]: any}
}

declare const fastifyConstraints: FastifyPluginAsync<FastifyConstraintsOptions>

export { fastifyConstraints, FastifyConstraintsOptions }

export default fastifyConstraints