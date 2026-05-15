import { expect } from 'tstyche'
import fastify from 'fastify'
import { FastifyPluginAsync } from 'fastify'
import plugin from '../../index.js'

// Verify the plugin is assignable to FastifyPluginAsync
expect(plugin).type.toBeAssignableTo<FastifyPluginAsync>()

const app = fastify()

// Basic registration
app.register(plugin)

// Registration with child scope - constraints are captured via onRegister hook
app.register(async (child) => {
  // Verify child.get can be called with route options and constraints
  child.get('/', { constraints: { version: '1.0.0' } }, () => 'hello')
})