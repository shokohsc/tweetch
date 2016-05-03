"use strict"

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
