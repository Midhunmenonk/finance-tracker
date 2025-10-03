// src/features/budgets/budgetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  goals: [
    { category: 'Food', goal: 500 },
    { category: 'Housing', goal: 1250 },
    { category: 'Entertainment', goal: 200 },
    { category: 'Transportation', goal: 150 },
  ],
};

const budgetSlice = createSlice({
  name: 'budgets',
  initialState,
  reducers: {
    // This reducer adds a new goal or updates an existing one
    setBudgetGoal: (state, action) => {
      const { category, goal } = action.payload;
      const existingGoal = state.goals.find(g => g.category === category);
      if (existingGoal) {
        existingGoal.goal = goal; // Update if exists
      } else {
        state.goals.push({ category, goal }); // Add if new
      }
    },
  },
});

export const { setBudgetGoal } = budgetSlice.actions;
export default budgetSlice.reducer;