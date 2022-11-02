import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPosts,
  selectSearchParam,
  updateSearchParam,
} from "../../../AppSlice";

import { updateSearchTerm } from "./SearchBarSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchParam = useSelector(selectSearchParam);
  const handleChange = (e) => {
    if (e.target.value === "") updateSearchParam("");
    dispatch(updateSearchParam(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchParam === "") {
      dispatch(filterPosts("reset"));
      return;
    }
    dispatch(updateSearchTerm(searchParam));
    dispatch(filterPosts(searchParam.toLowerCase()));
  };

  return (
    <div className="SearchBar">
      <form action="" onSubmit={handleSubmit}>
        <input
          value={searchParam}
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />
        <button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
