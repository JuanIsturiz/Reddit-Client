import { createSlice } from "@reduxjs/toolkit";
import { SUB_REDDITS } from "../../utilities/subReddits";
const initialState = {
  selected: "",
  reddits: SUB_REDDITS.map(({ reddit }) => reddit),
};

const subRedditsSlice = createSlice({
  initialState,
  name: "subreddits",
  reducers: {
    selectReddit: (state, action) => {
      if (state.selected === action.payload) return;
      state.selected = action.payload;
    },
  },
});

export const selectSelected = (state) => state.subreddits.selected;
export const { selectReddit } = subRedditsSlice.actions;
export default subRedditsSlice.reducer;
