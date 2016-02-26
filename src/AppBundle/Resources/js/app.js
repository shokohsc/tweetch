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
 String.prototype.encrypt = function() {
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
 * @param  string resource
 * @param  string id
 * @param  string query
 * @param  string page
 */
function handler(resource, id, query, page) {
  var fn = routes[resource || 'home']
  fn ? fn(id, query, page) : mount('tweetch-error')
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
   * @return Promise
   */
  serve(id, page) {
    var self      = this,
        url       = this.protocol+this.host+this.endpoint
        url       = (id === undefined) ? url : url+'/'+id
        url       = (page === undefined) ? url : url+'/'+page

    return $.ajax({
      url: url
    }).fail(function() {
      mount('tweetch-error')
    })
  }
}



/*********************
 * Endpoint Services *
 *********************/

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
    return this.serve('top', page)
  }
}

/**
 * StreamService class.
 */
class StreamService extends AbstractService{

  /**
   * StreamService constructor method.
   * @return StreamService
   */
  constructor() {
    super('streams')
  }

  /**
   * Fetch stream
   * @param string id
   * @return Object
   */
  fetchStream(id) {
    return this.serve(id)
  }

  /**
   * Fetch game streams
   * @param string query
   * @param int    page
   * @return Object
   */
  fetchGameStreams(query, page) {
    query = encodeURIComponent(query)
    return this.serve('game/'+query, page)
  }
}

/**
 * SearchService class.
 */
class SearchService extends AbstractService{

  /**
   * SearchService constructor method.
   * @return SearchService
   */
  constructor() {
    super('search')
  }

  /**
   * Fetch search channels
   * @param string query
   * @param int    page
   * @return Object
   */
  fetchChannels(query, page) {
    return this.serve('channels/'+query, page)
  }

  /**
   * Fetch search games
   * @param string query
   * @return Object
   */
  fetchGames(query) {
    return this.serve('games/'+query)
  }

  /**
   * Fetch search streams
   * @param string query
   * @param int    page
   * @return Object
   */
  fetchStreams(query, page) {
    return this.serve('streams/'+query, page)
  }
}


/*********************
 * Route definitions *
 *********************/

/**
 * gameService
 * @type GameService
 */
var gameService = new GameService()

/**
 * streamService
 * @type StreamService
 */
var streamService = new StreamService()

/**
 * searchService
 * @type SearchService
 */
var searchService = new SearchService()

/**
 * Home route definition
 * @param  string id
 * @param  string query
 * @param  string page
 * @return Object
 */
routes.home = function(id, query, page) {
  mount('tweetch-loading')
  gameService.fetchTop(query).done(function(top) {
    mount('tweetch-home', top)
  })
}

/**
 * Stream route definition
 * @param  string id
 * @param  string query
 * @return Object
 */
routes.streams = function(id, query, page) {
  mount('tweetch-loading')
  if ('game' === id) {
    streamService.fetchGameStreams(query, page).done(function(streams) {
      mount('tweetch-streams', streams)
    })
  } else {
    streamService.fetchStream(id).done(function(stream) {
      mount('tweetch-stream', stream)
    })
  }
}

/**
 * Search route definition
 * @param  string resource
 * @param  string query
 * @param  string page
 * @return Object
 */
routes.search = function(resource, query, page) {
  mount('tweetch-loading')
  switch (resource) {
    case 'channels':
      searchService.fetchChannels(query, page).done(function(search) {
        mount('tweetch-search', search)
      })
      break;
    case 'games':
      searchService.fetchGames(query).done(function(search) {
        mount('tweetch-search', search)
      })
      break;
    case 'streams':
      searchService.fetchStreams(query, page).done(function(search) {
        mount('tweetch-search', search)
      })
      break;
    default:
      mount('tweetch-error')
  }
}

/**
 * About route definition
 * @return Object
 */
routes.about = function() {
    mount('tweetch-about')
}



/***********
 * Run app *
 ***********/

 /**
  * Mount all the tags !!!!
  * @param  string '*'
  */
 riot.mount('*')

 /**
  * Changes the browser URL and notifies all the listeners assigned with
  * @param  Object handler
  */
 riot.route(handler)

 /**
  * Start listening the url changes.
  * @param  bool
  */
 riot.route.start(true)
