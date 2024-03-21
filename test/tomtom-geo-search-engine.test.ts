import { config } from 'dotenv'
import { describe } from '@jest/globals'
import { TomTomGeoSearchEngine } from '../src'

config()

describe('TomTomGeoSearchEngine', () => {
  it('can be constructed with a config object', () => {
    const config = {
      apiKey: process.env.TOMTOM_API_KEY
    }
    const engine = new TomTomGeoSearchEngine(config)
    expect(engine).toBeInstanceOf(TomTomGeoSearchEngine)
  })

  it('Throws an error if no api key is provided', () => {
    const config = {
      apiKey: ''
    }
    expect(() => new TomTomGeoSearchEngine(config)).toThrow()
  })
})

describe('getPlaceAutocomplete', () => {
  let engine: TomTomGeoSearchEngine

  beforeAll(() => {
    const config = {
      apiKey: process.env.TOMTOM_API_KEY
    }
    engine = new TomTomGeoSearchEngine(config)
  })

  it('returns a promise', () => {
    const res = engine.getAutoCompleteDetails('Big Pineapple')
    console.log(res)
    expect(res).toBeInstanceOf(Promise)
  })

  it('can fetch a location with a street address from the autocomplete api', async () => {
    const res = await engine.getAutoCompleteDetails('big banana')
    expect(res).toHaveProperty('results')
    expect(res.results).toBeInstanceOf(Array)
    expect(res.results.length).toBeGreaterThan(0)

    const firstRes = res.results[0]
    expect(firstRes).toHaveProperty('placeId')
    expect(firstRes).toHaveProperty('address')
    expect(firstRes).toHaveProperty('position')

    const { placeId, address, position } = firstRes
    expect(address).toHaveProperty('streetNumber')
    expect(address).toHaveProperty('countryCode')
    expect(address).toHaveProperty('country')
    expect(address).toHaveProperty('freeformAddress')
    expect(address).toHaveProperty('municipality')
    expect(address).toMatchSnapshot()
    expect(position).toHaveProperty('lat')
    expect(position).toHaveProperty('lon')
    expect(placeId).not.toBe('')
  })

  it('can fetch a location without a street address from the autocomplete api', async () => {
    const res = await engine.getAutoCompleteDetails('parliament house')
    expect(res).toHaveProperty('results')
    expect(res.results).toBeInstanceOf(Array)
    expect(res.results.length).toBeGreaterThan(0)

    const firstRes = res.results[0]
    expect(firstRes).toHaveProperty('placeId')
    expect(firstRes).toHaveProperty('address')
    expect(firstRes).toHaveProperty('position')

    const { placeId, address, position } = firstRes
    expect(address).toHaveProperty('streetNumber')
    expect(address).toHaveProperty('countryCode')
    expect(address).toHaveProperty('country')
    expect(address).toHaveProperty('freeformAddress')
    expect(address).toHaveProperty('municipality')
    expect(address).toMatchSnapshot()
    expect(position).toHaveProperty('lat')
    expect(position).toHaveProperty('lon')
    expect(placeId).not.toBe('')
  })

  it('handles a query that yields no results', async () => {
    const res = await engine.getAutoCompleteDetails(
      "You've got to be very careful if you don't know where you are going, because you might not get there."
    )
    expect(res.results).toStrictEqual([])
  })
})
