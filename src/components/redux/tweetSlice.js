import { createSlice } from "@reduxjs/toolkit";

const tweetSilce = createSlice({
  name: "tweet",
  initialState: {
    tweets: null,
    refresh: false,
    isActive: true,
  },
  reducers: {
    getAllTweets: (state, action) => {
      state.tweets = action.payload;
    },
    getRrfresh: (state) => {
      state.refresh = !state.refresh;
    },

    getIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { getAllTweets, getRrfresh, getIsActive } = tweetSilce.actions;

export default tweetSilce.reducer;
