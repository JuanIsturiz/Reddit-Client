import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/Posts/PostsSlice";
import subRedditsReducer from "../features/SubReddits/SubRedditsSlice";
import searchBarReducer from "../features/Header/SearchBar/SearchBarSlice";
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    subreddits: subRedditsReducer,
    searchbar: searchBarReducer,
  },
});
