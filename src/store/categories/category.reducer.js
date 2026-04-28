import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';


export const fetchCategoriesAsync = createAsyncThunk(
    'categories/fetchCategories',
    async (_, thunkAPI) => {
      try {
        const categoriesArray = await getCategoriesAndDocuments('categories');
        return categoriesArray;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCategoriesAsync.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
          state.isLoading = false;
          state.categories = action.payload;
        })
        .addCase(fetchCategoriesAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
  },
})

export const { setCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;