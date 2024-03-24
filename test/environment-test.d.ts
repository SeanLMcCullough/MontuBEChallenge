declare global {
  namespace NodeJS {
    interface Global {}
    interface ProcessEnv {
      TOMTOM_API_KEY: string
    }
  }
}

export {}
