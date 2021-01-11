import React from "react";

const Image = ({ data, index }) => {
  return (
    <div
      id={data.id}
      className={`image-wrapper ${data.classNames || ""}`}
      style={data.style || {}}
      key={index}
    >
      <img src={`${process.env.PUBLIC_URL}${data.url}`} alt={data.alt} />
    </div>
  );
};

export default Image;
