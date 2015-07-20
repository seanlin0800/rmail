var Router;

var routes;
var router;

module.exports = {
  makePath: function(to, params, query) {
    return router.makePath(to, params, query);
  },

  makeHref: function(to, params, query) {
    return router.makeHref(to, params, query);
  },

  transitionTo: function(to, params, query) {
    router.transitionTo(to, params, query);
  },

  replaceWith: function(to, params, query) {
    router.replaceWith(to, params, query);
  },

  goBack: function() {
    router.goBack();
  },

  run: function(render) {
    router.run(render);
  }
};

Router = require('react-router');

routes = require('./routes');

router = Router.create({
  routes: routes,
  location: Router.HashLocation
});
