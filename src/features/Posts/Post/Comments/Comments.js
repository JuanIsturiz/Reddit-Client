import moment from "moment/moment";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectPalettes, selectTheme } from "../../../../AppSlice";
import "./Comments.css";

const Comments = ({ comments }) => {
  const theme = useSelector(selectTheme);
  const palettes = useSelector(selectPalettes);

  const handleHoverEnter = useCallback(
    (e) => {
      e.target.style.boxShadow = palettes[theme].boxShadow;
    },
    [palettes, theme]
  );
  const handleHoverLeave = useCallback((e) => {
    e.target.style.boxShadow = "";
  }, []);

  return (
    <div className="comments-list">
      {comments.map((comment, idx) => (
        <div
          key={idx}
          className="comment"
          style={{
            backgroundColor: theme === "light" ? "#f9f9f9" : "#3a3a3a",
            color: palettes[theme].color,
          }}
          onMouseEnter={handleHoverEnter}
          onMouseLeave={handleHoverLeave}
        >
          <div className="upper-comment">
            <span>{comment.author}</span>
            <span>{moment.unix(comment.created).fromNow()}</span>
          </div>
          <div className="lower-comment">
            <p>{comment.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
