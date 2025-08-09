import fastify from 'fastify'
import plugin from '../../index.js'

const app = fastify()

// Without parameters
app.register(plugin)
