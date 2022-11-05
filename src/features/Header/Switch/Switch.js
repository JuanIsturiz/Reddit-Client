import { useDispatch, useSelector } from "react-redux";
import { selectTheme, toggleTheme } from "../../../AppSlice";
import "./Switch.css";

const Switch = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <div className="Switch">
      <span>{theme === "light" ? "dark" : "light"} mode</span>
      <label className="switch" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onClick={() => dispatch(toggleTheme())}
        />
        <div className="slider round"></div>
      </label>
    </div>
  );
};

export default Switch;
