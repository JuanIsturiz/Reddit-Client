import Post from "./Post/Post";
import { useSelector } from "react-redux";
import {
  selectNoResults,
  selectIndexedPosts,
  selectHasError,
} from "./PostsSlice";
import "./Posts.css";
import { useState } from "react";
import NoResults from "../NoResults/NoResults";
import HasError from "../HasError/HasError";

const Posts = ({ posts }) => {
  const noResults = useSelector(selectNoResults);
  const indexedPosts = useSelector(selectIndexedPosts);
  const hasError = useSelector(selectHasError);
  const postKeys = Object.keys(posts);
  const [selectedComment, setSelectedComment] = useState("");

  const handleSelectedComment = (id) => {
    setSelectedComment(id);
  };

  return (
    <>
      {hasError && <HasError />}
      {!hasError && noResults && <NoResults />}
      {!hasError && !noResults && postKeys.length > 0 && (
        <div className="Posts">
          {postKeys.map((post, idx) => (
            <Post
              key={idx}
              post={indexedPosts[post]}
              onSelect={handleSelectedComment}
              selectedComment={selectedComment}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
