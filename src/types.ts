import type { AxiosRequestConfig } from 'axios'

// #region GeoSearchEngine

export interface GeoSearchEngine {
  getAutoCompleteDetails: (query: string, options?: GeoSearch) => Promise<GeoSearchResults>
}

export interface GeoSearchEngineConfiguration {
  defaults?: GeoSearch
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GeoSearch {}

export interface GeoSearchResults {
  results: GeoSearchResult[]
}

export interface GeoSearchResult {
  placeId: string
  address: GeoSearchResultAddress
  position: GeoSearchPoint
}

export interface GeoSearchResultAddress {
  country: string | null
  countryCode: string | null
  countryCodeISO3: string | null
  countrySecondarySubdivision: string | null
  countrySubdivision: string | null
  countrySubdivisionCode: string | null
  countrySubdivisionName: string | null
  countryTertiarySubdivision: string | null
  extendedPostalCode: string | null
  freeformAddress: string | null
  localName: string | null
  municipality: string | null
  municipalitySecondarySubdivision: string | null
  municipalitySubdivision: string | null
  neighbourhood: string | null
  postalCode: string | null
  streetName: string | null
  streetNumber: string | null
}

export interface GeoSearchPoint {
  lat: number
  lon: number
}

// #endregion GeoSearchEngine

// #region TomTomGeoSearchEngine

export interface TomTomGeoSearchEngineConfiguration extends GeoSearchEngineConfiguration {
  apiKey: string
  apiVersion?: string
  axiosConfig?: AxiosRequestConfig
  baseUrl?: string
  defaults?: TomTomGeoSearchOptions
}

export interface TomTomGeoSearchOptions extends GeoSearch {
  boundingBox?: TomTomBoundingBoxOptions // Bounding box to constrain the search results.
  brandSet?: string // List of brand names which could be used to restrict the result to Points Of Interest of specific brands.
  categorySet?: string // List of categories which could be used to restrict the result to the Points Of Interest of specific categories. The list of categories can be discovered using the POI Categories endpoint.
  connectorSet?: string // List of connector types which could be used to restrict the result to the Points Of Interest of type Electric Vehicle Station supporting specific connector types. See: List of supported connector types
  countrySet?: string // Country codes in ISO 3166-1 alpha-2 or alpha-3 code formats (e.g., FR,ES or FRA,ESP). This will limit the search to the specified countries. The choice of view may restrict which countries are available.
  entityTypeSet?: TomTomEntityType | TomTomEntityType[] // A comma-separated list of entity types which can be used to restrict the result to the Geography result of a specific entity type. If entityTypeSet is specified, only a Geography result with a proper entity type will be returned.
  extendedPostalCodesFor?: string // Indexes for which extended postal codes should be included in the results.
  fuelSet?: string // List of fuel types which could be used to restrict the result to the Points Of Interest of specific fuels. If fuelSet is specified, the query can remain empty. Only POIs with a proper fuel type will be returned.
  geoBias?: string // Location bias for search, which can be specified in different shapes. Location bias is used to communicate a location preference to the search engine - for example, to bias search results to the user's viewport. Currently two types are supported: point and rectangle.
  idxSet?: string // List of indexes which should be utilized for the search.
  language?: string // Language in which search results should be returned. It should be one of the TomTom supported IETF language tags , case insensitive. When data in the specified language is not available for a specific field or the language is not specified, the language best matched with your query is used.
  latitude?: number // Latitude, e.g., lat=37.337 lat,lon where results should be biased. Note: supplying a lat/lon without a radius will only bias the search results to that area.
  limit?: number
  longitude?: number // Longitude, e.g., lon=-121.89 lat,lon where results should be biased. Note: supplying a lat/lon without a radius will only bias the search results to that area.
  mapcodes?: string // Enables the return of a comma-separated mapcodes list. Can also filter the response to only show selected mapcode types. See mapcodes in the response.
  maxFuzzyLevel?: number // Maximum fuzzyness level to be used.
  maxPowerKW?: number // An optional parameter which could be used to restrict the result to the Points Of Interest of type Electric Vehicle Station supporting at least one connector with a specific maximum value of power in kilowatts (closed interval - with that value).
  minFuzzyLevel?: number // Minimum fuzzyness level to be used.
  minPowerKW?: number // An optional parameter which could be used to restrict the result to the Points Of Interest of type Electric Vehicle Station supporting at least one connector with a specific minimal value of power in kilowatts (closed interval - with that value).
  offset?: number
  openingHours?: string // List of opening hours for a POI (Points of Interest).
  radius?: number // If radius and position are set the results will be constrained to the defined area. The radius parameter is specified in meters. Valid radius values are numbers greater than 0. Supplying values equal to or lesser than 0 causes the parameter to be ignored.
  relatedPois?: TomTomRelatedPoi // An optional parameter that provides the possibility to return related Points Of Interest.
  timeZone?: string // Used to indicate the mode in which the timeZone object should be returned.
  typeahead?: boolean
  vehicleTypeSet?: TomTomVehicleType | TomTomVehicleType[] // List of vehicle types that could be used to restrict the result to the Points Of Interest of specific vehicles. If vehicleTypeSet is specified, the query can remain empty. Only POIs with a proper vehicle type will be returned.
  view?: string // Geopolitical View. The context used to resolve the handling of disputed territories. Views include Unified , along with AR , IL , IN , MA , PK , RU , TR , and CN which are respectively tailored for Argentina, Israel, India, Morocco, Pakistan, Russia, Turkey, and China.
}

export interface TomTomBoundingBoxOptions {
  topLeft?: string // Top-left position of the bounding box. Note: the btmRight parameter should always go along with the topLeft parameter as they both define the bounding box.
  bottomRight?: string // Bottom-right position of the bounding box. Note: The btmRight parameter should always go along with the topLeft parameter as they both define the bounding box.
}

export type TomTomVehicleType = 'Car' | 'Truck'

export type TomTomMapCode = 'Local' | 'International' | 'Alternative'

export type TomTomRelatedPoi = 'off' | 'child' | 'parent' | 'all'

export type TomTomEntityType =
  | 'Country'
  | 'CountrySubdivision'
  | 'CountrySecondarySubdivision'
  | 'CountryTertiarySubdivision'
  | 'Municipality'
  | 'MunicipalitySubdivision'
  | 'MunicipalitySecondarySubdivision'
  | 'Neighbourhood'
  | 'PostalCodeArea'

export interface TomTomGeoSearchResponse {
  summary: TomTomGeoSearchSummary
  results: TomTomGeoSearchResult[]
}

export interface TomTomGeoSearchSummary {
  query: string
  queryType: string
  queryTime: number
  numResults: number
  offset: number
  totalResults: number
  fuzzyLevel: number
  queryIntent: TomTomGeoSearchQueryIntent[]
}

export interface TomTomGeoSearchQueryIntent {
  type: string
  details: object
}

export interface TomTomGeoSearchResult {
  type: string
  id: string
  score: number
  info: string
  poi: TomTomGeoSearchPoi
  address: GeoSearchResultAddress
  position: GeoSearchPoint
  viewport: TomTomGeoSearchViewport
  entryPoints: TomTomGeoSearchEntryPoint[]
}

export interface TomTomGeoSearchPoi {
  name: string
  categorySet: TomTomGeoSearchCategory[]
  url: string
  categories: string[]
  classifications: TomTomGeoSearchClassification[]
}

export interface TomTomGeoSearchCategory {
  id: number
}

export interface TomTomGeoSearchClassification {
  code: string
  names: TomTomGeoSearchClassificationName[]
}

export interface TomTomGeoSearchClassificationName {
  nameLocale: string
  name: string
}

export interface TomTomGeoSearchViewport {
  topLeftPoint: GeoSearchPoint
  btmRightPoint: GeoSearchPoint
}

export interface TomTomGeoSearchEntryPoint {
  type: string
  position: GeoSearchPoint
}

// #endregion TomTomGeoSearchEngine
