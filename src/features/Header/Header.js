import SearchBar from "./SearchBar/SearchBar";
import "./Header.css";
import { setSubReddit } from "../../features/Posts/PostsSlice";
import { selectReddit } from "../SubReddits/SubRedditsSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(selectReddit(""));
    dispatch(setSubReddit("popular"));
  };
  return (
    <header>
      <div className="Header">
        <div className="logo-title" onClick={handleLogoClick}>
          <i className="fa-brands fa-reddit"></i>
          <div className="spans">
            <span>Reddit</span>
            <span>Minimal</span>
          </div>
        </div>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
