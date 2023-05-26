import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../core/api";

const initialState = {
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

export const __getTopic = createAsyncThunk("topic/get", async (payload, thunkAPI) => {
  console.log("토픽정보 조회");
  try {
    const { data } = await api.getTopicApi(payload);
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

export const __patchTopicTitle = createAsyncThunk("title/patch", async (payload, thunkAPI) => {
  try {
    const { data } = await api.patchTopicTitleApi(payload.topicId, { title: payload.title });
    return thunkAPI.fulfillWithValue(data.data);
  } catch (error) {
    console.log(error);
  }
});

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateTopic: (state, action) => {
      console.log(action.payload);
      state.titleData.unshift(action?.payload);
    },
    clearTopicData: (state) => {
      state.topicData = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(__getTopics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTopics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.titleData = action.payload;
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
      })
      .addCase(__patchGptKey.rejected, (state, action) => {
        state.isLoading = false;
      })

      // topic 가져오기
      .addCase(__getTopic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topicData = action.payload;
      })
      .addCase(__getTopic.rejected, (state, action) => {
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
      })

      // topic Title
      .addCase(__patchTopicTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__patchTopicTitle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topicTitle = action.payload.title;
      })
      .addCase(__patchTopicTitle.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { updateTopic, clearTopicData } = mainSlice.actions;
export default mainSlice.reducer;
