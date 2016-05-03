"use strict"

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
