/* 
  //TODO add date
  //TODO clean logPosts and loadComments
  //TODO refactor posts to an object
  //TODO fix comments hide action
  //TODO refactor slice
  TODO make it responsive [display none on max width]
*/

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Components/Header/Header";
import Posts from "./Components/Posts/Posts";
import SubReddits from "./Components/SubReddits/SubReddits";
import {
  loadIndexedPosts,
  selectIndexedPosts,
  selectIsLoading,
  selectSubReddit,
} from "./AppSlice";
import { selectFilteredPosts } from "./AppSlice";
import LoadingPosts from "./Components/LoadingPosts/LoadingPosts";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const sub = useSelector(selectSubReddit);
  const isLoading = useSelector(selectIsLoading);
  const indexedPosts = useSelector(selectIndexedPosts);
  const filteredPosts = useSelector(selectFilteredPosts);

  useEffect(() => {
    dispatch(loadIndexedPosts(sub));
  }, [sub, dispatch]);

  return (
    <div className="App">
      <Header />
      <main className="page">
        {isLoading ? (
          <LoadingPosts />
        ) : (
          <Posts
            posts={
              Object.keys(filteredPosts).length < 1
                ? indexedPosts
                : filteredPosts
            }
          />
        )}
        <SubReddits />
      </main>
    </div>
  );
}

export default App;
