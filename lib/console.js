let plugin = require('..').plugin 
let _ = require('underscore')

let ep = plugin.extensionPoints['http.endpoint']

exports.listRoutes = (tokens, println) => {
  let endpoints = ep.array

  //endpoints = _.sortBy(endpoints, 'path')

  println('Available end points')
  endpoints.forEach((endpoint) => {
    let method = endpoint.method || 'all'
    let line = '\t' + method + '\t' + endpoint.path
    if (endpoint.description) {
      line += '\t' + endpoint.description
    }
    println(line)
  })
  if (endpoints.length === 0) {
    println('\tNone')
  }
}