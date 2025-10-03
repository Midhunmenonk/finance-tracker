// src/pages/TransactionsPage.jsx
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction, updateTransaction } from '../features/transactions/transactionsSlice'; // <-- Import update action
import { useCurrencyConverter } from '../hooks/useCurrencyConverter'; // 1. Import the hook
import { FiPlus, FiEdit2, FiTrash2, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import AddTransactionForm from '../components/dashboard/AddTransactionForm';

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const { items: transactions = [] } = useSelector(state => state.transactions) || {};
  const { baseCurrency, convertAmount, isLoading } = useCurrencyConverter(); // 2. Use the hook

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const searchMatch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = filterType === 'all' || t.type === filterType;
      const categoryMatch = filterCategory === 'all' || t.category === filterType;
      return searchMatch && typeMatch && categoryMatch;
    });
  }, [transactions, searchTerm, filterType, filterType, filterCategory]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  const categories = useMemo(() => ['all', ...new Set(transactions.map(t => t.category))], [transactions]);

  const [modalContent, setModalContent] = useState(null);

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setModalContent(
      <AddTransactionForm
        initialData={transaction}
        closeModal={closeModal}
        onSubmit={handleEditSubmit}
      />
    );
    setIsModalOpen(true);
  };

  const handleEditSubmit = (updatedData) => {
    dispatch(updateTransaction({ ...editingTransaction, ...updatedData }));
    closeModal();
    setEditingTransaction(null);
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setModalContent(
      <AddTransactionForm
        closeModal={closeModal}
        onSubmit={null}
      />
    );
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen relative">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Detailed Transactions</h1>
      <p className="text-gray-500 mb-6 md:mb-8">View, filter, and manage all your financial records.</p>
      
      {/* --- Filter controls (No changes here) --- */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg shadow-md">
        <input 
          type="text"
          placeholder="Search descriptions..."
          className="sm:col-span-2 lg:col-span-2 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="p-2 border border-gray-300 rounded-md"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select 
          className="p-2 border border-gray-300 rounded-md"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
        </select>
      </div>

      {/* --- Responsive Transactions List --- */}
      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {isLoading ? <p className="text-center text-gray-500">Loading rates...</p> : filteredTransactions.map(t => {
          const isIncome = t.type === 'income';
          const displayCurrency = t.currency || baseCurrency;
          const convertedValue = convertAmount(t.amount, displayCurrency);
          const showConverted = displayCurrency !== baseCurrency;

          return (
            <div key={t.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isIncome ? <FiTrendingUp /> : <FiTrendingDown />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{t.description}</p>
                    <p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
                  </div>
                </div>
                {/* 3. Amount display updated for mobile */}
                <span className={`font-bold text-lg text-right ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                  {t.amount.toLocaleString('en-US', { style: 'currency', currency: displayCurrency })}
                </span>
              </div>
              {showConverted && (
                <p className="text-xs text-gray-500 text-right -mt-2 mb-2">
                  (≈ {convertedValue.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })})
                </p>
              )}
              <div className="flex justify-between items-center mt-4 pt-2 border-t">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isIncome ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {t.category}
                </span>
                <div>
                  <button className="text-gray-400 hover:text-indigo-600 p-2" onClick={() => openEditModal(t)}><FiEdit2 /></button>
                  <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-600 p-2"><FiTrash2 /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-4 font-semibold">Description</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Loading rates...</td></tr>
            ) : filteredTransactions.map(t => {
              const isIncome = t.type === 'income';
              const displayCurrency = t.currency || baseCurrency;
              const convertedValue = convertAmount(t.amount, displayCurrency);
              const showConverted = displayCurrency !== baseCurrency;

              return (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                   <td className="p-4 flex items-center">
                    <div className={`p-2 rounded-full mr-4 ${isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {isIncome ? <FiTrendingUp /> : <FiTrendingDown />}
                    </div>
                    <span className="font-medium text-gray-800">{t.description}</span>
                  </td>
                  {/* 4. Amount display updated for desktop */}
                  <td className="p-4 font-mono">
                    <div className={`font-semibold ${isIncome ? 'text-green-700' : 'text-red-700'}`}>
                      {t.amount.toLocaleString('en-US', { style: 'currency', currency: displayCurrency })}
                    </div>
                    {showConverted && (
                      <div className="text-xs text-gray-500">
                        (≈ {convertedValue.toLocaleString('en-US', { style: 'currency', currency: baseCurrency })})
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isIncome ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {isIncome ? '+Income' : '-Expense'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{new Date(t.date).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button className="text-gray-400 hover:text-indigo-600 p-2" onClick={() => openEditModal(t)}><FiEdit2 /></button>
                    <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-600 p-2"><FiTrash2 /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- Modal and Floating Button (No changes here) --- */}
      <button 
        onClick={openAddModal}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform duration-200 hover:scale-110"
      >
        <FiPlus size={24} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingTransaction ? 'Edit Transaction' : 'Add a New Transaction'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            <div className="p-6">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;