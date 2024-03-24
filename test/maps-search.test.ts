import { describe } from '@jest/globals'
import { config } from 'dotenv'
import { getAutoCompleteDetails } from '../src'
import { getPlaceAutocomplete } from '../src/maps-api'
import { wait } from './test-util'

config()

// Wait between test runs to avoid hitting 429 rate limit from TomTom.
beforeEach(async () => {
  await wait(1000)
})

// These are end-to-end tests and need an api key
describe('Tomtom Places E2E Tests', () => {
  describe('getAutoCompleteDetails', () => {
    it('returns a promise', async () => {
      const res = getAutoCompleteDetails('Charlotte Street')
      expect(res).toBeInstanceOf(Promise)
      await res
    })

    it('can fetch from the autocomplete api', async () => {
      const res = await getAutoCompleteDetails('Charlotte Street')
      const firstRes = res[0]
      expect(firstRes).toHaveProperty('placeId')
      expect(firstRes.address).toHaveProperty('streetNumber')
      expect(firstRes.address).toHaveProperty('countryCode')
      expect(firstRes.address).toHaveProperty('country')
      expect(firstRes.address).toHaveProperty('freeformAddress')
      expect(firstRes.address).toHaveProperty('municipality')
    })
  })

  describe('getPlaceAutocomplete', () => {
    it('handles no results', async () => {
      const res = await getPlaceAutocomplete(process.env.TOMTOM_API_KEY, 'asfasffasfasafsafs')
      expect(res).toStrictEqual([])
    })

    it('handles error', () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      expect(getPlaceAutocomplete(process.env.TOMTOM_API_KEY, '')).rejects.toThrow()
    })
  })
})
