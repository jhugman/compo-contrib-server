

exports.getRoot = (req, res, next) => {
  res.send('Hello world! I\'m trapped in a plugin')
  res.end()
}

exports.getUser = (req, res, next) => {
  console.log('hello user')
  res.send('Hello ' + req.params.user)
  res.end()
}