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
router.get('/manger/categories', function(req, res) {
  res.render('manger/categories');
});
router.get('/manger/article', function(req, res) {
  res.render('manger/details');
});
router.get('/manger/website', function(req, res) {
  res.render('manger/website')
});
router.get('/manger/advertising', function(req, res) {
  res.render('manger/advertising');
})
router.get('/manger/fragments', function(req, res) {
  res.render('manger/fragments');
});
router.get('/manger/categories_add', function(req, res) {
  res.render('manger/categories_add');
});
router.get('/manger/fragments_add', function(req, res) {
  res.render('manger/fragments_add');
})
router.get('/manger/advertising_add', function(req, res) {
  res.render('manger/advertising_add');
});
<<<<<<< HEAD
=======
router.get('/manger/article_add', function(req, res) {
  res.render('manger/details_add');
})
>>>>>>> d2856d0a4c988576b136fd51798c3c08bba07cf6
module.exports = router;