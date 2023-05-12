import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../core/api";

const initialState = {
  data: [
    {
      completionId: "",
      question: "",
      answer: "",
      topicTitle: "",
      tagNames: [],
      createdAt: "",
      modelName: "",
    },
  ],
  dateData: [],
  tagData: [],

  isLoading: false,
  error: null,
};

export const __getSearch = createAsyncThunk("search/get", async (payload, thunkAPI) => {
  try {
    const { data } = await api.getSearchApi(payload);

    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue();
  }
});

export const __getDailyCompletionCounts = createAsyncThunk("completionCounts/get", async (payload, thunkAPI) => {
  try {
    const { data } = await api.getDailyCompletionCountsApi(payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue();
  }
});

export const __getTag = createAsyncThunk("tag/get", async (_, thunkAPI) => {
  try {
    const { data } = await api.getTagApi();
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue();
  }
});

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(__getSearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getSearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = [...action.payload];
      })
      .addCase(__getSearch.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(__getDailyCompletionCounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getDailyCompletionCounts.fulfilled, (state, action) => {
        state.isLoading = false;

        state.dateData = [action.payload];
      })
      .addCase(__getDailyCompletionCounts.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(__getTag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tagData = [...action.payload];
      })
      .addCase(__getTag.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;
