import { test } from 'tap'
import Fastify from 'fastify'
import fastifyConstraints from '../index.js'

test('it should add constraints to all routes', async t => {
  t.plan(2)

  const fastify = Fastify()
  await fastify.register(fastifyConstraints, {
    constraints: { version: '1.0.0' }
  })

  fastify.get('/', () => {})
  fastify.post('/some-route', () => {})

  t.equal(
    fastify.hasRoute({
      url: '/',
      method: 'GET',
      constraints: { version: '1.0.0' }
    }),
    true
  )

  t.equal(
    fastify.hasRoute({
      url: '/some-route',
      method: 'POST',
      constraints: { version: '1.0.0' }
    }),
    true
  )
})

test('it should not add constraints to previously registered routes', async t => {
  t.plan(1)

  const fastify = Fastify()
  fastify.get('/', () => {})
  await fastify.register(fastifyConstraints, {
    constraints: { version: '1.0.0' }
  })

  t.equal(
    fastify.hasRoute({
      url: '/',
      method: 'GET',
      constraints: { version: '1.0.0' }
    }),
    false
  )
})

test('it should not add constraints to routes in parent scope', async t => {
  t.plan(1)

  const fastify = Fastify()
  await fastify.register(async (instance, opts, done) => {
    await fastify.register(fastifyConstraints, {
      constraints: { version: '1.0.0' }
    })

    done()
  })

  fastify.get('/', () => {})

  t.equal(
    fastify.hasRoute({
      url: '/',
      method: 'GET',
      constraints: { version: '1.0.0' }
    }),
    false
  )
})

test('it should add constraints to routes in child scope', async t => {
  t.plan(1)

  const fastify = Fastify()
  await fastify.register(fastifyConstraints, {
    constraints: { version: '1.0.0' }
  })
  await fastify.register((instance, opts, done) => {
    fastify.get('/', () => {})

    done()
  })

  t.equal(
    fastify.hasRoute({
      url: '/',
      method: 'GET',
      constraints: { version: '1.0.0' }
    }),
    true
  )
})

test('it should merge route level constraints with scope level constraints', async t => {
  t.plan(1)

  const fastify = Fastify()
  await fastify.register(fastifyConstraints, {
    constraints: { version: '1.0.0' }
  })

  fastify.get(
    '/',
    { constraints: { host: 'constraints.fastify.io' } },
    () => {}
  )

  t.equal(
    fastify.hasRoute({
      url: '/',
      method: 'GET',
      constraints: {
        version: '1.0.0',
        host: 'constraints.fastify.io'
      }
    }),
    true
  )
})

test('it should use route level constraints in case of collision', async t => {
  t.plan(2)

  const fastify = Fastify()
  await fastify.register(fastifyConstraints, {
    constraints: { version: '1.0.0' }
  })

  fastify.get('/', { constraints: { version: '2.0.0' } }, () => {})

  t.equal(
    fastify.hasRoute({
      url: '/',
      method: 'GET',
      constraints: { version: '1.0.0' }
    }),
    false
  )

  t.equal(
    fastify.hasRoute({
      url: '/',
      method: 'GET',
      constraints: { version: '2.0.0' }
    }),
    true
  )
})
