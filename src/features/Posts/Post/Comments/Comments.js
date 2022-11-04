import moment from "moment/moment";
import "./Comments.css";

const Comments = ({ comments }) => {
  return (
    <div className="comments-list">
      {comments.map((comment, idx) => (
        <div key={idx} className="comment">
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
