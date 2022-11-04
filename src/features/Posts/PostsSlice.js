import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  indexedPosts: {},
  subReddit: "popular",
  filteredPosts: {},
  searchParam: "",
  noResults: false,
  isLoading: false,
  hasError: false,
  isLoadingComment: false,
  hasErrorComment: false,
};

export const loadIndexedPosts = createAsyncThunk(
  "posts/loadPosts",
  async (sub) => {
    const res = await fetch(`https://www.reddit.com/r/${sub}.json`);
    const {
      data: { children },
    } = await res.json();
    const destructured = children.map((child) => {
      const { data } = child;
      const {
        score,
        title,
        id,
        url_overridden_by_dest: url,
        author,
        num_comments: commentsNum,
        created,
        subreddit,
      } = data;
      return {
        score,
        title,
        id,
        url_overridden_by_dest: url,
        author,
        num_comments: commentsNum,
        created,
        subreddit,
        comments: [],
      };
    });

    const indexed = destructured.reduce(
      (acc, el) => ({ [el.id]: el, ...acc }),
      {}
    );
    return indexed;
  }
);
export const loadAsyncComments = createAsyncThunk(
  "posts/loadAsyncComments",
  async ({ sub, id }) => {
    const res = await fetch(
      `https://www.reddit.com/r/${sub}/comments/${id}.json`
    );
    const jsonRes = await res.json();
    const comments =
      jsonRes[1].data.children.length > 25
        ? jsonRes[1].data.children.slice(0, 25).map((comment) => {
            const { data } = comment;
            const { author, body, created } = data;
            return { author, body, created };
          })
        : jsonRes[1].data.children.map((comment) => {
            const { data } = comment;
            const { author, body, created } = data;
            return { author, body, created };
          });
    return { id: id, comments: comments };
  }
);

export const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    setSubReddit: (state, action) => {
      state.subReddit = action.payload;
    },
    filterPosts: (state, action) => {
      if (action.payload === "reset") {
        state.filteredPosts = {};
        state.noResults = false;
        return;
      }

      if (
        !Object.keys(current(state.indexedPosts)).some((key) =>
          current(state.indexedPosts)
            [key].title.toLowerCase()
            .includes(state.searchParam.toLowerCase())
        )
      ) {
        state.noResults = true;
        return;
      }

      let newPosts = {};

      for (const obj in current(state.indexedPosts)) {
        if (
          current(state.indexedPosts)
            [obj].title.toLowerCase()
            .includes(state.searchParam.toLowerCase())
        ) {
          newPosts = {
            ...newPosts,
            [current(state.indexedPosts)[obj].id]: current(state.indexedPosts)[
              obj
            ],
          };
        }
      }
      state.filteredPosts = newPosts;
    },
    updateSearchParam: (state, action) => {
      state.searchParam = action.payload;
    },
    resetNoResults: (state) => {
      state.noResults = false;
    },
  },
  extraReducers: {
    [loadIndexedPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadIndexedPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.indexedPosts = { ...action.payload };
    },
    [loadIndexedPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadAsyncComments.pending]: (state, action) => {
      state.isLoadingComment = true;
      state.hasErrorComment = false;
    },
    [loadAsyncComments.fulfilled]: (state, action) => {
      state.isLoadingComment = false;
      state.hasErrorComment = false;

      if (current(state.indexedPosts)[action.payload.id].comments.length > 0) {
        state.indexedPosts = {
          ...current(state.indexedPosts),
          [action.payload.id]: {
            ...current(state.indexedPosts)[action.payload.id],
            comments: [],
          },
        };
        return;
      }

      state.indexedPosts = {
        ...current(state.indexedPosts),
        [action.payload.id]: {
          ...current(state.indexedPosts)[action.payload.id],
          comments: [...action.payload.comments],
        },
      };
    },
    [loadAsyncComments.rejected]: (state, action) => {
      state.isLoadingComment = false;
      state.hasErrorComment = true;
    },
  },
});

export const selectAsyncPosts = ({ posts }) => posts.asyncPosts;
export const selectIndexedPosts = ({ posts }) => posts.indexedPosts;
export const selectIsLoading = ({ posts }) => posts.isLoading;
export const selectIsLoadingComment = ({ posts }) => posts.isLoadingComment;
export const selectSubReddit = ({ posts }) => posts.subReddit;
export const selectFilteredPosts = ({ posts }) => posts.filteredPosts;
export const selectSearchParam = ({ posts }) => posts.searchParam;
export const selectNoResults = ({ posts }) => posts.noResults;
export const { setSubReddit, filterPosts, updateSearchParam, resetNoResults } =
  postsSlice.actions;

export default postsSlice.reducer;
