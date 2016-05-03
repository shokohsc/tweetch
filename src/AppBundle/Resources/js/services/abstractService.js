"use strict"

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
