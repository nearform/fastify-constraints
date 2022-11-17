const Fastify = require('fastify')
const fastifyConstraints = import('../index.js')

const run = async () => {
  const fastify = Fastify()

  await fastify.register(fastifyConstraints)
  await fastify.register(require('./routes.cjs'), {
    constraints: { host: 'constraints.fastify.io' }
  })

  fastify.listen({ port: 3000 })
}

run()
