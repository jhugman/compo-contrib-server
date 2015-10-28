let plugin = require('..').plugin 
let _ = require('underscore')

let ep = plugin.extensionPoints['http.endpoint']

exports.listRoutes = (println, tokens) => {
  let endpoints = ep.array

  println('Available end points')
  endpoints.forEach((endpoint) => {
    let method = endpoint.method || 'all'
    let line = '\t' + method + '\t' + endpoint.path
    if (endpoint.directory) {
      line += '/*'
    }
    if (endpoint.description) {
      line += '\t' + endpoint.description
    } else if (endpoint.directory) {
      line += 'static' 
    }

    if (endpoint.directory) {
      line += ' - ' + endpoint.directory
    }

    println(line)
  })
  if (endpoints.length === 0) {
    println('\tNone')
  }
}