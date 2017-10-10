const router = require('express').Router();
const middleware = require('./middleware');

const manger = require('./manger/home');
const home = require('./web/home');
const category = require('./web/category');
const detail = require('./web/detail');

middleware.initData();

router.use(middleware.initLocals);
router.use(middleware.initErrorHandlers);

router.get('/', home);
router.get('/web', home);
router.get('/web/:category', category);
router.get('/web/:category/:subitem', detail);

router.get('/manger', manger);

module.exports = router;