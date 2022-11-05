import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  palettes: {
    light: {
      backgroundColor: "#fff",
      color: "#444",
      boxShadow: "0 0.5rem 1.25rem 0.375rem #ddd",
      hover: "#e9e9e9",
      soft: "#717171",
    },
    dark: {
      backgroundColor: "#333",
      color: "#ddd",
      boxShadow: "0 8px 20px 6px #555",
      hover: "#444",
      soft: "#888",
    },
  },
};

export const appSlice = createSlice({
  initialState,
  name: "app",
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
    },
  },
});

export const selectTheme = ({ app }) => app.theme;
export const selectPalettes = ({ app }) => app.palettes;
export const { toggleTheme } = appSlice.actions;

export default appSlice.reducer;
