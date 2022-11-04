import "./LoadingComments.css";

const LoadingComments = () => {
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
      <div className="wrapper">{spinner}</div>
    </div>
  );
};

export default LoadingComments;
