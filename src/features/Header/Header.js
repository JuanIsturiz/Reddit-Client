import SearchBar from "./SearchBar/SearchBar";
import "./Header.css";
import {
  filterPosts,
  resetNoResults,
  setSubReddit,
  updateSearchParam,
} from "../../features/Posts/PostsSlice";
import { selectReddit } from "../SubReddits/SubRedditsSlice";
import { useDispatch, useSelector } from "react-redux";
import Switch from "./Switch/Switch";
import { selectPalettes, selectTheme } from "../../AppSlice";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const palettes = useSelector(selectPalettes);

  const handleLogoClick = () => {
    dispatch(setSubReddit("popular"));
    dispatch(filterPosts("reset"));
    dispatch(selectReddit(""));
    dispatch(resetNoResults());
    dispatch(updateSearchParam(""));
  };
  return (
    <header>
      <div className="Header" style={palettes[theme]}>
        <div className="logo-title" onClick={handleLogoClick}>
          <i className="fa-brands fa-reddit"></i>
          <div className="spans">
            <span>Reddit</span>
            <span>Minimal</span>
          </div>
        </div>
        <SearchBar />
        <Switch />
      </div>
    </header>
  );
};

export default Header;
