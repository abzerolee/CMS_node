exports = module.exports = function(req, res) {
  var locals = res.locals;
  locals.section = 'home';
  res.render('web/index');
}