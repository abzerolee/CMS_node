const Categories = require('../models/Categories');
const Advertsing = require('../models/Advertsing');
const Fragments = require('../models/Fragments');
const Details = require('../models/Details');
const nim = require('nimble');

nim.extends = function(Child, Parent) {
	let F = function() {};
  F.prototype = Parent.prototype;
  let proto = Child.prototype
  Child.prototype = new F();
  Object.assign(Child.prototype, proto)
  Child.prototype.constructor = Child;
  Child._proto = Parent.prototype;
}

function Routes(params, res) {
  this.data = {
    title: {},
    frags: {},
    advers: {},
    section: [],
  };
  this.category = params.category;
  this.cache = res.locals.cache;
  this.subitem = params.subitem;
  this.detail = params.id;
  this.viewName = this.category;
  
  this.data.title = this.cache.get(this.category).title;
  this.err = res.err;
  this.notfound = res.notfound;
  this.otherQuerys = [
    function(cb) {
      self.findCategory(cb);
    }
  ]
  let self = this;
  this.render = function() {
    res.render('web/'+ self.viewName, self.data, function(err, html) {
      if(err) {
        res.err(err, err.message);
        return;
      }
      res.send(html);
    })
  }
}

Routes.prototype = {
  constructor: Routes,
  handle: function(callback) {
    if(!this.routeIsExist()) {
      this.notfound();
      return;
    }

    let self = this;
    let queryFns = [
      function(cb) {
        self.findAdverts(cb);
      },function(cb) {
        self.findFrags(cb);
      }
    ];

    queryFns = this.otherQuerys ? queryFns.concat(this.otherQuerys) : queryFns;
    nim.parallel(queryFns, self.render);
  },
  routeIsExist: function() {
    let pid = this.cache.get(this.subitem) && this.cache.get(this.subitem).pid;
    if(pid && this.cache.get(pid) === this.category) return true; // Double
    if(this.cache.get(this.category)) return true;
    return false;
  },
  findAdverts: function(cb) {
    let applied = this.cache.get(this.category)._id;
    let self = this;
    Advertsing.find({applied: {$in: [applied, null]}}, function(err, docs) {
      if(err) {
        self.res.err(err, err.message);
        return;
      }
      docs.forEach(function(v) {
        self.data.advers[v.adverId] = v;
      });
      cb();
    });
  },
  findFrags: function(cb) {
    let applied = this.cache.get(this.category)._id;
    let self = this;
    Fragments.find({applied: {$in: [applied, null]}}, function(err, frags) {
      if(err) {
        self.res.err(err, err.message);
        return;
      }
      frags.forEach(function(v) {
        self.data.frags[v.fragId] = v;
      })
      cb();
    });
  },
  findCategory: function(cb) {
    let self = this;
    let pid = self.cache.get(self.category)._id;
    Categories.find({pid: pid}, function(err, docs) {
      if(err) {
        self.err(err, err.message);
        return;
      } 
      let arr = docs.map(function(v) {
        return {title: v.keywords, description: v.description, image: v.image, link: v.path}
      })
      self.data.section = arr;
      cb();
    })
  }
}

function Double(params, res) {
  Routes.apply(this, arguments);
  this.viewName = 'sub_'+ this.category ;
  let self = this;
  this.otherQuerys = [
    function(cb) {
      self.findSubitem(cb);
    }
  ]
}

Double.prototype = {
  constructor: Double,
  findSubitem: function(cb) {
    let pid = this.cache.get(this.category)._id
    let sub = this.cache.get(this.subitem), self = this;
    if(!sub) {
      this.notfound();
      return;
    }
    Categories.find({pid: pid}, function(err, subitems) {
      if(err) {
        self.err(err, err.title);
        return;
      }
      if(sub.name === '__list' && subitems.length === 1) {
        self.viewName = self.category;
        self.findArticles(cb, sub);
        return;
      }
      let subnav = subitems.map(function(v) {
        return {keywords: v.keywords, link: v.path, active: sub.name === v.name ? true : false};
      });
      self.data.subnav = subnav;
      self.findOneArticle(cb, sub);
    });
  },
  findArticles: function(cb, sub) {
    let self = this;
    Details.find({from: sub._id}, function(err, section) {
      if(err) {
        self.err(err, err.title);
        return;
      }
      let subnav = section.map(function(v) {
        return {keywords: v.keywords, link: v.path, active: sub.name === v.name ? true : false};
      });
      self.data.subnav = subnav;
      self.data.section = section;
      cb();
    })
  },
  findOneArticle: function(cb, sub) {
    let self = this;
    Details.findOne({from: sub._id}, function(err, section) {
      if(err) {
        self.err(err, err.title);
        return;
      }
      self.data.section = section;
      cb();
    });
  }
}

function Trible(params, res) {
  Routes.apply(this, arguments);
  this.viewName = 'art_'+ this.category;
  let self = this;
  this.otherQuerys = [
    function(cb) {
      self.findArticle();
    } 
  ]
}

Trible.prototype = {
  findArticle: function(cb) {
    let from = this.cache.get(this.subitem)._id, self = this;
    Details.findOne({_id: this.detail}, function(err, artciles) {
      if(err) {
        self.err(err, err.message);
        return;
      }
      if(artciles.length === 0) {
        self.notfound();
        return;
      }
      self.data.section = articles;
    })
  }
}

nim.extends(Double, Routes);
nim.extends(Trible, Routes);

module.exports = function(req, res, next) {
  if(req.params.id) {
    let trible = new Trible(req.params, res);
    trible.handle();
    return;
  }
  if(req.params.subitem) {
    let subitem = new Double(req.params, res);
    subitem.handle();
    return;
  }
  if(req.params.category) {
    let routes = new Routes(req.params, res);
    routes.handle()
    return;
  }
}