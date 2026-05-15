import { expect } from 'tstyche'
import fastify from 'fastify'
import { FastifyPluginAsync } from 'fastify'
import plugin from '../../index.js'

// Verify the plugin is assignable to FastifyPluginAsync
expect(plugin).type.toBeAssignableTo<FastifyPluginAsync>()

const app = fastify()

// Verify app.register can be called with the plugin
expect(app.register).type.toBeCallableWith(plugin)

// Basic registration
app.register(plugin)

// Registration as child plugin with constraints option
app.register(async (child) => {
  child.get('/', () => 'hello')
}, { constraints: { version: '1.0.0' } })