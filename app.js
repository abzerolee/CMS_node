const express = require('express');
const path = require('path');
const fs = require('fs');
const routes = require('./routes/index');
const swig = require('swig-templates');
const app = express();

swig.setDefaults({cache: false});
swig.setFilter('navActive', function(input) {
  return input ? 'active' : '';
});

app.set('views',  path.join(__dirname, '/views'));
app.set('view engine', 'swig');
app.engine('swig', swig.renderFile);

app.use(express.static(__dirname+'/static'));

app.use('/', routes);
module.exports = app;
