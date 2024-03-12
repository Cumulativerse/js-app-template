import { generateEndpoints } from '@rtk-query/codegen-openapi';

const coreDirectory = '../core';

async function apiCodegen() {
  // CoinGeckoApi
  await generateEndpoints({
    // schemaFile: 'https://www.coingecko.com/api/documentations/v3/swagger.json',
    schemaFile: './src/api-codegen/swaggers/coinGecko-swagger.json',
    apiFile: '@/lib/redux/features/tmp/coinGeckoApi/coinGeckoApi.ts',
    apiImport: 'coinGeckoApi',
    outputFile:
      coreDirectory +
      '/src/lib/redux/features/tmp/coinGeckoApi/coinGeckoEndpoint.ts',
    exportName: 'coinGeckoApi',
    // hooks: true, // Generate query and mutation hooks, but not lazy queries
    hooks: { queries: true, lazyQueries: true, mutations: true },
  });
  console.log(`api-codegen: Updated api types in ${coreDirectory}`);
}

// Self-invocation async function
(async () => {
  await apiCodegen();
})().catch((err) => {
  console.error(err);
  throw err;
});
