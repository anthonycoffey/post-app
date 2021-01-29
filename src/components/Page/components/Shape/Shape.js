import React from "react";
const Shape = ({ data }) => {
  return (
    <div
      id={data.id}
      className={`shape ${data.classNames || ""}`}
      style={data.style || {}}
    />
  );
};

export default Shape;
