# Montu Geo Search Engine

This is my (Sean McCullough) implementation of the Montu Geo Search back-end technical test.

For my implementation, I have refactored the codebase to behave as a class-instance based library where a search engine instance has methods to perform the fuzzy search.
This makes the code more portable and easier to add additional implementations from various providers in future by using standard interfaces.

I have also changed the return type to an object containing an array. This could allow future expansion to include pagination information etc.

## Install:

**Using npm:**
```sh
npm install @montu/maps-backend-challenge
```

**Using Yarn:**
```sh
yarn add @montu/maps-backend-challenge
```

## Usage

The TomTomGeoSearchEngine class allows you to interact with the TomTom Fuzzy Search API.

```ts
import { TomTomGeoSearchEngine } from '@montu/maps-backend-challenge'

const config = {
   apiKey: process.env.TOMTOM_API_KEY
}
const geoSearch = new TomTomGeoSearchEngine(config)
```

### getAutoCompleteDetails

Returns a list of potential fuzzy matches based on the search query

```ts
const opts = { // see TomTomGeoSearchOptions for all options
  countrySet: 'AU' // 'AU' by default
  maxFuzzyLevel: 4
  minFuzzyLevel: 1
}
const { results } = await geoSearch.getAutoCompleteDetails('Big Pineapple', opts)
console.log(results[0].address.freeformAddress) // -> 351 Pacific Highway, Coffs Harbour, New South Wales, 2450
```

## Contributing

To contribute to this library, please use:

- ts-standard (installed as a devdependency)
- Prettier (format on save will conflict with ts-standard but didn't have the time to fix this)

## Test:

1. `yarn install`
1. `yarn lint`
1. `yarn test`

## Requirements:

1. [ ] All tests should pass and ensure good coverage for new work
2. We only allow Australian addresses to be returned
   - [x] Refactor to create a search engine instance with global params such as country
   - [x] Include options interface to reflect TomTom API params
3. Code should be maintainable and consistent
   - [x] Initialise git repo with .gitignore
   - [x] Interfaces/classes
   - [x] Method descriptions
   - [x] README entries for methods and usage
4. The result elements should contain important information about the place (country, municipality, etc)
   - [x] Create response object return interface/type
5. [ ] The returned result should be typed and easily consumable via users of the library
6. No front-end requirements are necessary, this is purely a backend NodeJS library
