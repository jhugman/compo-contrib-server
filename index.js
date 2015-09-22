let express = require('express'),
    app = express()

let path = require('path'), 
    fs = require('fs')

let server

let sockets = {}

function startServer () {
  let plugin = exports.plugin 
  handleEndpoints(plugin)


  server = app.listen(process.env.PORT || 8080, () => {
    let host = server.address().address;
    let port = server.address().port;
    host = host || '0.0.0.0'
    console.log('Compo server app listening at http://%s:%s', 'localhost', port);
  })

  // Maintain a hash of all connected sockets
  let nextSocketId = 0
  server.on('connection', function (socket) {
    // Add a newly connected socket
    var socketId = nextSocketId++;
    sockets[socketId] = socket;

    // Remove the socket when it closes
    socket.on('close', function () {
      delete sockets[socketId];
    });
  });
}

function handleEndpoints (plugin) {
  let ep = plugin.extensionPoints['http.endpoint']
  // By the time this is run (because of timeout)
  // at startup at least, the endpoints will 
  // have all been discovered.
  // We sort them by path length so we don't end up with over greedy
  // '/' routes
  ep.array.sort((a, b) => {
    // We should probably sort on '/'
    return a.path.length > b.path.length
  })
  ep.onAdd((endpoint) => {
    if (endpoint.directory) {
      app.use(endpoint.path, express.static(endpoint.directory))
      return
    }
    switch (endpoint.method) {
      case 'get':
        app.get(endpoint.path, endpoint)
        break
      case 'post':
        app.post(endpoint.path, endpoint)
        break;
      default: 
        app.use(endpoint.path, endpoint)
    }
  })

  ep.onRemove((endpoint) => {
    // we don't know how to unregister an endpoint
  })
}

exports.unload = function stopServer () {
  if (server) {
    return new Promise((resolve, reject) => {
        server.close(() => {
          console.log('Server says goodbye')
          resolve()
        })
        // Destroy all remaining open sockets
        for (let i in sockets) {
          sockets[i].destroy();
        }
    })
  }
}


setTimeout(startServer, 1)

