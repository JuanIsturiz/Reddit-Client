import { useDispatch, useSelector } from "react-redux";
import { selectSearchTerm } from "../Header/SearchBar/SearchBarSlice";
import { resetNoResults, updateSearchParam } from "../Posts/PostsSlice";
import "./NoResults.css";

const NoResults = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  return (
    <div className="not-found">
      <h2>No Posts matching "{searchTerm}"</h2>
      <button
        onClick={() => {
          dispatch(updateSearchParam(""));
          dispatch(resetNoResults());
        }}
      >
        Go home
      </button>
    </div>
  );
};

export default NoResults;
