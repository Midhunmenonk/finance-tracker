// src/components/budgets/AddBudgetForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setBudgetGoal } from '../../features/budgets/budgetSlice';

// ✅ Define a master list of potential expense categories
const expenseCategories = ['Food', 'Housing', 'Entertainment', 'Transportation', 'Utilities', 'Other'];

const AddBudgetForm = ({ onClose }) => {
  const dispatch = useDispatch();
  
  const [category, setCategory] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !goalAmount) {
      alert('Please select a category and enter an amount.');
      return;
    }
    dispatch(setBudgetGoal({ category, goal: parseFloat(goalAmount) }));
    onClose(); // Close the modal after submitting
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select a category</option>
          {/* The dropdown now uses the predefined list */}
          {expenseCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700">
          Monthly Goal Amount
        </label>
        <input
          type="number"
          id="goalAmount"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., 500"
          min="0"
          step="0.01"
          required
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Set Goal
        </button>
      </div>
    </form>
  );
};

export default AddBudgetForm;