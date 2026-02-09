import { createSlice } from "@reduxjs/toolkit";
import { TYPE_TO_STATE_KEY } from "./constants";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trailerVideo: null,
  },
  reducers: {
    addMovies: (state, action) => {
      const { type, movies } = action.payload;

      const stateKey = TYPE_TO_STATE_KEY[type];

      if (stateKey) {
        state[stateKey] = movies;
      }
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const { addMovies, addTrailerVideo } = movieSlice.actions;
export default movieSlice.reducer;
