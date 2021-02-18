import React from "react";
import renderHTML from "react-render-html";
import "./Text.scss";

const Text = ({ data }) => {
  return (
    <div
      id={data.id}
      className={`font-serif text-wrapper ${data.classNames ? data.classNames : ""}`}
      style={data.style || {}}
    >
      <div
        className={`text`}
        style={data.style || {}}
      >
        {renderHTML(data.content)}
      </div>
    </div>
  );
};

export default Text;
