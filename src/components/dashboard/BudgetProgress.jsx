// src/components/dashboard/BudgetProgress.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter'; // 1. Import the hook

const BudgetProgress = () => {
  const budgetGoals = useSelector(state => state.budgets.goals);
  const transactions = useSelector(state => state.transactions.items);
  const { baseCurrency, convertAmount, isLoading } = useCurrencyConverter(); // 2. Use the hook

  const foodBudget = budgetGoals.find(b => b.category === 'Food');
  
  // 3. Convert each expense to the base currency before summing them up
  const foodSpending = transactions
    .filter(t => t.type === 'expense' && t.category === 'Food')
    .reduce((sum, t) => sum + convertAmount(t.amount, t.currency), 0);

  const goalAmount = foodBudget ? foodBudget.goal : 500;
  const progressPercentage = (foodSpending / goalAmount) * 100;
  const progressBarWidth = Math.min(progressPercentage, 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Budget Progress</h3>
      
      {isLoading ? (
        <div className="text-sm text-gray-500">Calculating budget...</div>
      ) : (
        <div>
          <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
            <span>Food</span>
            <span>Goal: {goalAmount.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${progressBarWidth}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{foodSpending.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</span>
            <a href="/budgets" className="text-blue-600 hover:underline">Enlarge Insight</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetProgress;