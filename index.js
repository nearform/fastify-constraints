import fp from 'fastify-plugin'

function fastifyConstraints(fastify, options, next) {
  fastify.addHook('onRegister', (instance, opts) => {
    if (!opts?.constraints) {
      return
    }

    instance.addHook('onRoute', function hook(routeOptions) {
      routeOptions.constraints = {
        ...opts.constraints,
        ...routeOptions?.constraints
      }
    })
  })
  next()
}

export default fp(fastifyConstraints, {
  fastify: '4.x',
  name: 'fastify-constraints'
})
