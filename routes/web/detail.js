module.exports = function(req, res) {
  let locals = res.locals;
  locals.section = 'details';
  console.log(req.params);
  res.send('hello world');
}