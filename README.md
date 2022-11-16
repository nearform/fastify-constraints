![CI](https://github.com/nearform/fastify-constraints/actions/workflows/ci.yml/badge.svg?event=push)

Fastify plugin to add constraints to multiple routes

## Install

```bash
npm i fastify-constraints
```

## Usage

Register fastifyConstraints as a Fastify plugin.
The plugin will create an `onRoute` hook that will add the constraints to the routes.
Contstraints should be specified in the constraints property of the plugin options.
To see available constraints refer to the [Fastify documentation](https://www.fastify.io/docs/latest/Reference/Routes/#constraints).

```js
import Fastify from 'fastify'
import fastifyConstraints from 'fastify-constraints'

const fastify = Fastify()

// Register the plugin
await fastify.register(fastifyConstraints, {
  constraints: { version: '1.0.0' }
})

// Add a route
fastify.get('/', () => 'Hello from version 1.0.0')

// Start the server
await fastify.listen({ port: 3000 })
```

You can also specify constraints for specific routes which will be merged:

```js
await fastify.register(fastifyConstraints, {
  constraints: { version: '1.0.0' }
})

fastify.get('/', () => 'Hello from version 1.0.0') // This route will have the version constraint
fastify.get('/host-restricted', { constraints: { host: 'example.com' } }, () => 'Hello from example.com') // This route will have the version and host constraint
```