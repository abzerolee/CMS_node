const router = require('express').Router();
const middleware = require('./middleware');
const _ = require('nimble');

const manger = require('./manger/home');
const home = require('./web/home');
const category = require('./web/category');
const detail = require('./web/detail');

const api = require('./api');

middleware.initData();

router.use(middleware.initLocals);
router.use(middleware.initErrorHandlers);

router.get('/', home);
router.get('/web', home);
router.get('/web/:category', category);
router.get('/web/:category/:subitem', detail);

router.get('/manger', manger);
router.get('/manger/categories', function(req, res, next) {
  res.render('manger/categories');
});
router.get('/manger/details', function(req, res, next) {
  res.render('manger/details');
});
router.get('/manger/website', function(req, res, next) {
  res.render('manger/website')
});
router.get('/manger/advertising', function(req, res, next) {
  res.render('manger/advertising');
})
router.get('/manger/fragments', function(req, res, next) {
  res.render('manger/fragments');
});

module.exports = router;