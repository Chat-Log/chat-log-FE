import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../core/api";

const initialState = {
  data: [
    {
      modelName: "",
      question: "",
      tagNames: [],
      topicId: "",
      prevCompletionIds: [],
    },
  ],
  dataChunks: [],
  apiKey: "",
  isLoading: false,
  error: null,
  titleData: [],
  topicData: [],
  modelData: [],
};

export const __getTopics = createAsyncThunk("topics/get", async (payload, thunkAPI) => {
  try {
    const { data } = await api.getTopicsApi(payload);
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
  }
});

export const __patchGptKey = createAsyncThunk("gptKey/patch", async (payload, thunkAPI) => {
  try {
    console.log("페이로드입니다:", payload);
    const { data } = await api.patchGptKeyApi(payload);
    console.log(data);
    return thunkAPI.fulfillWithValue();
  } catch (error) {
    console.log(error);
    // return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const __getTopicApi = createAsyncThunk("topic/get", async (payload, thunkAPI) => {
  try {
    const { data } = await api.getTopicApi(payload);
    // console.log(data.data.props);
    return thunkAPI.fulfillWithValue(data.data.props);
  } catch (error) {
    // console.log(error);
  }
});

export const __getModel = createAsyncThunk("model/get", async (_, thunkAPI) => {
  try {
    const { data } = await api.getModelApi();
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
  }
});

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    completionInfo: (state, action) => {
      console.log(action.payload);
      state.data = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(__getTopics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTopics.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload);
        state.titleData = action.payload;
        // state.data = { ...action.payload };
      })
      .addCase(__getTopics.rejected, (state, action) => {
        state.isLoading = false;
      })

      // api key 등록
      .addCase(__patchGptKey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__patchGptKey.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action);
        // state.data = { ...action.payload };
      })
      .addCase(__patchGptKey.rejected, (state, action) => {
        state.isLoading = false;
      })

      // topic 가져오기
      .addCase(__getTopicApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTopicApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topicData = action.payload;
      })
      .addCase(__getTopicApi.rejected, (state, action) => {
        state.isLoading = false;
      })

      // 모델 가졍괴
      .addCase(__getModel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getModel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.modelData = action.payload;
      })
      .addCase(__getModel.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { completionInfo } = mainSlice.actions;
export default mainSlice.reducer;
