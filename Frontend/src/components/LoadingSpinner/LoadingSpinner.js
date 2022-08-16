import React from "react";
import "./LoadingSpinner.css";
import loadingImage from "../../assets/images/loading2.svg";

function LoadingSpinner() {
  return (
    <div className="loading">
      <img src={loadingImage} />
      Loading.....
    </div>
  );
}

export default LoadingSpinner;
