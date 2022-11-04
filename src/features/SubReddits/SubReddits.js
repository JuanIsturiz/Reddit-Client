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
import { useState, useEffect } from "react";

const SubReddits = () => {
  const [drop, setDrop] = useState(false);
  const dispatch = useDispatch();
  const selected = useSelector(selectSelected);
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
  return (
    <div className="SubReddits" style={{ height: !drop ? "6rem" : "auto" }}>
      <h2>Subreddits</h2>
      <ul className="sub-list">
        {SUB_REDDITS.map((sub, idx) => (
          <li
            key={`${idx}_${sub.reddit.toLowerCase()}`}
            className={`sub ${selected === sub.reddit ? "selected" : ""}`}
            id={sub.reddit}
            onClick={handleClick}
          >
            <img
              src={sub.src}
              alt={sub.reddit.toLowerCase()}
              style={{ borderColor: selected === sub.reddit ? "#3d5af1" : "" }}
            />
            <p>{sub.reddit}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubReddits;
