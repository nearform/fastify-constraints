import fastify from 'fastify'
import plugin from '../../index'

const app = fastify()

// Without parameters
app.register(plugin)
