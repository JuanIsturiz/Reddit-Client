import { useState } from "react";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAsyncComments,
  selectIsLoadingComment,
  selectSubReddit,
} from "../PostsSlice";
import { icons } from "../../../utilities/icons";
import "./Post.css";
import Comments from "./Comments/Comments";
import LoadingComments from "../../LoadingComments/LoadingComments";

const Post = ({ post, onSelect, selectedComment }) => {
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

  const handleArrowClick = ({ target }) =>
    setScoreIcon((prev) => (prev === target.id ? "default" : target.id));

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
        <svg style={icons.style} id="up" onClick={handleArrowClick}>
          <path
            d={
              icons.paths.arrowUp[
                scoreIcon !== "up" ? "unselected" : "selected"
              ]
            }
            style={{ color: scoreIcon === "up" ? "#3d5af1" : "" }}
          ></path>
        </svg>
        <span
          style={{
            color:
              scoreIcon === "default"
                ? ""
                : scoreIcon === "up"
                ? "#3d5af1"
                : "#ff304f",
          }}
        >
          {score >= 1000 ? `${(score / 1000).toFixed(1)}k` : score}
        </span>
        <svg style={icons.style} id="down" onClick={handleArrowClick}>
          <path
            d={
              icons.paths.arrowDown[
                scoreIcon !== "down" ? "unselected" : "selected"
              ]
            }
            style={{ color: scoreIcon === "down" ? "#ff304f" : "" }}
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
                    fill: comments.length > 0 ? "#3d5af1" : "",
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
          {showComments && isLoadingComment && selectedComment === id && (
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
