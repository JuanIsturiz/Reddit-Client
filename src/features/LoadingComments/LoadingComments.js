import { useSelector } from "react-redux";
import { selectPalettes, selectTheme } from "../../AppSlice";
import "./LoadingComments.css";

const LoadingComments = () => {
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
    <div className="LoadingComments">
      <div className="wrapper" style={palettes[theme]}>
        {spinner}
      </div>
    </div>
  );
};

export default LoadingComments;
