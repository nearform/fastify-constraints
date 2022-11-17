import { test } from 'tap'
import Fastify from 'fastify'
import fastifyConstraints from '../index.js'

test('it should do nothing when no constraints are defined', async t => {
  const fastify = Fastify()
  await fastify.register(fastifyConstraints)

  await fastify.register(async () => fastify.get('/', () => ({})))

  t.ok(
    fastify.hasRoute({
      method: 'GET',
      url: '/'
    })
  )
})

test('it should add constraints to all routes registered in a plugin', async t => {
  const fastify = Fastify()
  await fastify.register(fastifyConstraints)

  await fastify.register(
    async instance => {
      instance.get('/', () => {})
      instance.post('/', () => {})
    },
    { constraints: { version: '1.0.0' } }
  )

  t.ok(
    fastify.hasRoute({
      method: 'GET',
      url: '/',
      constraints: { version: '1.0.0' }
    })
  )
  t.ok(
    fastify.hasRoute({
      method: 'POST',
      url: '/',
      constraints: { version: '1.0.0' }
    })
  )
})

test('it should not affect routes from other plugins', async t => {
  const fastify = Fastify()
  await fastify.register(fastifyConstraints)
  await fastify.register(async () => {}, { constraints: { version: '1.0.0' } })
  await fastify.register(async instance => instance.get('/', () => {}))

  t.ok(
    fastify.hasRoute({
      method: 'GET',
      url: '/'
    })
  )
  t.notOk(
    fastify.hasRoute({
      method: 'GET',
      url: '/',
      constraints: { version: '1.0.0' }
    })
  )
})

test('it should not affect routes from the parent scope', async t => {
  const fastify = Fastify()
  await fastify.register(fastifyConstraints)
  await fastify.register(async () => {}, { constraints: { version: '1.0.0' } })

  fastify.get('/', () => {})

  t.ok(
    fastify.hasRoute({
      method: 'GET',
      url: '/'
    })
  )
  t.notOk(
    fastify.hasRoute({
      method: 'GET',
      url: '/',
      constraints: { version: '1.0.0' }
    })
  )
})

test('it should merge constraints defined at route level', async t => {
  const fastify = Fastify()
  await fastify.register(fastifyConstraints)
  await fastify.register(
    async instance =>
      instance.get('/', { constraints: { version: '1.0.0' } }, () => {}),
    { constraints: { host: 'constraints.fastify.io' } }
  )

  t.ok(
    fastify.hasRoute({
      method: 'GET',
      url: '/',
      constraints: { version: '1.0.0', host: 'constraints.fastify.io' }
    })
  )
})

test('it should use the route level defined constraints when there are collisions', async t => {
  const fastify = Fastify()
  await fastify.register(fastifyConstraints)
  await fastify.register(
    async instance =>
      instance.get('/', { constraints: { version: '1.0.0' } }, () => {}),
    { constraints: { version: '2.0.0' } }
  )

  t.ok(
    fastify.hasRoute({
      method: 'GET',
      url: '/',
      constraints: { version: '1.0.0' }
    })
  )
  t.notOk(
    fastify.hasRoute({
      method: 'GET',
      url: '/',
      constraints: { version: '2.0.0' }
    })
  )
})

test('it should merge constraints from parent scope', async t => {
  const fastify = Fastify()
  await fastify.register(fastifyConstraints)
  await fastify.register(
    async parent =>
      parent.register(async instance => instance.get('/', () => {}), {
        constraints: { version: '1.0.0' }
      }),
    { constraints: { host: 'constraints.fastify.io' } }
  )

  t.ok(
    fastify.hasRoute({
      method: 'GET',
      url: '/',
      constraints: { version: '1.0.0', host: 'constraints.fastify.io' }
    })
  )
})
