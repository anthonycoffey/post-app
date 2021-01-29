import React from "react";
import renderHTML from "react-render-html";
const Content = ({ data }) => {
  return (
    <div
      id={data.id}
      className={`content-wrapper ${
        data.classNames ? data.classNames : ""
      }`}
      style={data.style || {}}
    >
      {data.title ? (
        <div
          className={`title ${data.title.classNames || ""}`}
          style={data.title.style || {}}
        >
          {data.title.content}
        </div>
      ) : null}
      {data.description ? (
        <div
          className={`description ${data.description.classNames || ""}`}
          style={data.description.style || {}}
        >
          {renderHTML(data.description.content)}
        </div>
      ) : null}
    </div>
  );
};

export default Content;
