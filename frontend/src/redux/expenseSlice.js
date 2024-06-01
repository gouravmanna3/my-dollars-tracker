import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    loading: false,
    expenses: [],
    error: "",
  },
  reducers: {
    fetchExpenseRequest: (state) => {
      state.loading = true;
    },
    fetchExpenseSuccess: (state, action) => {
      state.loading = false;
      state.expenses = action.payload;
      state.error = "";
    },
    fetchExpenseFailure: (state, action) => {
      state.loading = false;
      state.expenses = [];
      state.error = action.payload;
    },

    //create
    createExpenseRequest: (state) => {
      state.loading = true;
    },
    createExpenseSuccess: (state, action) => {
      state.loading = false;
      state.expenses.push(action.payload.data);
      state.error = "";
    },
    createExpenseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete
    deleteExpenseRequest: (state) => {
      state.loading = true;
    },
    deleteExpenseSuccess: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.expenses = state.expenses.filter(
        (expense) => expense["_id"] !== action.payload
      );
      state.error = "";
    },
    deleteExpenseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchExpenseRequest,
  fetchExpenseSuccess,
  fetchExpenseFailure,
  createExpenseRequest,
  createExpenseSuccess,
  createExpenseFailure,
  deleteExpenseRequest,
  deleteExpenseSuccess,
  deleteExpenseFailure,
} = expenseSlice.actions;

export default expenseSlice.reducer;
