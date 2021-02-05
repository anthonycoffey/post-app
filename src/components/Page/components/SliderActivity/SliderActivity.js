import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Audio from "../Audio/Audio";

import "./SliderActivity.scss";

const maxes = [];

const SliderActivity = ({ data }) => {
  const { data: initialData } = data;
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");
  const [feedbackItem, setFeedbackItem] = useState(-1);

  useEffect(() => {
    setAudio(initialData.initialAudio);
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  useEffect(() => {
    showMark();
  }, [feedbackItem]);

  const playSequence = () => {
    TweenMax.to(".slider-done-button", 0.2, {
      opacity: 1,
    });
  };

  const handleDone = () => {
    TweenMax.to(".slider-done-button", 0.2, {
      opacity: 0,
    });
    setAudio(initialData.doneClickAudio);
  };

  const showMark = () => {
    if (feedbackItem > -1) {
      TweenMax.to(`.feedback-mark-${feedbackItem}`, 0.1, {
        display: "block",
      });
      TweenMax.to(`.feedback-mark-${feedbackItem}`, 0.2, {
        opacity: 1,
      }).delay(0.1);
      document.getElementById(
        `feedback-mark-${feedbackItem}`
      ).style.left = `calc(${initialData.feedback[feedbackItem].style.left} - 15px)`;
    }
  };
  const handleContinue = () => {
    if (feedbackItem < 3) {
      setFeedbackItem(feedbackItem + 1);
    }
  };

  const onAudioEnded = () => {
    if (audio.includes("done-click")) {
      TweenMax.to(".initial-title", 0.1, {
        opacity: 0,
      });
      TweenMax.to(".initial-title", 0.1, {
        display: "none",
      }).delay(0.2);
      TweenMax.to(".feedback-wrapper", 0.1, {
        display: "flex",
      }).delay(0.2);
      TweenMax.to(".feedback-wrapper", 0.2, {
        opacity: 1,
      }).delay(0.3);
      setFeedbackItem(0);
    }
  };

  return (
    <div
      id={initialData.id}
      className={`slider-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div className="slider-section flex w-full items-center justify-between">
        <div className={`slider-image w-5/12 mx-auto`}>
          <img
            src={initialData.image.url}
            alt={initialData.image.alt}
            className={initialData.image.classNames || ""}
          />
        </div>
        <div className="slider-items flex flex-col justify-center items-center w-7/12 md:px-4 lg:px-8 pt-4">
          {initialData.items.map((item, index) => (
            <div className="slider-item-wrapper mb-4 w-full" key={index}>
              <div className="slider-title w-full text-center text-white md:text-xl lg:text-3xl font-bold">
                {item.title}
              </div>
              <div className="slider-content flex items-center justify-between">
                <div className="left-label text-white md:text-xl lg:text-2xl md:mr-8 lg:mr-12">
                  {item.leftLabel}
                </div>
                <div className="slider-component-wrapper w-full relative">
                  <Slider min={item.min} max={item.max} />
                  <img
                    id={`feedback-mark-${index}`}
                    className={`feedback-mark-${index} absolute top-0 opacity-0 hidden`}
                    src={initialData.feedbackMarkImage}
                    alt="feedback-mark"
                    width="35px"
                    height="35px"
                  />
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
            Done
          </button>
        </div>
      </div>
      <div className="feedback-section w-full h-full flex items-center justify-center">
        <div className="block initial-title text-white md:text-2xl lg:text-4xl text-center">
          {initialData.title}
        </div>
        <div className="feedback-wrapper hidden opacity-0 w-full lg:px-12 md:px-4 items-center justify-start md:py-2 lg:py-4">
          <div className="feedback-logo md:w-36 lg:w-44 md:mr-12 lg:mr-16">
            <img src={initialData.feedbackLogo} alt="feedback-logo" />
          </div>
          {
            feedbackItem > -1 ? (
              <div className="feedback-content w-full relative">
                <div className="feedback-title text-white md:text-2xl lg:text-4xl mb-4">
                  {initialData.feedback[feedbackItem].title}
                </div>
                <div className="feedback-text md:text-xl lg:text-2xl md:p-2 lg:p-4">
                  {initialData.feedback[feedbackItem].text}
                </div>
                <div className="continue-wrapper w-full flex items-center justify-end">
                  <button
                    id="slider-continue-button"
                    className="slider-continue-button"
                    onClick={() => handleContinue()}
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : null
          }
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

export default SliderActivity;
