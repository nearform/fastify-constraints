import Fastify from 'fastify'
import fastifyConstraints from '../index.js'

const run = async () => {
  const fastify = Fastify()

  await fastify.register(fastifyConstraints)
  await fastify.register(
    async instance => instance.get('/', () => 'Hello from version 1.0.0'), // Needs to be called with header Accept-Version: 1.x, 1.0.x or 1.0.0
    { constraints: { version: '1.0.0' } }
  )

  await fastify.listen({ port: 3000 })
}

run()
