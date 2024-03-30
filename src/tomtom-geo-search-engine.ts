import axios, { AxiosInstance, type AxiosResponse } from 'axios'
import type {
  GeoSearchEngine,
  GeoSearchResults,
  GeoSearchResult,
  GeoSearchResultAddress,
  TomTomGeoSearchOptions,
  TomTomGeoSearchEngineConfiguration,
  TomTomGeoSearchResponse,
  TomTomGeoSearchResult
} from './types'

/**
 * TomTomGeoSearchEngine is a class that provides a wrapper around the TomTom API for fuzzy searching.
 */
export default class TomTomGeoSearchEngine implements GeoSearchEngine {
  private readonly _config: TomTomGeoSearchEngineConfiguration
  private readonly _api: AxiosInstance

  constructor (config: TomTomGeoSearchEngineConfiguration) {
    this._config = Object.assign(
      {
        baseUrl: 'https://api.tomtom.com',
        apiVersion: '2'
      },
      config
    )
    this._config.defaults = Object.assign(
      {
        limit: 10,
        countrySet: ['AU']
      },
      this._config.defaults
    )
    this._api = this._configureApi()
  }

  _configureApi (): AxiosInstance {
    const key = this._config.apiKey
    if (key === '') throw new Error('No API key provided')
    const api = axios.create({
      baseURL: this._config.baseUrl,
      ...(this._config.axiosConfig ?? {})
    })
    api.interceptors.request.use(config => {
      config.params.key = key
      return config
    })
    return api
  }

  /**
   * getAutoCompleteDetails provides a list of places based on a search query. The search is performed in a fuzzy manner using the TomTom API.
   * @param query the fuzzy search query
   * @param options options for performing the fuzzy search. Defaults are applied from config.defaults.
   * @returns
   */
  async getAutoCompleteDetails (query: string, options?: TomTomGeoSearchOptions): Promise<GeoSearchResults> {
    const encodedQuery = encodeURIComponent(query)
    const path = `/search/${this._config.apiVersion ?? '2'}/search/${encodedQuery}.json`
    const opts = {
      params: {
        ...this._config.defaults,
        ...options
      }
    }
    const autocomplete: AxiosResponse<TomTomGeoSearchResponse> = await this._api.get(path, opts)
    const results = mapResponse(autocomplete.data)
    return results
  }
}

function mapResponse (response: TomTomGeoSearchResponse): GeoSearchResults {
  return {
    results: response.results.map(result => mapResult(result))
  }
}

function mapResult (result: TomTomGeoSearchResult): GeoSearchResult {
  return {
    placeId: result.id,
    address: mapAddress(result.address),
    position: result.position
  }
}

function mapAddress (address: GeoSearchResultAddress): GeoSearchResultAddress {
  return {
    country: address.country ?? null,
    countryCode: address.countryCode ?? null,
    countryCodeISO3: address.countryCodeISO3 ?? null,
    countrySecondarySubdivision: address.countrySecondarySubdivision ?? null,
    countrySubdivision: address.countrySubdivision ?? null,
    countrySubdivisionCode: address.countrySubdivisionCode ?? null,
    countrySubdivisionName: address.countrySubdivisionName ?? null,
    countryTertiarySubdivision: address.countryTertiarySubdivision ?? null,
    extendedPostalCode: address.extendedPostalCode ?? null,
    freeformAddress: address.freeformAddress ?? null,
    localName: address.localName ?? null,
    municipality: address.municipality ?? null,
    municipalitySecondarySubdivision: address.municipalitySecondarySubdivision ?? null,
    municipalitySubdivision: address.municipalitySubdivision ?? null,
    neighbourhood: address.neighbourhood ?? null,
    postalCode: address.postalCode ?? null,
    streetName: address.streetName ?? null,
    streetNumber: address.streetNumber ?? null
  }
}
