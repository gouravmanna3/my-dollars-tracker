import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "incomes",
  initialState: {
    loading: false,
    incomes: [],
    error: "",
  },
  reducers: {
    fetchIncomeRequest: (state) => {
      state.loading = true;
    },
    fetchIncomeSuccess: (state, action) => {
      state.loading = false;
      state.incomes = action.payload;
      state.error = "";
    },
    fetchIncomeFailure: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    },

    //create
    createIncomeRequest: (state) => {
      state.loading = true;
    },
    createIncomeSuccess: (state, action) => {
      state.loading = false;
      state.incomes.push(action.payload);
      state.error = "";
    },
    createIncomeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete
    deleteIncomeRequest: (state) => {
      state.loading = true;
    },
    deleteIncomeSuccess: (state, action) => {
      state.loading = false;
      state.incomes = state.incomes.filter(
        (income) => income.id !== action.payload
      );
      state.error = "";
    },
    deleteIncomeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchIncomeRequest,
  fetchIncomeSuccess,
  fetchIncomeFailure,
  createIncomeRequest,
  createIncomeSuccess,
  createIncomeFailure,
  deleteIncomeRequest,
  deleteIncomeSuccess,
  deleteIncomeFailure,
} = incomeSlice.actions;

export default incomeSlice.reducer;
