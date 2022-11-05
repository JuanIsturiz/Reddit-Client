/* 
  //TODO add date
  //TODO clean logPosts and loadComments
  //TODO refactor posts to an object
  //TODO fix comments hide action
  //TODO refactor slice
  //TODO make commit fixing searchbar no results and changing up arrow color folder restructuring
  //TODO refactor folders
  //TODO make it responsive [display none on max width]
  //TODO add dark mode feature
  TODO add try catch feature to async functions
*/

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./features/Header/Header";
import Posts from "./features/Posts/Posts";
import SubReddits from "./features/SubReddits/SubReddits";
import {
  loadIndexedPosts,
  selectIndexedPosts,
  selectIsLoading,
  selectSubReddit,
} from "./features/Posts/PostsSlice";
import { selectFilteredPosts } from "./features/Posts/PostsSlice";
import LoadingPosts from "./features/LoadingPosts/LoadingPosts";
import "./App.css";
import { selectPalettes, selectTheme } from "./AppSlice";

function App() {
  const dispatch = useDispatch();
  const sub = useSelector(selectSubReddit);
  const isLoading = useSelector(selectIsLoading);
  const indexedPosts = useSelector(selectIndexedPosts);
  const filteredPosts = useSelector(selectFilteredPosts);
  const theme = useSelector(selectTheme);
  const palettes = useSelector(selectPalettes);

  useEffect(() => {
    dispatch(loadIndexedPosts(sub));
  }, [sub, dispatch]);

  return (
    <div
      className="App"
      style={{
        backgroundColor: palettes[theme].backgroundColor,
        color: palettes[theme].color,
      }}
    >
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
