import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://v6.exchangerate-api.com/v6/${API_KEY}/` }),
  endpoints: (builder) => ({
    // This endpoint fetches the latest rates for a given base currency
    getLatestRates: builder.query({
      query: (baseCurrency = 'USD') => `latest/${baseCurrency}`,
    }),
  }),
});

// RTK Query automatically generates a hook based on the endpoint name
export const { useGetLatestRatesQuery } = exchangeApi;