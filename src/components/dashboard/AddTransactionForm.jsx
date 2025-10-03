// src/components/dashboard/AddTransactionForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../features/transactions/transactionsSlice';
// Assuming you have a list of categories
const categories = ['Food', 'Housing', 'Entertainment', 'Transportation', 'Salary', 'Utilities', 'Other'];
const currencies = ['USD', 'EUR', 'GBP', 'INR']; // Example currencies

const AddTransactionForm = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // Default to expense
  const [category, setCategory] = useState('');
  const [currency, setCurrency] = useState('USD'); // Default currency

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category) {
      alert('Please fill in all fields.');
      return;
    }

    const newTransaction = {
      description,
      amount: parseFloat(amount),
      type,
      category,
      currency,
      date: new Date().toISOString().split('T')[0], // Current date
    };

    dispatch(addTransaction(newTransaction));
    // Clear form
    setDescription('');
    setAmount('');
    setCategory('');
    setCurrency('USD');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 text-gray-800">Add New Transaction</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            id="description"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0.01"
            step="0.01"
          />
        </div>

        {/* Type (Income/Expense Radio) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-green-600"
                name="type"
                value="income"
                checked={type === 'income'}
                onChange={() => setType('income')}
              />
              <span className="ml-2">Income</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-600"
                name="type"
                value="expense"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
              />
              <span className="ml-2">Expense</span>
            </label>
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Currency */}
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            id="currency"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>

        {/* Add Transaction Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;