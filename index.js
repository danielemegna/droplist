require('isomorphic-fetch')
const fastify = require('fastify')()
const List = require('./list')
const Dropbox = require('dropbox').Dropbox
const secrets = require('properties-reader')('./secrets')

const sdk = new Dropbox({
  accessToken: secrets.get('dropbox.accessToken')
})

fastify.get('/*', async function(request, reply) {
  const dropboxPath = request.params['*']
  const list = new List(sdk)
  var html = await list.run(dropboxPath)
  
  reply
    .code(200)
    .type('text/html; charset=utf-8')
    .send(html)
}) 

fastify.listen(8080, '0.0.0.0', function (err) {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
