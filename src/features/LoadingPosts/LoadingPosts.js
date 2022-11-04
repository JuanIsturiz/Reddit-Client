import "./LoadingPosts.css";

const LoadingPosts = () => {
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
      <div className="wrapper">{spinner}</div>
      <div className="wrapper">{spinner}</div>
      <div className="wrapper">{spinner}</div>
      <div className="wrapper">{spinner}</div>
    </div>
  );
};

export default LoadingPosts;
