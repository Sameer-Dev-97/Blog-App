import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

// Save to localStorage on every change
store.subscribe(() => {
  try {
    const state = store.getState().posts;
    localStorage.setItem("postsState", JSON.stringify(state));
  } catch (e) {
    console.error("Could not save state", e);
  }
});