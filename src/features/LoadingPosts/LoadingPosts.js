import { useSelector } from "react-redux";
import { selectPalettes, selectTheme } from "../../AppSlice";
import "./LoadingPosts.css";

const LoadingPosts = () => {
  const theme = useSelector(selectTheme);
  const palettes = useSelector(selectPalettes);
  const spinner = (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return (
    <div className="LoadingPosts">
      <div className="wrapper" style={palettes[theme]}>
        {spinner}
      </div>
      <div className="wrapper" style={palettes[theme]}>
        {spinner}
      </div>
      <div className="wrapper" style={palettes[theme]}>
        {spinner}
      </div>
      <div className="wrapper" style={palettes[theme]}>
        {spinner}
      </div>
    </div>
  );
};

export default LoadingPosts;
