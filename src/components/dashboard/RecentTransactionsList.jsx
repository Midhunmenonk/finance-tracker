// src/components/dashboard/RecentTransactionsList.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from '../../features/transactions/transactionsSlice';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';
// 1. FiEdit2 icon removed from imports
import { FiTrash2, FiArrowUp, FiArrowDown } from 'react-icons/fi';

const RecentTransactionsList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.items);
  const { baseCurrency, convertAmount } = useCurrencyConverter();

  const recentTransactions = [...transactions].reverse().slice(0, 4);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Recent Transactions</h3>
      <div className="space-y-4">
        {recentTransactions.map((t) => {
          const isIncome = t.type === 'income';
          const convertedValue = convertAmount(t.amount, t.currency);
          const displayCurrency = t.currency || baseCurrency; 
          const showConverted = displayCurrency !== baseCurrency;

          return (
            <div key={t.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${isIncome ? 'bg-green-100' : 'bg-red-100'}`}>
                  {isIncome ? <FiArrowUp className="text-green-600" /> : <FiArrowDown className="text-red-600" />}
                </div>
                <div className="ml-4">
                  <span className="font-medium text-gray-700">{t.description}</span>
                  {showConverted && (
                    <p className="text-xs text-gray-500">
                      (≈ {convertedValue.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })})
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`font-semibold ${isIncome ? 'text-green-600' : 'text-red-500'}`}>
                  {isIncome ? '+' : '-'}{t.amount.toLocaleString('en-US', { 
                    style: 'currency', 
                    currency: displayCurrency
                  })}
                </span>
                <div className="flex items-center text-gray-400">
                  <button onClick={() => handleDelete(t.id)} className="hover:text-red-500 p-2">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactionsList;