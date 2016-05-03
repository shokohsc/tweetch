"use strict"

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
