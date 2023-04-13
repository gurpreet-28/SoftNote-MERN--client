import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <>
      <div className="text-center mt-3">
        <img src={spinner} alt="spinner" />
      </div>
    </>
  );
};

export default Spinner;
