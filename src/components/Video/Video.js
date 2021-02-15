import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPageIndexRequest,
} from "../../store/actions/status.action";
import ReactPlayer from "react-player";
import "./Video.scss";

const Video = ({ data, onEnded, playing }) => {
  const pageIndex = useSelector((state) => state.status.pageIndex);
  const dispatch = useDispatch();

  const handleEnded = () => {
    if (data.goNextSection) {
      dispatch(setPageIndexRequest(pageIndex + 1));
    }
    if (onEnded) {
      onEnded();
    }
  }

  return (
    <div
      id={data.id}
      className={`video-wrapper ${data.classNames || ""}`}
      style={data.style || {}}
    >
      <ReactPlayer
        playing={playing}
        url={data.url}
        width={data.width}
        height={data.height}
        onEnded={handleEnded}
        controls
      />
    </div>
  );
};

export default Video;
