import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import Audio from "../../../components/Audio/Audio";

import "./TypeIn.scss";

const maxes = [];
const TypeIn = ({ data }) => {
  const { data: initialData } = data;
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");

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
    const max0 = new TweenMax.to(".person-4-wrapper", 0.5, {
      opacity: 1,
    }).delay(0.5);

    const max1 = TweenLite.from(".bias-type-in-title", 0.5, {
      y: -1000,
    }).delay(1);
    const max2 = TweenMax.to(".bias-type-in-title", 0.5, {
      opacity: 1,
    }).delay(1);

    const max3 = TweenLite.from(".person-1-wrapper", 0.5, {
      y: 1100,
    }).delay(1);
    const max4 = TweenMax.to(".person-1-wrapper", 0.5, {
      opacity: 1,
    }).delay(1);

    const max5 = TweenLite.from(".person-2-wrapper", 0.5, {
      y: 1100,
    }).delay(1);
    const max6 = TweenMax.to(".person-2-wrapper", 0.5, {
      opacity: 1,
    }).delay(1);

    const max7 = TweenLite.from(".person-3-wrapper", 0.5, {
      y: 1100,
    }).delay(1);
    const max8 = TweenMax.to(".person-3-wrapper", 0.5, {
      opacity: 1,
    }).delay(1);

    const max9 = TweenMax.to(".person-4-wrapper", 0.5, {
      opacity: 0,
    }).delay(7);
    const max10 = TweenMax.to(".person-5-wrapper", 0.5, {
      opacity: 1,
    }).delay(7.5);

    maxes.push(max0, max1, max2, max3, max4, max5, max6, max7, max8, max9, max10);
  };

  const onAudioEnded = () => {};

  return (
    <div
      id={initialData.id}
      className={`bias-type-in-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div className="opacity-0 font-serif font-medium w-full text-center bias-type-in-title text-black text-5xl mt-8">
        {initialData.title}
      </div>
      {initialData.personImages.map((personImage, index) => (
        <div
          className={`person-wrapper person-${index + 1}-wrapper ${
            personImage.classNames || ""
          }`}
          key={index}
          style={personImage.style || {}}
        >
          <img src={personImage.url} alt="" />
        </div>
      ))}
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

export default TypeIn;
