import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, description: 'Salary', amount: 5000, type: 'income', category: 'Salary', date: '2025-10-01', currency: 'USD' },
    { id: 2, description: 'Rent', amount: 1250, type: 'expense', category: 'Housing', date: '2025-10-01', currency: 'USD' },
    { id: 3, description: 'Groceries', amount: 300, type: 'expense', category: 'Food', date: '2025-10-02', currency: 'USD' },
  ],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      // Ensure new transactions always have an ID
      state.items.push({ id: nanoid(), ...action.payload });
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateTransaction: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addTransaction, deleteTransaction, updateTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;