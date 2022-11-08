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
