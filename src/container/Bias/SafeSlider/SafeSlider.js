import React, { useEffect, useState } from "react";
import { TweenMax } from "gsap";
import Slider from "rc-slider";
import Audio from "../../../components/Audio/Audio";

import "./SafeSlider.scss";

const maxes = [];

const SafeSlider = ({ data }) => {
  const { data: initialData } = data;
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");
  const [safeValue, setSafeValue] = useState(0);
  useEffect(() => {
    console.log(initialData.initialAudio);
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
    TweenMax.to(".bias-slider-title", 0.2, {
      opacity: 0,
    });
    TweenMax.to(".bias-safe-slider-image", 0.2, {
      opacity: 0,
    });
    TweenMax.to(".slider-items", 0.2, {
      opacity: 0,
    });

    TweenMax.to(".slider-done-button", 0.1, {
      display: "none",
    }).delay(0.2);
    TweenMax.to(".bias-slider-title", 0.1, {
      display: "none",
    }).delay(0.2);
    TweenMax.to(".bias-safe-slider-image", 0.1, {
      display: "none",
    }).delay(0.2);
    TweenMax.to(".slider-items", 0.1, {
      display: "none",
    }).delay(0.2);

    TweenMax.to(".bias-safe-result-wrapper", 0.1, {
      display: "block",
    }).delay(0.3);
    TweenMax.to(".bias-safe-result-wrapper", 0.2, {
      opacity: 1,
    }).delay(0.4);
    setTimeout(() => {
      document
        .getElementById(initialData.id)
        .classList.replace("justify-start", "justify-center");
    }, 300);
    console.log(safeValue);
    if (safeValue > 2) {
      setAudio(initialData.feedbackAudio2);
    } else {
      setAudio(initialData.feedbackAudio1);
    }
  };

  const onHandleChange = (value) => {
    setSafeValue(value);
  };

  const onAudioEnded = () => {};
  return (
    <div
      id={initialData.id}
      className={`bias-safe-slider-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div
        className={`font-serif opacity-100 bias-slider-title ${
          initialData.title.classNames || ""
        }`}
      >
        {initialData.title.content}
      </div>
      <div
        className={`opacity-100 my-10 bias-safe-slider-image ${
          initialData.safeSliderImage.classNames || ""
        }`}
      >
        <img
          src={initialData.safeSliderImage.url}
          alt=""
          style={initialData.safeSliderImage.style || {}}
          className="w-full h-full"
        />
      </div>
      <div className="opacity-100 slider-items flex flex-col justify-center items-center w-7/12 md:px-4 lg:px-8 pt-4">
        {initialData.items.map((item, index) => (
          <div className="font-serif slider-item-wrapper mb-4 w-full" key={index}>
            <div className="slider-content flex items-center justify-between">
              <div className="left-label text-white text-2xl mr-12">
                {item.leftLabel}
              </div>
              <div className="slider-component-wrapper w-full relative">
                <Slider
                  min={item.min}
                  max={item.max}
                  onChange={onHandleChange}
                />
              </div>
              <div className="right-label text-white text-2xl ml-12">
                {item.rightLabel}
              </div>
            </div>
          </div>
        ))}
        <button
          id="slider-done-button"
          className="font-serif opacity-0 slider-done-button"
          onClick={() => handleDone()}
        >
          Submit
        </button>
      </div>
      <div className="hidden opacity-0 bias-safe-result-wrapper w-7/12 h-4/6">
        <img
          src={safeValue > 2 ? initialData.dogImage2 : initialData.dogImage1}
          alt=""
        />
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
