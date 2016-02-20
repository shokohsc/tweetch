/**
 * Routes Handler
 */
var currentTag = null;
var routes = {};
function mount(tag, options) {
  currentTag && currentTag.unmount(true);
  currentTag = riot.mount('#content', tag, options)[0];
}
function handler(collection, id, action) {
  var fn = routes[collection || 'home'];
  fn ? fn(id, action) : mount('tweetch-error');
}
riot.route(handler);

/**
 * Home
 */
 routes.home = function(id, action) {
   mount('tweetch-home');
 }

 /**
  * About
  */
  routes.about = function(id, action) {
    mount('tweetch-about');
  }

/**
 * Run app
 */
riot.route.start(true)
riot.mount('*')
riot.route.exec(handler)
