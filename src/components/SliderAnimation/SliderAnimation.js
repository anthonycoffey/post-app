import React, { useEffect, useState } from "react";
import { TweenMax } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import renderHTML from "react-render-html";

import "rc-slider/assets/index.css";
import Audio from "../Audio/Audio";

import "./SliderAnimation.scss";

const maxes = [];

const SliderAnimation = ({ data }) => {
  const { data: initialData } = data;
  const dispatch = useDispatch();
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");
  const { pageIndex } = useSelector((state) => state.status);

  useEffect(() => {
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  const playSequence = () => {
    TweenMax.to(".slider-animation-text", 0.5, {
      opacity: 1,
    });
    TweenMax.to(".slider-animation-text", 0.5, {
      opacity: 0,
    }).delay(5);
    TweenMax.to(".slider-animation-text", 0.1, {
      display: 'none',
    }).delay(5.5);

    setTimeout(() => {
      setAudio(initialData.initialAudio);
    }, 5600);
    TweenMax.to(".slider-animation-image", 0.1, {
      display: 'block',
    }).delay(5.6);
    TweenMax.to(".slider-animation-image", 0.5, {
      opacity: 1,
    }).delay(5.7);
  };

  return (
    <div
      id={initialData.id}
      className={`slider-animation-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div className={`slider-animation-text text-center text-white text-5xl opacity-100 ${initialData.text.classNames}`}>
        {renderHTML(initialData.text.content)}
      </div>
      <div className={`hidden slider-animation-image opacity-0 ${initialData.image.classNames}`}>
        <img src={initialData.image.url} alt="" />
      </div>
      <Audio
        data={{
          ...initialData.audio,
          url: audio,
        }}
        ref={audioRef}
      />
    </div>
  );
};

export default SliderAnimation;
