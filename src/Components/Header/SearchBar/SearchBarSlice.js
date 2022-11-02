import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
};

const searchBarSlice = createSlice({
  initialState,
  name: "searchbar",
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const selectSearchTerm = ({ searchbar }) => searchbar.searchTerm;
export const { updateSearchTerm } = searchBarSlice.actions;

export default searchBarSlice.reducer;
