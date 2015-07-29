/**
 * Module used for caching the data incoming from source, saving the data transfer and time
 * @author Marián Hlaváč
 */

export default class DataCache {
    constructor () {

      // Declare cache variables
      this.cachedData = []
    }

    static cacheData (dateFrom, dateTo, data) {

    }

    static lookupCache (dateFrom, dateTo) {
      return null
    }
}
