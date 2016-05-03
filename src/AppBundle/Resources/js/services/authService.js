"use strict"

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
      var resource = sessionStorage.getItem('tweetch-resource'),
          id       = sessionStorage.getItem('tweetch-id'),
          query    = sessionStorage.getItem('tweetch-query'),
          page     = sessionStorage.getItem('tweetch-page')
      handler(resource, id, query, page)
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

    $('.my-games').show().attr('href', '#users/'+username+'/games')
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
