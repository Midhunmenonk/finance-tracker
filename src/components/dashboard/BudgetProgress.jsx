// src/components/dashboard/BudgetProgress.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const SLIDE_INTERVAL = 3000; // 3 seconds

const BudgetProgress = () => {
  const { goals: budgetGoals } = useSelector(state => state.budgets);
  const transactions = useSelector(state => state.transactions.items);
  const { baseCurrency, convertAmount, isLoading } = useCurrencyConverter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + budgetGoals.length) % budgetGoals.length);
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % budgetGoals.length);
  };

  useEffect(() => {
    if (budgetGoals.length <= 1) return;
    const timer = setInterval(() => handleNext(), SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [currentIndex, budgetGoals.length]);

  if (budgetGoals.length === 0) {
    // ... (no change to this part)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">Budget Progress</h3>
        <span className="text-sm font-semibold text-gray-500">
          {currentIndex + 1} / {budgetGoals.length}
        </span>
      </div>
      
      {isLoading ? (
        <div className="text-sm text-gray-500">Calculating budget...</div>
      ) : (
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button onClick={handlePrevious} className="p-2 rounded-full hover:bg-gray-100">
            <FiChevronLeft size={20} className="text-gray-600" />
          </button>

          {/* 1. Viewport: Hides the other slides */}
          <div className="flex-1 overflow-hidden">
            {/* 2. Slider: Moves horizontally */}
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {/* 3. Render all budget goals inside the slider */}
              {budgetGoals.map(goal => {
                const spending = transactions
                  .filter(t => t.type === 'expense' && t.category === goal.category)
                  .reduce((sum, t) => sum + convertAmount(t.amount, t.currency), 0);
                
                const progressPercentage = goal.goal > 0 ? (spending / goal.goal) * 100 : 0;
                const progressBarWidth = Math.min(progressPercentage, 100);
                const isOverBudget = progressPercentage > 100;
                let progressBarColor = 'bg-green-500';
                if (progressPercentage > 75) progressBarColor = 'bg-yellow-500';
                if (isOverBudget) progressBarColor = 'bg-red-500';

                return (
                  // 4. Each item takes up the full width of the viewport
                  <div key={goal.category} className="w-full flex-shrink-0">
                    <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                      <span className="font-bold">{goal.category}</span>
                      <span>Goal: {goal.goal.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${progressBarColor} h-2 rounded-full`} style={{ width: `${progressBarWidth}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{spending.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })}</span>
                      {isOverBudget ? (
                        <span className="font-semibold text-red-600">Over budget!</span>
                      ) : (
                        <a href="/budgets" className="text-blue-600 hover:underline">Enlarge Insight</a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-100">
            <FiChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetProgress;