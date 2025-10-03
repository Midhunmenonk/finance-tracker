// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactions/transactionsSlice';
import budgetReducer from '../features/budgets/budgetSlice';
import settingsReducer from '../features/settings/settingsSlice'; // Import
import { exchangeApi } from './api/exchangeApi';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    budgets: budgetReducer,
    settings: settingsReducer, // Add reducer
    [exchangeApi.reducerPath]: exchangeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exchangeApi.middleware),
});