![CI](https://github.com/nearform/fastify-constraints/actions/workflows/ci.yml/badge.svg?event=push)

# `fastify-constraints`

Fastify plugin to add constraints to multiple routes

## Install

```bash
npm i fastify-constraints
```

## Usage

Register `fastify-constraints` as a Fastify plugin.
The plugin will create an `onRoute` hook that will add the constraints to the routes.
Contstraints should be specified in the constraints property of the plugin options.
To see available constraints refer to the [Fastify documentation](https://www.fastify.io/docs/latest/Reference/Routes/#constraints).

```js
import Fastify from 'fastify'
import fastifyConstraints from 'fastify-constraints'

const fastify = Fastify()

// Register the plugin
await fastify.register(fastifyConstraints)

// Register plugins containing routes with the constraints
await fastify.register(await (instance, opts) => 
  instance.get('/', () => 'Hello from version 1.0.0'), // Add a route
  { constraints: { version: '1.0.0' } }
)


// Start the server
await fastify.listen({ port: 3000 })
```

You can also specify constraints for specific routes which will be merged:

```js
await fastify.register(fastifyConstraints)
await fastify.register(async (instance, opts) => {
  fastify.get('/', () => 'Hello from version 1.0.0') // This route will have the version constraint
  fastify.get('/host-restricted', { constraints: { host: 'example.com' } }, () => 'Hello from example.com') // This route will have the version and host constraint
}, {
  constraints: { version: '1.0.0' }
})

```

> Note: In case of collision the constraints specified in the route will take precedence over the constraints specified in the plugin options.

## Examples

See the [examples](./examples) folder for a complete examples for both ES and CommonJS modules.