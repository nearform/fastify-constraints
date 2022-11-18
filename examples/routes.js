async function routes(instance) {
  instance.get('/', () => 'GET /')
  instance.post('/', () => 'POST /')
}

export default routes
