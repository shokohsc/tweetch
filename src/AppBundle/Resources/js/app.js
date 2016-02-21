"use strict"

/**************
 * Prototypes *
 **************/
 String.prototype.title = function() {
   var string = this.toString().toLowerCase()
   return string.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function($charOne){
     return $charOne.toUpperCase()
   })
 }
 String.prototype.useHttps = function() {
   var string = this.toString()
   return string.replace('http://', 'https://')
 }

/******************
 * Routes Handler *
 ******************/
var currentTag = null
var routes = {}
function mount(tag, options) {
  currentTag && currentTag.unmount(true)
  currentTag = riot.mount('#content', tag, options)[0]
}
function handler(collection, id, action) {
  var fn = routes[collection || 'home']
  fn ? fn(id, action) : mount('tweetch-error')
}

/*******************
 * AbstractService *
 *******************/
class AbstractService {

  /**
   * AbstractService constructor method.
   * @param  string route
   * @return AbstractService
   */
  constructor(route) {
    this.protocol  = location.protocol+'//'
    this.host      = location.host+'/'
    this.endpoint  = 'api/'+route
  }

  /**
   * Serve ajax call
   * @param  string id
   * @param  string page
   * @param  string options
   * @return Promise
   */
  serve(id, page, options) {
    var self      = this,
        url       = this.protocol+this.host+this.endpoint+'/'+id,
        url       = (page === undefined) ? url : url+'/'+page,
        url       = (options === undefined) ? url : url+'/'+options

    return $.ajax({
      url: url
    }).fail(function() {
      mount('tweetch-error')
    })
  }
}

/***************
 * GameService *
 ***************/
class GameService extends AbstractService{
  /**
   * GameService constructor method.
   * @return GameService
   */
  constructor() {
    super('games')
  }

  /**
   * Fetch top games
   * @param  int page
   * @return Object
   */
  fetchTop(page) {
    var self = this
    this.url = this.url+'/'+page
    return this.serve('top', '1')
  }
}

/********
 * Home *
 ********/
var gameService = new GameService()
 routes.home = function(id, action) {
   mount('tweetch-loading')
   gameService.fetchTop('1').done(function(top) {
     mount('tweetch-home', {top: top})
   })
 }

 /*********
  * About *
  *********/
  routes.about = function(id, action) {
    mount('tweetch-about')
  }

/***********
 * Run app *
 ***********/
riot.route.start(true)
riot.mount('*')
riot.route(handler)
