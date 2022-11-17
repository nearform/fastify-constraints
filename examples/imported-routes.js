import Fastify from 'fastify'
import fastifyConstraints from '../index.js'

const run = async () => {
  const fastify = Fastify()

  await fastify.register(fastifyConstraints)
  await fastify.register(import('./routes.js'), {
    constraints: { host: 'constraints.fastify.io' }
  })

  fastify.listen({ port: 3000 })
}

run()
