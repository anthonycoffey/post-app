import React from "react";
import renderHTML from "react-render-html";
const Text = ({ data }) => {
  return (
    <div
      id={data.id}
      className={`content-wrapper ${data.classNames ? data.classNames : ""}`}
      style={data.style || {}}
    >
      <div
        className={`text ${data.classNames || ""}`}
        style={data.style || {}}
      >
        {data.content}
      </div>
    </div>
  );
};

export default Text;
