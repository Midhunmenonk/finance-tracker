import { useSelector } from 'react-redux';
import { useGetLatestRatesQuery } from '../app/api/exchangeApi';

export const useCurrencyConverter = () => {
  const { baseCurrency } = useSelector((state) => state.settings);
  const { data: ratesData, error, isLoading } = useGetLatestRatesQuery(baseCurrency);

  const convertAmount = (amount, currency) => {
    if (!currency) {
      return amount;
    }

    if (isLoading || error || !ratesData || currency === baseCurrency) {
      return amount;
    }
    
    const rate = ratesData.conversion_rates[currency];
    
    return rate ? amount / rate : amount;
  };

  return {
    baseCurrency,
    convertAmount,
    isLoading,
  };
};