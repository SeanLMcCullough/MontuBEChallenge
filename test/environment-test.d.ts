declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOMTOM_API_KEY: string;
    }
  }
}

export {};
