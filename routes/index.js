const express = require('express');
const router = express.Router();

let nav = [{
    text: '首页',
    href: '/', 
  },{
    text: '技术与服务',
    href: '/service',
  },{
    text: '产品中心',
    href: '/products',
    active: false,
  },{
    text: '联系我们',
    href: '/contact',
  },{
    text: '新闻中心',
    href: '/news',
  },{
    text: '客户案例',
    href: '/clients'
  },{
    text: '关于我们',
    href: '/aboutus',
  }];

router.get('/', htmlRender);

router.get('/service', htmlRender);

router.get('/products', htmlRender);

router.get('/contact', htmlRender);

router.get('/clients', htmlRender);

router.get('/news', htmlRender);

router.get('/aboutus', htmlRender);

function htmlRender(req, res) {
  let routes = req.path;
  nav.forEach((item, i) => {
    item.active = item.href === routes ? true : false;
  });

  res.render('web'+ routes, {nav: nav});
}

module.exports = router