// src/pages/BudgetPage.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';
import AddBudgetForm from '../components/budgets/AddBudgetForm';
import { FiPlus, FiHome, FiShoppingCart, FiFilm, FiTruck } from 'react-icons/fi';

const categoryIcons = {
  Food: <FiShoppingCart />,
  Housing: <FiHome />,
  Transportation: <FiTruck />,
  Entertainment: <FiFilm />,
  Default: <span className="p-3 bg-gray-200 rounded-lg"></span>
};

const BudgetPage = () => {
  const { goals } = useSelector(state => state.budgets);
  const { items: transactions = [] } = useSelector(state => state.transactions) || {};
  const { baseCurrency, convertAmount, isLoading } = useCurrencyConverter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Monthly Budget Goals</h1>
      
      {/* This is the section that displays the list of goals */}
      <div className="mt-8 space-y-4 max-w-4xl mx-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading currency rates...</p>
        ) : (
          // ✅ THIS LOGIC WAS MISSING AND HAS BEEN ADDED BACK
          goals.map(goal => {
            const spending = transactions
              .filter(t => t.type === 'expense' && t.category === goal.category)
              .reduce((sum, t) => sum + convertAmount(t.amount, t.currency), 0);
            
            const progress = goal.goal > 0 ? (spending / goal.goal) * 100 : 0;
            const progressBarWidth = Math.min(progress, 100);
            const isOverBudget = progress > 100;

            let progressBarColor = 'bg-green-500';
            if (progress > 75) progressBarColor = 'bg-yellow-500';
            if (isOverBudget) progressBarColor = 'bg-red-500';

            return (
              <div key={goal.category} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 self-start sm:self-center">
                    <div className="text-2xl text-gray-500 p-2 bg-gray-100 rounded-lg">
                      {categoryIcons[goal.category] || categoryIcons.Default}
                    </div>
                    <span className="font-bold text-lg">{goal.category}</span>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{spending.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</span>
                      <span className="font-semibold">Goal: {goal.goal.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`${progressBarColor} h-2.5 rounded-full`} style={{ width: `${progressBarWidth}%` }}></div>
                    </div>
                    {isOverBudget && <p className="text-xs text-red-600 text-right mt-1">You are over budget!</p>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-200 hover:scale-110"
        aria-label="Add new budget goal"
      >
        <FiPlus size={24} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Set Budget Goal</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            <div className="p-6">
              <AddBudgetForm onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPage;