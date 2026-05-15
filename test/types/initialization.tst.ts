import { expect } from 'tstyche'
import fastify from 'fastify'
import { FastifyPluginAsync, FastifyInstance } from 'fastify'
import plugin from '../../index.js'

// Verify the plugin is assignable to FastifyPluginAsync
expect(plugin).type.toBeAssignableTo<FastifyPluginAsync>()

const app = fastify()

// Verify app.register can be called with the plugin
expect(app.register).type.toBeCallableWith(plugin)

// Basic registration
app.register(plugin)

// Registration with child scope - constraints are captured via onRegister hook
app.register(async (child: FastifyInstance) => {
  // Verify child.get can be called with route options and constraints
  expect(child.get).type.toBeCallableWith('/', { constraints: { version: '1.0.0' } }, () => 'hello')
  child.get('/', { constraints: { version: '1.0.0' } }, () => 'hello')
})