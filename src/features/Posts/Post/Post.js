import { useState, useEffect, useCallback } from "react";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAsyncComments,
  resetCommentsError,
  selectHasErrorComment,
  selectIsLoadingComment,
  selectSubReddit,
} from "../PostsSlice";
import { icons } from "../../../utilities/icons";
import "./Post.css";
import Comments from "./Comments/Comments";
import LoadingComments from "../../LoadingComments/LoadingComments";
import { selectPalettes, selectTheme } from "../../../AppSlice";
import HasErrorComment from "../../HasErrorComment/HasErrorComment";

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
  const theme = useSelector(selectTheme);
  const palettes = useSelector(selectPalettes);
  const hasErrorComment = useSelector(selectHasErrorComment);

  useEffect(() => {
    if (hasErrorComment) {
      setTimeout(() => {
        dispatch(resetCommentsError());
      }, 3000);
    }
  }, [hasErrorComment, dispatch]);

  const handleArrowClick = useCallback(
    ({ target }) =>
      setScoreIcon((prev) => (prev === target.id ? "default" : target.id)),
    []
  );

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

  const handleHoverEnter = useCallback(
    (e) => {
      e.target.style.backgroundColor = palettes[theme].hover;
    },
    [theme, palettes]
  );
  const handleHoverLeave = useCallback((e) => {
    e.target.style.backgroundColor = "";
  }, []);

  return (
    <article>
      <div className="Post" style={palettes[theme]}>
        <div className="score">
          <svg
            style={{
              stroke: scoreIcon === "up" ? "#3d5af1" : palettes[theme].soft,
              fill: scoreIcon === "up" ? "#3d5af1" : palettes[theme].soft,
            }}
            id="up"
            onClick={handleArrowClick}
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
          >
            <path
              d={icons.arrowUp[scoreIcon !== "up" ? "unselected" : "selected"]}
              style={{
                color: scoreIcon === "up" ? "#3d5af1" : palettes[theme].soft,
              }}
            ></path>
          </svg>
          <span
            style={{
              color:
                scoreIcon === "default"
                  ? palettes[theme].soft
                  : scoreIcon === "up"
                  ? "#3d5af1"
                  : "#ff304f",
            }}
          >
            {score >= 1000 ? `${(score / 1000).toFixed(1)}k` : score}
          </span>
          <svg
            style={{
              stroke: scoreIcon === "down" ? "#ff304f" : palettes[theme].soft,
              fill: scoreIcon === "down" ? "#ff304f" : palettes[theme].soft,
            }}
            id="down"
            onClick={handleArrowClick}
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
          >
            <path
              d={
                icons.arrowDown[
                  scoreIcon !== "down" ? "unselected" : "selected"
                ]
              }
              style={{
                color: scoreIcon === "down" ? "#ff304f" : palettes[theme].soft,
              }}
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
              <span style={{ color: palettes[theme].soft }}>
                {moment.unix(created).fromNow()}
              </span>
              <div className="comments">
                <svg
                  style={icons.style}
                  onClick={handleComments}
                  onMouseEnter={handleHoverEnter}
                  onMouseLeave={handleHoverLeave}
                >
                  <path
                    d={icons.comment}
                    style={{
                      fill:
                        comments.length > 0 ? "#3d5af1" : palettes[theme].soft,
                    }}
                  ></path>
                </svg>
                <span style={{ color: palettes[theme].soft }}>
                  {commentsNum >= 1000
                    ? `${(commentsNum / 1000).toFixed(1)}k`
                    : commentsNum}
                </span>
              </div>
            </div>
          </div>
          {showComments && isLoadingComment && selectedComment === id && (
            <LoadingComments />
          )}
          {hasErrorComment && selectedComment === id && <HasErrorComment />}
          {showComments && comments.length > 0 && (
            <Comments comments={comments} />
          )}
        </div>
      </div>
    </article>
  );
};

export default Post;
