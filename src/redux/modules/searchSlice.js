import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../core/api";

const initialState = {
  data: [],
  dateData: [],
  tagData: [],
  tokenData: {},
  totalCount: "",
  totalFee: "",

  isLoading: false,
  error: null,
};

export const __getSearch = createAsyncThunk("search/get", async (payload, thunkAPI) => {
  try {
    console.log(payload);
    const { data } = await api.getSearchApi(payload);
    console.log(data);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue();
  }
});

export const __getTokenCounts = createAsyncThunk("tokens/get", async (payload, thunkAPI) => {
  try {
    const { data } = await api.getTokenCountsApi(payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue();
  }
});

export const __getFee = createAsyncThunk("fee/get", async (payload, thunkAPI) => {
  try {
    const { data } = await api.getFeeApi(payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue();
  }
});

export const __getDailyCompletionCounts = createAsyncThunk("completionCounts/get", async (payload, thunkAPI) => {
  try {
    const { data } = await api.getDailyCompletionCountsApi(payload);
    console.log(data.data);
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
        state.data = [...action.payload.data];
        state.totalCount = action.payload.totalCount;
      })
      .addCase(__getSearch.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(__getTokenCounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTokenCounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tokenData = action.payload;
      })
      .addCase(__getTokenCounts.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(__getFee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getFee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalFee = action.payload;
      })
      .addCase(__getFee.rejected, (state, action) => {
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
