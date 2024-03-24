import type { GeoSearchResult } from './types'
import { getPlaceAutocomplete } from './maps-api'
export { default as TomTomGeoSearchEngine } from './tomtom-geo-search-engine'

/**
 * getAutoCompleteDetails exist as a compatibility layer for the old API. It wraps the getPlaceAutocomplete function.
 * It performs the original behaviour of not filtering for AU only results to support any existing consumers of this library.
 * Please use the TomTomGeoSearchEngine class for new uses.
 * @param address the address to search for
 * @returns a list of GeoSearchResults
 */
export async function getAutoCompleteDetails (address: any): Promise<GeoSearchResult[]> {
  const apiKey = process.env.TOMTOM_API_KEY
  const res = await getPlaceAutocomplete(apiKey, address)
  return res
}
