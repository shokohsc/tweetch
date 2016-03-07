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
    this.endpoint  = 'api'+endpoint
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
        url       = (id === undefined || id == 'undefined') ? url : url+'/'+id
        url       = (page === undefined || page == 'undefined') ? url : url+'/'+page

    return $.ajax({
      url: url,
      beforeSend: function(xhr){
        var accessToken = sessionStorage.getItem('accessToken')
            accessToken = !accessToken ? Twitch.getToken() : accessToken
            accessToken = window.btoa(accessToken)
        xhr.setRequestHeader('authorization', accessToken)
      }
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
    super('/games')
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
    super('/streams')
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

  /**
   * Fetch featured streams
   * @param int    page
   * @return Object
   */
  fetchFeaturedStreams(page) {
    return this.serve('featured', page)
  }

  /**
   * Fetch followed streams
   * @param int    page
   * @return Object
   */
  fetchFollowedStreams(page) {
    return this.serve('followed', page)
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
    super('/search')
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

/**
 * UserService class.
 */
class UserService extends AbstractService{

  /**
   * UserService constructor method.
   * @return UserService
   */
  constructor() {
    super('/users')
  }

  /**
   * Fetch user followed games
   * @param  string id
   * @param  string page
   * @return Object
   */
  fetchFollowedGames(id, page) {
    return this.serve(id+'/games', page)
  }
}

/**
 * AuthService class.
 */
class AuthService extends AbstractService{

  /**
   * AuthService constructor method.
   * @return AuthService
   */
  constructor() {
    super('/auth')
    // Make AuthService instances observable
    riot.observable(this)
    var self         = this,
        redirect_uri = self.protocol+self.host+'#oauth',
        scope        = ['user_read', 'channel_read']

    // listen to 'login' event
    this.on('login', function() {
      var username = sessionStorage.getItem('username')
      if (!username) {
        Twitch.login({
          redirect_uri: redirect_uri,
          scope: scope
        })
      } else {
        self.updateUILogin(username)
      }
    })

    // listen to 'oauth' event
    this.on('oauth', function() {
      Twitch.getStatus(function(err, status) {
        if (status.authenticated) {
          self.trigger('logged-in')
        }
      })
    })

    // listen to 'logged-in' event
    this.on('logged-in', function() {
      self.serve('me').done(function(user) {
        self.updateUILogin(user.name)
        sessionStorage.setItem('username', user.name)
        sessionStorage.setItem('accessToken', Twitch.getToken())
        self.historyHandler()
      })
    })

    // listen to 'logout' event
    this.on('logout', function() {
      Twitch.logout(function(error) {
        self.trigger('logged-out')
      })
    })

    // listen to 'logged-out' event
    this.on('logged-out', function() {
      self.updateUILogout()
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('accessToken')
      self.historyHandler()
    })
  }

  /**
   * History handler, redirect to page before login/logout
   */
  historyHandler() {
    if (sessionStorage.getItem('tweetch-resource')) {
      handler(sessionStorage.getItem('tweetch-resource'), sessionStorage.getItem('tweetch-id'), sessionStorage.getItem('tweetch-query'), sessionStorage.getItem('tweetch-page'))
    } else {
      handler('home')
    }
  }

  /**
   * Is current user logged in ?
   * @return Boolean
   */
  isUserLoggedIn() {
    return null !== sessionStorage.getItem('username') && null !== sessionStorage.getItem('accessToken')
  }

  /**
   * Ui user has logged in function
   * @param  Object twitch username
   */
  updateUILogin(username) {
    $('.anon').hide()
    $('.auth').show()

    var search = '[username]'
    var href = $('.auth').attr('href')
    $('.my-games').show().attr('href', href.replace(search, username))
  }

  /**
   * Ui user has logged out function
   */
  updateUILogout() {
    $('.anon').show()
    $('.auth').hide()

    $('.my-games').hide().attr('href', '#users/[username]/games')
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
