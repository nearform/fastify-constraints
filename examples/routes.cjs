module.exports = async function (instance) {
  instance.get('/', () => 'GET /')
  instance.post('/', () => 'POST /')
}
