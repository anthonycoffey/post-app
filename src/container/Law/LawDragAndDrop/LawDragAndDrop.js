import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import Audio from "../../../components/Audio/Audio";

import "./LawDragAndDrop.scss";

const maxes = [];

const LawDragAndDrop = ({ data }) => {
  const { data: initialData } = data;
  const [audio, setAudio] = useState("");
  const audioRef = React.createRef();

  useEffect(() => {
    setAudio(initialData.initialAudio);
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);
  const playSequence = () => {
    const max0 = TweenMax.to(".law-intial-person-1-wrapper", 0.5, {
      opacity: 1,
    });
    const max1 = TweenMax.to(".law-intial-person-1-wrapper", 0.5, {
      opacity: 0,
    }).delay(11);
    const max2 = TweenMax.to(".law-intial-person-2-wrapper", 0.5, {
      opacity: 1,
    }).delay(11);

    const max3 = TweenLite.from(".law-initial-title", 0.5, {
      x: 1100,
    }).delay(11);
    const max4 = TweenMax.to(".law-initial-title", 0.5, {
      opacity: 1,
    }).delay(11);

    maxes.push(max0, max1, max2, max3, max4);
  };
  const onAudioEnded = () => {};

  return (
    <div
      id={initialData.id}
      className={`law-drag-and-drop-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div className="law-initial-wrapper w-full h-full relative">
        <div className="opacity-0 law-intial-person-1-wrapper w-1/2 -bottom-1/4 absolute left-1/4">
          <img src={initialData.person1Image.url} alt="" />
        </div>
        <div className="opacity-0 law-intial-person-2-wrapper w-1/2 -bottom-1/4 absolute left-0">
          <img src={initialData.person2Image.url} alt="" />
        </div>
        <div className={`absolute top-1/3 left-1/2 opacity-0 law-initial-title ${initialData.title.classNames || ''}`}>
          {initialData.title.text}
        </div>
      </div>
      <Audio
        data={{
          ...initialData.audio,
          url: audio,
        }}
        ref={audioRef}
        onEnded={onAudioEnded}
      />
    </div>
  );
};

export default LawDragAndDrop;
