// src/hooks/useCurrencyConverter.js
import { useSelector } from 'react-redux';
import { useGetLatestRatesQuery } from '../app/api/exchangeApi';

export const useCurrencyConverter = () => {
  const { baseCurrency } = useSelector((state) => state.settings);
  const { data: ratesData, error, isLoading } = useGetLatestRatesQuery(baseCurrency);

  const convertAmount = (amount, currency) => {
    // ✅ FIX: If a transaction has no currency, assume it's already in the base currency.
    if (!currency) {
      return amount;
    }

    if (isLoading || error || !ratesData || currency === baseCurrency) {
      return amount;
    }
    
    const rate = ratesData.conversion_rates[currency];
    
    // ✅ FIX: Fallback to the original amount instead of 0 if a rate isn't found.
    return rate ? amount / rate : amount;
  };

  return {
    baseCurrency,
    convertAmount,
    isLoading,
  };
};