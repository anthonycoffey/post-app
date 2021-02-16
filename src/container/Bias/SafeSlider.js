import React, { useEffect, useState } from "react";
import { TweenMax } from "gsap";
import Slider from "rc-slider";
import Audio from "../../components/Audio/Audio";

import "./SafeSlider.scss";

const maxes = [];

const SafeSlider = ({ data }) => {
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
    TweenMax.to(".slider-done-button", 0.5, {
      opacity: 1,
    });
    setTimeout(() => {
      if (document.getElementById("safe-slider")) {
        document.getElementById("safe-slider").style.backgroundImage =
          "url(/assets/background/gray-background.jpg)";
      }
    }, 1000);
  };

  const handleDone = () => {
    TweenMax.to(".slider-done-button", 0.2, {
      opacity: 0,
    });
    setAudio(initialData.doneClickAudio);
  };

  const onAudioEnded = () => {};
  return (
    <div
      id={initialData.id}
      className={`bias-safe-slider-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div
        className={`bias-slider-title ${initialData.title.classNames || ""}`}
      >
        {initialData.title.content}
      </div>
      <div className={`my-10 bias-safe-slider-image ${initialData.safeSliderImage.classNames || ""}`}>
        <img
          src={initialData.safeSliderImage.url}
          alt=""
          style={initialData.safeSliderImage.style || {}}
          className="w-full h-full"
        />
      </div>
      <div className="slider-items flex flex-col justify-center items-center w-7/12 md:px-4 lg:px-8 pt-4">
        {initialData.items.map((item, index) => (
          <div className="slider-item-wrapper mb-4 w-full" key={index}>
            <div className="slider-content flex items-center justify-between">
              <div className="left-label text-white md:text-xl lg:text-2xl md:mr-8 lg:mr-12">
                {item.leftLabel}
              </div>
              <div className="slider-component-wrapper w-full relative">
                <Slider min={item.min} max={item.max} />
              </div>
              <div className="right-label text-white md:text-xl lg:text-2xl md:ml-8 lg:ml-12">
                {item.rightLabel}
              </div>
            </div>
          </div>
        ))}
        <button
          id="slider-done-button"
          className="opacity-0 slider-done-button"
          onClick={() => handleDone()}
        >
          Submit
        </button>
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

export default SafeSlider;
