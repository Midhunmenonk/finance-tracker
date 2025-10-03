import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  baseCurrency: 'USD',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
});

export const { setBaseCurrency } = settingsSlice.actions;
export default settingsSlice.reducer;