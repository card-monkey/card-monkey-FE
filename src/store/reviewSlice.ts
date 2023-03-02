/**review(이모저모)기능에 사용했지만 기능 구현이 어려워져서 사용하지 않음. */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import getTokenApi from "../api/monkeyGetToken";

const initialState: State = {
  id: 0,
  message: [],
  status: "idle",
};

export const fetchReviewList = createAsyncThunk(
  "review/fetchReviewList",
  async (id: number) => {
    const data = await getTokenApi.getReview(id);
    return data;
  },
);

export const fetchReview = createAsyncThunk(
  "review/fetchReview",
  async ({ id, selectedReview }: Argument) => {
    return await getTokenApi.selectReview(id, selectedReview);
  },
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    selectReview(state, action: PayloadAction<string>) {
      if (state.message.includes(action.payload)) {
        state.message = state.message.filter((item) => item != action.payload);
      } else {
        state.message = state.message;
      }
      let content = action.payload;
      state.message = [...state.message, content];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviewList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchReviewList.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.status = "idle";
        state.message = state.message.concat(action.payload);
      },
    );
    builder.addCase(fetchReviewList.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { selectReview } = reviewSlice.actions;

export default reviewSlice.reducer;
