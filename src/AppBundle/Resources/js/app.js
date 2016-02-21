"use strict"

/**************
 * Prototypes *
 **************/

 /**
  * First letter of any word uppercase, then lowercase
  * @return string
  */
 String.prototype.title = function() {
   var string = this.toString().toLowerCase()

   return string.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function($charOne){
     return $charOne.toUpperCase()
   })
 }

 /**
  * Replace http:// by https:// in String
  * @return string
  */
 String.prototype.useHttps = function() {
   var string = this.toString()

   return string.replace('http://', 'https://')
 }



/******************
 * Routes Handler *
 ******************/

/**
 * currentTag
 * @type string
 */
var currentTag = null

/**
 * routes
 * @type Object
 */
var routes = {}

/**
 * Mount tag
 * @param  string tag
 * @param  string options
 */
function mount(tag, options) {
  currentTag && currentTag.unmount(true)
  currentTag = riot.mount('#content', tag, options)[0]
}

/**
 * Routes handler
 * @param  string collection
 * @param  string id
 * @param  string action
 */
function handler(collection, id, action) {
  var fn = routes[collection || 'home']
  fn ? fn(id, action) : mount('tweetch-error')
}



/*******************
 * AbstractService *
 *******************/

/**
 * AbstractService class.
 */
class AbstractService {

  /**
   * AbstractService constructor method.
   * @param  string endpoint
   * @return AbstractService
   */
  constructor(endpoint) {
    this.protocol  = location.protocol+'//'
    this.host      = location.host+'/'
    this.endpoint  = 'api/'+endpoint
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

/**
 * GameService class.
 */
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
   * @param  string page
   * @return Object
   */
  fetchTop(page) {
    var self = this
    this.url = this.url+'/'+page

    return this.serve('top', page)
  }
}



/********
 * Home *
 ********/

/**
 * gameService
 * @type GameService
 */
var gameService = new GameService()

/**
 * Home route definition
 * @param  string id
 * @param  string action
 * @return Object
 */
routes.home = function(id, action) {
  mount('tweetch-loading')
  gameService.fetchTop('1').done(function(top) {
    mount('tweetch-home', {top: top})
  })
}



/*********
 * About *
 *********/

/**
 * About route definition
 * @param  string id
 * @param  string action
 * @return Object
 */
routes.about = function(id, action) {
    mount('tweetch-about')
}



/***********
 * Run app *
 ***********/
riot.route.start(true)
riot.mount('*')
riot.route(handler)
