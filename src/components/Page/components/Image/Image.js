import React from "react";
import "./Image.scss";

const Image = ({ data }) => {
  return (
    <div
      id={data.id}
      className={`image-wrapper ${data.classNames || ""}`}
      style={data.style || {}}
    >
      <img src={`${process.env.PUBLIC_URL}${data.url}`} alt={data.alt} style={data.imageStyle || {}} />
    </div>
  );
};

export default Image;
