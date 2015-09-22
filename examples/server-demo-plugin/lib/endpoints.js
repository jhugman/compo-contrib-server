exports.getUser = (req, res, next) => {
  console.log('hello user')
  res.send('<h1>Hello ' + req.params.user + '</h1><img src="/r/it-worked.gif">')
  res.end()
}