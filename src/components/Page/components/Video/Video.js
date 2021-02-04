import React from "react";
import ReactPlayer from "react-player";
import "./Video.scss";

const Video = ({ data }) => {
  return (
    <div
      id={data.id}
      className={`video-wrapper ${data.classNames || ""}`}
      style={data.style || {}}
    >
      <ReactPlayer
        url={data.url}
        width={data.width}
        height={data.height}
        muted
        controls
      />
    </div>
  );
};

export default Video;
