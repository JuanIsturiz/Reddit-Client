import { useSelector } from "react-redux";
import { selectPalettes, selectTheme } from "../../AppSlice";
import "./HasErrorComment.css";

const HasErrorComment = () => {
  const theme = useSelector(selectTheme);
  const palettes = useSelector(selectPalettes);
  return (
    <div className="error-comment" style={palettes[theme]}>
      <h2>Unable to get comments from server</h2>
      <i className="fa-regular fa-face-frown"></i>
    </div>
  );
};

export default HasErrorComment;
