import Fastify from 'fastify'
import fastifyConstraints from '../index.js'

const run = async () => {
  const fastify = Fastify()

  await fastify.register(fastifyConstraints, {
    constraints: { version: '1.0.0' }
  })

  fastify.get('/', () => 'Hello from version 1.0.0')

  await fastify.listen({ port: 3000 })
}

run()
