import axios, { type AxiosResponse } from 'axios'
import type { TomTomGeoSearchResponse, GeoSearchResults } from './types'

// https://developer.tomtom.com/search-api/documentation/search-service/fuzzy-search
export async function getPlaceAutocomplete (
  key: string,
  address: string
): Promise<GeoSearchResults> {
  const autocomplete: AxiosResponse<TomTomGeoSearchResponse> = await axios.get(
    `https://api.tomtom.com/search/2/search/${address}.json'`,
    {
      params: {
        key,
        limit: 100
      }
    }
  )
  const results = autocomplete.data.results.map((result) => {
    return {
      placeId: result.id,
      address: result.address,
      position: result.position
    }
  })
  return { results }
}
