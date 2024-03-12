namespace NodeJS {
  interface ProcessEnv {
    // --- From cross-env ---
    APP_TYPE?: 'extension';
    BUILD_MODE?: 'development';
    // --- From .env ---
    NEXT_PUBLIC_APP_TITLE: string;
    // --- From .env.{environment} ---
    NEXT_PUBLIC_APP_DESCRIPTION: string;
  }
}
