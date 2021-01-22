import React from "react";
import AudioPlayer from "react-h5-audio-player";

const Audio = React.forwardRef(({ data, onEnded }, ref) => {
  return (
    <div
      id={data.id}
      className={`audio-panel ${data.classNames || ""}`}
      style={data.style || {}}
      >
      <AudioPlayer
        ref={ref}
        autoPlay
        autoPlayAfterSrcChange
        src={`${process.env.PUBLIC_URL}${data.url}`}
        onEnded={onEnded}
        // onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </div>
  );
});

export default Audio;
