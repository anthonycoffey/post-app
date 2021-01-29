import React from "react";
import AudioPlayer from "react-h5-audio-player";

const Audio = React.forwardRef(({ data, onEnded }, ref) => {
  return (
    <div
      id={'audio-wrapper' || data.id}
      className={`audio-panel ${data ? data.classNames : ""}`}
      style={data ? data.style : {}}
      >
      <AudioPlayer
        ref={ref}
        autoPlay
        autoPlayAfterSrcChange
        src={data ? `${process.env.PUBLIC_URL}${data.url}` : null}
        onEnded={onEnded}
        // onPlay={(e) => console.log("onPlay")}
        // other props here
      />
    </div>
  );
});

export default Audio;
