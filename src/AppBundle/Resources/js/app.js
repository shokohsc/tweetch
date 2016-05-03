"use strict"

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
  var authResources = ['login', 'logout', 'oauth']
  if (false === authResources.includes(resource)){
    sessionStorage.setItem('tweetch-resource', resource)
    sessionStorage.setItem('tweetch-id', id)
    sessionStorage.setItem('tweetch-query', query)
    sessionStorage.setItem('tweetch-page', page)
  }
  var fn = routes[resource || 'home']
  fn ? fn(id, query, page) : mount('tweetch-error')
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
 * userService
 * @type UserService
 */
var userService = new UserService()

/**
 * authService
 * @type AuthService
 */
var authService = new AuthService()

/**
 * Home route definition
 * @param  string id
 * @param  string page
 * @return Object
 */
routes.home = function(id, page) {
  mount('tweetch-loading')
  gameService.fetchTop(page).done(function(top) {
    mount('tweetch-home', top)
  })
}

/**
 * Stream route definition
 * @param  string id
 * @param  string query
 * @param  string page
 * @return Object
 */
routes.streams = function(id, query, page) {
  mount('tweetch-loading')
  switch (id) {
    case 'game':
      streamService.fetchGameStreams(query, page).done(function(streams) {
        mount('tweetch-streams', streams)
      })
      break
    case 'featured':
      streamService.fetchFeaturedStreams(page).done(function(streams) {
        mount('tweetch-featured-streams', streams)
      })
      break
    case 'followed':
      if (authService.isUserLoggedIn()) {
        streamService.fetchFollowedStreams(page).done(function(streams) {
            mount('tweetch-followed-streams', streams)
        })
      } else {
        handler('home')
      }
      break
    default:
      streamService.fetchStream(id).done(function(stream) {
        mount('tweetch-stream', {stream: stream, loggedIn: authService.isUserLoggedIn()})
      })
      break
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
      break
    case 'games':
      searchService.fetchGames(query).done(function(search) {
        mount('tweetch-search', search)
      })
      break
    case 'streams':
      searchService.fetchStreams(query, page).done(function(search) {
        mount('tweetch-search', search)
      })
      break
    default:
      mount('tweetch-error')
  }
}

/**
 * User route definition
 * @param  string id
 * @param  string resource
 * @param  string page
 * @return Object
 */
routes.users = function(id, resource, page) {
  mount('tweetch-loading')
  if (authService.isUserLoggedIn()) {
    userService.fetchFollowedGames(id, page).done(function(games) {
      mount('tweetch-follows-games', games)
    })
  } else {
    handler('home')
  }
}

/**
 * About route definition
 * @return Object
 */
routes.about = function() {
    mount('tweetch-about')
}

/**
 * Login route definition
 * @return Object
 */
routes.login = function() {
  authService.trigger('login')
}

/**
 * Authentification route definition
 * @return Object
 */
routes.oauth = function() {
  mount('tweetch-loading')
  authService.trigger('oauth')
}

/**
 * Logout route definition
 * @return Object
 */
routes.logout = function() {
  authService.trigger('logout')
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

/**
 * Twitch initialization
 * @param  Object client id
 */
Twitch.init({
  clientId: $('meta[name="client_id"]').attr('content')
})
