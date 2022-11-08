import { useSelector } from "react-redux";
import { selectPalettes, selectTheme } from "../../AppSlice";
import "./HasError.css";

const HasError = () => {
  const theme = useSelector(selectTheme);
  const palettes = useSelector(selectPalettes);

  return (
    <div className="error" style={palettes[theme]}>
      <h2>Unable to get posts from server</h2>
      <i className="fa-regular fa-face-frown"></i>
    </div>
  );
};

export default HasError;
