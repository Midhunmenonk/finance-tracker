// src/pages/DashboardPage.jsx
import React from 'react';
import { useSelector } from 'react-redux'; // ✅ Correct import source
import { useGetLatestRatesQuery } from '../app/api/exchangeApi';
import SummaryCard from '../components/dashboard/SummaryCard';
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown';
import RecentTransactionsList from '../components/dashboard/RecentTransactionsList';
import AddTransactionForm from '../components/dashboard/AddTransactionForm';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import SpendingInsight from '../components/dashboard/SpendingInsight';
import { FaArrowUp, FaArrowDown, FaScaleBalanced } from "react-icons/fa6";

const DashboardPage = () => {
  const transactions = useSelector(state => state.transactions.items);
  const { baseCurrency } = useSelector(state => state.settings);

  const { data: ratesData, error, isLoading } = useGetLatestRatesQuery(baseCurrency);

  const currentDate = new Date().toLocaleString('en-IN', { 
    month: 'long', 
    year: 'numeric' 
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading financial data...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Could not fetch exchange rates. Using raw values.</div>;
  }

  const convertAmount = (amount, currency) => {
    if (!ratesData || currency === baseCurrency) return amount;
    const rate = ratesData.conversion_rates[currency];
    return rate ? amount / rate : 0;
  };
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + convertAmount(t.amount, t.currency), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + convertAmount(t.amount, t.currency), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      <p className="text-gray-500 mb-8">
        Welcome back. Here's your financial summary for {currentDate}.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard title="Total Income" amount={totalIncome} color="green" icon={<FaArrowUp size={24} />} baseCurrency={baseCurrency} />
        <SummaryCard title="Total Expenses" amount={totalExpenses} color="red" icon={<FaArrowDown size={24} />} baseCurrency={baseCurrency} />
        <SummaryCard title="Balance" amount={balance} color="blue" icon={<FaScaleBalanced size={24} />} baseCurrency={baseCurrency} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AddTransactionForm />
          <RecentTransactionsList />
        </div>
        <div className="space-y-6">
          <BudgetProgress />
          <ExpenseBreakdown />
          <SpendingInsight />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;