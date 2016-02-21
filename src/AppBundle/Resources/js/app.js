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
   * @param  string query
   * @return Promise
   */
  serve(id, page, query) {
    var self      = this,
        url       = this.protocol+this.host+this.endpoint,
        url       = (id === undefined) ? url : url+'/'+id,
        url       = (page === undefined) ? url : url+'/'+page,
        url       = (query === undefined) ? url : url+'?'+query

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
    var self = this
    this.url = this.url+'/'+page

    return this.serve('top', page)
  }
}

/**
 * ChannelService class.
 */
class ChannelService extends AbstractService{

  /**
   * ChannelService constructor method.
   * @return ChannelService
   */
  constructor() {
    super('channels')
  }

  /**
   * Fetch channel
   * @param string id
   * @return Object
   */
  fetchChannel(id) {
    return this.serve(id)
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
   * Fetch streams
   * @return Object
   */
  fetchStreams() {
    var query = riot.route.query()
        query = $.param(query)

    return this.serve(undefined, undefined, query)
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
 * channelService
 * @type ChannelService
 */
var channelService = new ChannelService()

/**
 * streamService
 * @type StreamService
 */
var streamService = new StreamService()

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

/**
 * Channel route definition
 * @param  string id
 * @param  string action
 * @return Object
 */
routes.channels = function(id, action) {
  mount('tweetch-loading')
  if (id && !id.match(/=/)) {
    channelService.fetchChannel(id).done(function(channel) {
      mount('tweetch-channel', {channel: channel})
    })
  } else {
    mount('tweetch-error')
  }
}

/**
 * Stream route definition
 * @param  string id
 * @param  string action
 * @return Object
 */
routes.streams = function(id, action) {
  mount('tweetch-loading')
  if (id && !id.match(/=/)) {
    streamService.fetchStream(id).done(function(stream) {
      mount('tweetch-stream', {stream: stream})
    })
  } else {
    streamService.fetchStreams().done(function(streams) {
      mount('tweetch-streams', {streams: streams})
    })
  }
}

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
riot.mount('*')
riot.route(handler)
riot.route.start(true)
