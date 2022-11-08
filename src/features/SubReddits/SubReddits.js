import "./SubReddits.css";
import { SUB_REDDITS } from "../../utilities/subReddits";
import { useDispatch, useSelector } from "react-redux";
import { selectReddit } from "./SubRedditsSlice";
import { selectSelected } from "./SubRedditsSlice";
import {
  setSubReddit,
  filterPosts,
  resetNoResults,
  updateSearchParam,
} from "../../features/Posts/PostsSlice";
import { useState, useEffect, useCallback } from "react";
import { selectPalettes, selectTheme } from "../../AppSlice";

const SubReddits = () => {
  const [drop, setDrop] = useState(false);
  const dispatch = useDispatch();
  const selected = useSelector(selectSelected);
  const theme = useSelector(selectTheme);
  const palettes = useSelector(selectPalettes);
  useEffect(() => {
    setTimeout(() => {
      setDrop(true);
    }, 1000);
  }, []);

  const handleClick = (e) => {
    if (e.target.id === selected) return;
    dispatch(filterPosts("reset"));
    dispatch(setSubReddit(e.target.id.toLowerCase()));
    dispatch(resetNoResults());
    dispatch(selectReddit(e.target.id));
    dispatch(updateSearchParam(""));
  };

  const handleHoverEnter = useCallback(
    (e) => {
      e.target.style.backgroundColor =
        e.target.id !== selected
          ? palettes[theme].hover
          : "rgba(0, 38, 255, 0.2)";
    },
    [palettes, theme, selected]
  );
  const handleHoverLeave = useCallback((e) => {
    e.target.style.backgroundColor = "";
  }, []);
  return (
    <aside>
      <div className="SubReddits" style={palettes[theme]}>
        <h2>Subreddits</h2>
        <ul className="sub-list" style={{ display: !drop ? "none" : "block" }}>
          {SUB_REDDITS.map((sub, idx) => (
            <li
              key={`${idx}_${sub.reddit.toLowerCase()}`}
              className={`sub ${selected === sub.reddit ? "selected" : ""}`}
              id={sub.reddit}
              onClick={handleClick}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <img
                src={sub.src}
                alt={sub.reddit.toLowerCase()}
                style={{
                  borderColor: selected === sub.reddit ? "#3d5af1" : "",
                }}
              />
              <p style={{ color: palettes[theme].soft }}>{sub.reddit}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SubReddits;
