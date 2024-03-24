import type { GeoSearchResult } from './types'
import TomTomGeoSearchEngine from './tomtom-geo-search-engine'

/**
 * getPlaceAutocomplete exists only for backward-compatibility purposes. It wraps the underlying TomTomGeoSearchEngine.getAutoCompleteDetails method.
 * It performs the orignal behaviour of not filtering for AU only results to support any existing consumers of this library.
 * @param key TomTom API key
 * @param address the address to search for
 * @returns a list of GeoSearchResults
 */
export async function getPlaceAutocomplete (key: string, address: string): Promise<GeoSearchResult[]> {
  const engine = new TomTomGeoSearchEngine({ apiKey: key })
  const params = {
    limit: 100,
    countrySet: ''
  }
  const res = await engine.getAutoCompleteDetails(address, params)
  return res.results
}
