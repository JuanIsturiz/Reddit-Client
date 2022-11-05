import moment from "moment/moment";
import { useSelector } from "react-redux";
import { selectPalettes, selectTheme } from "../../../../AppSlice";
import "./Comments.css";

const Comments = ({ comments }) => {
  const theme = useSelector(selectTheme);
  const palettes = useSelector(selectPalettes);

  const handleHoverEnter = (e) => {
    e.target.style.boxShadow = palettes[theme].boxShadow;
  };
  const handleHoverLeave = (e) => {
    e.target.style.boxShadow = "";
  };

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
