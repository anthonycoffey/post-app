import React from "react";
const Shape = ({ data, index }) => {
  return (
    <div
      id={data.id}
      className={`shape ${data.classNames || ""}`}
      style={data.style || {}}
      key={index}
    />
  );
};

export default Shape;
