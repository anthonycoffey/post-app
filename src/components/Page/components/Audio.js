import React from 'react';
import AudioPlayer from "react-h5-audio-player";

const Audio = ({data}) => {
  return <div
    id={data.id}
    className={`audio-panel ${data.classNames || ""}`}
    style={data.style || {}}
  >
    <AudioPlayer
      autoPlay
      src={`${process.env.PUBLIC_URL}${data.url}`}
      // onPlay={(e) => console.log("onPlay")}
      // other props here
    />
  </div>
}

export default Audio;
