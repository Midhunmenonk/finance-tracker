// src/components/dashboard/SpendingInsight.jsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FiAlertCircle } from 'react-icons/fi';

const SpendingInsight = () => {
  const transactions = useSelector(state => state.transactions.items);

  const insightMessage = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

    if (totalExpenses === 0) {
      return { title: "Looking Good!", message: "No expenses recorded yet. Keep up the great work!" };
    }

    // Find the category with the highest spending
    const spendingByCategory = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    let highestCategory = '';
    let highestAmount = 0;
    for (const category in spendingByCategory) {
      if (spendingByCategory[category] > highestAmount) {
        highestAmount = spendingByCategory[category];
        highestCategory = category;
      }
    }

    const percentage = ((highestAmount / totalExpenses) * 100).toFixed(0);

    // Rule: If the top category is more than 40% of all spending
    if (percentage > 40) {
      return {
        title: "Spending Insight!",
        message: `Your spending on "${highestCategory}" is quite high, making up ${percentage}% of your total expenses.`
      };
    }

    return { title: "On Track!", message: "Your spending is well-distributed. Keep it up!" };

  }, [transactions]);

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-md flex items-start space-x-3">
      <FiAlertCircle size={24} className="flex-shrink-0 text-yellow-600 mt-0.5" />
      <div>
        <p className="font-semibold">{insightMessage.title}</p>
        <p className="text-sm">{insightMessage.message}</p>
      </div>
    </div>
  );
};

export default SpendingInsight;