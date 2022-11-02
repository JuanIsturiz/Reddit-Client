import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import {
  resetNoResults,
  selectNoResults,
  updateSearchParam,
  selectIndexedPosts,
} from "../../AppSlice";
import "./Posts.css";
import { useState } from "react";
import { selectSearchTerm } from "../Header/SearchBar/SearchBarSlice";

const Posts = ({ posts }) => {
  const dispatch = useDispatch();
  const noResults = useSelector(selectNoResults);
  const searchTerm = useSelector(selectSearchTerm);
  const indexedPosts = useSelector(selectIndexedPosts);
  const postKeys = Object.keys(posts);
  const [selectedComment, setSelectedComment] = useState("");

  const handleSelectedComment = (id) => {
    setSelectedComment(id);
  };

  return (
    <>
      {noResults ? (
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
      ) : (
        <div className="Posts">
          {postKeys.length > 0
            ? postKeys.map((post, idx) => (
                <Post
                  key={idx}
                  post={indexedPosts[post]}
                  onSelect={handleSelectedComment}
                  selCom={selectedComment}
                />
              ))
            : "no posts found"}
        </div>
      )}
    </>
  );
};

export default Posts;
