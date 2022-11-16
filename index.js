import fp from 'fastify-plugin'

function fastifyConstraints(fastify, options, next) {
  fastify.addHook('onRoute', function hook(routeOptions) {
    routeOptions.constraints = options.constraints
  })
  next()
}

export default fp(fastifyConstraints, {
  fastify: '4.x',
  name: 'fastify-constraints'
})
