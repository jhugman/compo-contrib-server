let plugin = require('..').plugin 
let _ = require('underscore')

let ep = plugin.extensionPoints['http.endpoint']

exports.listRoutes = (output, tokens) => {
  let endpoints = ep.array

  output.log('Available end points')
  let rows = endpoints.map((endpoint) => {

    let method = endpoint.method || 'all'
    let path = endpoint.path
    let desc = endpoint.description || ''
    if (endpoint.directory) {
      path += '/*'
    }

    if (endpoint.directory) {
      desc = 'static - ' + endpoint.directory
    }

    return [method, path, desc]
  })
  if (endpoints.length === 0) {
    output.log('\tNone')
  } else {
    output.table({}, rows)
  }
}