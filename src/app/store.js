import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../AppSlice";
import subRedditsReducer from "../Components/SubReddits/SubRedditsSlice";
import searchBarReducer from "../Components/Header/SearchBar/SearchBarSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subRedditsReducer,
    searchbar: searchBarReducer,
  },
});
