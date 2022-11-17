import fp from 'fastify-plugin'

async function fastifyConstraints(fastify) {
  const symbol = Symbol.for('fastifyConstraints')
  fastify.decorate(symbol, null)

  fastify.addHook('onRegister', function (instance, options) {
    if (options.constraints) {
      instance[symbol] = { ...instance[symbol], ...options.constraints }
    }
  })

  fastify.addHook('onRoute', function (routeOptions) {
    if (this[symbol]) {
      routeOptions.constraints = {
        ...this[symbol],
        ...routeOptions.constraints
      }
    }
  })
}

export default fp(fastifyConstraints, {
  fastify: '4.x',
  name: 'fastify-constraints'
})
