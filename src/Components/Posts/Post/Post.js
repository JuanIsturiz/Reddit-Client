import { useState } from "react";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAsyncComments,
  selectIsLoadingComment,
  selectSubReddit,
} from "../../../AppSlice";
import { icons } from "./icons";
import "./Post.css";
import Comments from "./Comments/Comments";
import LoadingComments from "../../LoadingComments/LoadingComments";

const Post = ({ post, onSelect, selCom }) => {
  const {
    score,
    title,
    id,
    url_overridden_by_dest: url,
    author,
    num_comments: commentsNum,
    created,
    comments,
  } = post;
  const dispatch = useDispatch();
  const [scoreIcon, setScoreIcon] = useState("default");
  const [showComments, setShowComments] = useState(false);
  const subReddit = useSelector(selectSubReddit);
  const isLoadingComment = useSelector(selectIsLoadingComment);
  const handleScoreIcon = ({ target }) => {
    if (target.id === "up") {
      if (target.classList[0] === "default") {
        setScoreIcon("up");
        return;
      }
      setScoreIcon("default");
    }
    if (target.id === "down") {
      if (target.classList[0] === "default") {
        setScoreIcon("down");
        return;
      }
      setScoreIcon("default");
    }
  };

  const handleComments = () => {
    if (comments.length > 0) {
      onSelect(id);
      setShowComments(false);
      dispatch(loadAsyncComments({ sub: subReddit, id: id }));
      return;
    }
    onSelect(id);
    setShowComments(true);
    dispatch(loadAsyncComments({ sub: subReddit, id: id }));
  };

  return (
    <div className="Post">
      <div className="score">
        <svg
          style={icons.style}
          id="up"
          className={scoreIcon !== "up" ? "default" : "up"}
          onClick={handleScoreIcon}
        >
          <path
            d={
              icons.paths.arrowUp[
                scoreIcon !== "up" ? "unselected" : "selected"
              ]
            }
          ></path>
        </svg>
        <span
          style={{
            color:
              scoreIcon === "default"
                ? ""
                : scoreIcon === "up"
                ? "#45b81f"
                : "#ff304f",
          }}
        >
          {score >= 1000 ? `${(score / 1000).toFixed(1)}k` : score}
        </span>
        <svg
          style={icons.style}
          id="down"
          className={scoreIcon !== "down" ? "default" : "down"}
          onClick={handleScoreIcon}
        >
          <path
            d={
              icons.paths.arrowDown[
                scoreIcon !== "down" ? "unselected" : "selected"
              ]
            }
          ></path>
        </svg>
      </div>
      <div className="details">
        <div className="upper">
          <div className="title-image">
            <h3>{title}</h3>
            {post.hasOwnProperty("url_overridden_by_dest") &&
            /.png|.jpg/gm.test(url) ? (
              <img src={url} alt="post" />
            ) : (
              <div className="space"></div>
            )}
          </div>
        </div>
        <div className="line">
          <div className="lower">
            <span>{author}</span>
            <span>{moment.unix(created).fromNow()}</span>
            <div className="comments">
              <svg style={icons.style} onClick={handleComments}>
                <path
                  d={icons.paths.comment}
                  style={{
                    fill: isLoadingComment ? "#ddd" : "",
                  }}
                ></path>
              </svg>
              <span>
                {commentsNum >= 1000
                  ? `${(commentsNum / 1000).toFixed(1)}k`
                  : commentsNum}
              </span>
            </div>
          </div>
          {showComments && isLoadingComment && selCom === id && (
            <LoadingComments />
          )}
          {showComments && comments.length > 0 && (
            <Comments comments={comments} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
