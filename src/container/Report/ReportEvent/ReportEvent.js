import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";

import Audio from "../../../components/Audio/Audio";
import "./ReportEvent.scss";

const maxes = [];

const ReportEvent = ({ data }) => {
  const { scenario } = data;
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");

  useEffect(() => {
    setAudio(scenario.initialAudio);
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  const playSequence = () => {
  };

  const onAudioEnded = () => {};

  return (
    <div
      className={`report-select-event ${scenario.classNames || ""}`}
      style={scenario.style || {}}
      id="report-select-event"
    >
      <Audio
        data={{
          ...scenario.audio,
          url: audio,
        }}
        ref={audioRef}
        onEnded={onAudioEnded}
      />
    </div>
  );
};

export default ReportEvent;
