import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCurrencyConverter } from '../hooks/useCurrencyConverter';
import AddBudgetForm from '../components/budgets/AddBudgetForm';
import { deleteBudgetGoal } from '../features/budgets/budgetSlice';
import { FiPlus, FiHome, FiShoppingCart, FiFilm, FiTruck, FiTrash2 } from 'react-icons/fi';

const categoryIcons = {
  Food: <FiShoppingCart />,
  Housing: <FiHome />,
  Transportation: <FiTruck />,
  Entertainment: <FiFilm />,
  Default: <span className="p-3 bg-gray-200 rounded-lg"></span>
};

const BudgetPage = () => {
  const dispatch = useDispatch();
  const { goals } = useSelector(state => state.budgets);
  const { items: transactions = [] } = useSelector(state => state.transactions) || {};
  const { baseCurrency, convertAmount, isLoading } = useCurrencyConverter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date();
  const totalDaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysRemaining = totalDaysInMonth - today.getDate();

  const handleDelete = (category) => {
    if (window.confirm(`Are you sure you want to delete the budget for "${category}"?`)) {
      dispatch(deleteBudgetGoal(category));
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Monthly Budget Goals</h1>
      
      <div className="mt-8 space-y-4 max-w-4xl mx-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading currency rates...</p>
        ) : (
          goals.map(goal => {
            const spending = transactions
              .filter(t => t.type === 'expense' && t.category === goal.category)
              .reduce((sum, t) => sum + convertAmount(t.amount, t.currency), 0);
            
            const remaining = goal.goal - spending;
            const progress = goal.goal > 0 ? (spending / goal.goal) * 100 : 0;
            const dailyAverage = remaining > 0 && daysRemaining > 0 ? remaining / daysRemaining : 0;
            
            let status = { text: 'On Track', color: 'bg-green-100 text-green-800' };
            let progressBarColor = 'bg-green-500';

            if (progress >= 75 && progress <= 100) {
              status = { text: 'Nearing Limit', color: 'bg-yellow-100 text-yellow-800' };
              progressBarColor = 'bg-yellow-500';
            } else if (progress > 100) {
              status = { text: 'Exceeded', color: 'bg-red-100 text-red-800' };
              progressBarColor = 'bg-red-500';
            }

            return (
              <div key={goal.category} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl text-gray-500 p-2 bg-gray-100 rounded-lg">
                      {categoryIcons[goal.category] || categoryIcons.Default}
                    </div>
                    <span className="font-bold text-lg text-gray-800">{goal.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                      {status.text}
                    </span>
                    <button
                      onClick={() => handleDelete(goal.category)}
                      className="text-gray-400 hover:text-red-600 p-1 rounded-full"
                      aria-label={`Delete ${goal.category} budget`}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className={`${progressBarColor} h-2.5 rounded-full`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Spent: {spending.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</span>
                    <span className="font-semibold">Goal: {goal.goal.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</span>
                  </div>
                </div>

                <div className="border-t pt-4 flex justify-around text-center">
                  {remaining >= 0 ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Remaining</p>
                        <p className="font-bold text-green-600">{remaining.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Daily Average</p>
                        <p className="font-bold text-gray-700">{dailyAverage.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}/day</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500">Overspent By</p>
                      <p className="font-bold text-red-600">{Math.abs(remaining).toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-200 hover:scale-110"
        aria-label="Add new budget goal"
      >
        <FiPlus size={24} />
      </button>

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