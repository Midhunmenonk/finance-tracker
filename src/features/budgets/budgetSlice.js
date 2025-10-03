// src/features/budgets/budgetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goals: [
    { category: 'Food', goal: 500 },
    { category: 'Housing', goal: 1250 },
    { category: 'Transportation', goal: 150 },
  ],
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    setBudgetGoal: (state, action) => {
      const { category, goal } = action.payload;
      const existingGoal = state.goals.find(g => g.category === category);
      if (existingGoal) {
        existingGoal.goal = goal;
      } else {
        state.goals.push({ category, goal });
      }
    },
    // ✅ ADD THIS NEW REDUCER
    deleteBudgetGoal: (state, action) => {
      // The payload will be the category name to delete
      state.goals = state.goals.filter(goal => goal.category !== action.payload);
    },
  },
});

// ✅ EXPORT THE NEW ACTION
export const { setBudgetGoal, deleteBudgetGoal } = budgetSlice.actions;
export default budgetSlice.reducer;