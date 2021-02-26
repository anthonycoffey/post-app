import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import Audio from "../../../../components/Audio/Audio";
import Video from "../../../../components/Video/Video";

import { TweenMax } from "gsap";

import "./Slide.scss";

const maxes = [];

const Slide = ({ data, goToNextReveal }) => {
  const { items } = data;
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    playSequence();
    setAudio(data.slideAudio);
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  const playSequence = () => {
    TweenMax.to(".history-quote-up", 3, {
      opacity: 1,
    });
    TweenMax.to(".history-quote-down", 3, {
      opacity: 1,
    });
    TweenMax.to(".quote-1", 3, {
      opacity: 1,
    });
  };

  const onAudioEnded = () => {
    TweenMax.to(".history-slide-1", 1, {
      opacity: 0,
    });
    TweenMax.to(".history-slide-2", 1, {
      opacity: 1,
    });

    TweenMax.to(".history-slide-2-text-0", 0.5, {
      opacity: 0,
    }).delay(10);
    TweenMax.to(".history-slide-2-text-0", 0.1, {
      display: "none",
    }).delay(10.5);
    TweenMax.to(".history-slide-2-text-1", 0.5, {
      opacity: 1,
    }).delay(10.6);
    setTimeout(() => {
      TweenMax.to(".audio-panel", 0.5, {
        display: 'none',
      });
      TweenMax.to(".history-slide-2", 0.5, {
        opacity: 0,
      });
      TweenMax.to(".history-slide-video", 0.5, {
        opacity: 1,
      });
      setVideoPlaying(true);
    }, 19000);
  };

  const onVideoEnded = () => {
    goToNextReveal();
  };

  return (
    <div className={`${data.classNames || ""}`} style={data.style || {}}>
      <Audio
        data={{
          ...data.audio,
          url: audio,
        }}
        ref={audioRef}
        onEnded={onAudioEnded}
      />
      <div className="opacity-100 absolute history-slide-1 w-full h-full flex items-center justify-center">
        <div className="opacity-0 absolute history-quote-up" id="quote-up">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/quote-up.png`}
            alt=""
          />
        </div>
        <div
          className="font-serif opacity-0 absolute quote-1 flex text-center flex-col"
          id="quote-1"
        >
          <div className="text-white flex text-center justify-center">
            {renderHTML(items[0].text)}
          </div>
        </div>
        <div className="opacity-0 absolute history-quote-down" id="quote-down">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/quote-down.png`}
            alt=""
          />
        </div>
      </div>
      <div className="absolute opacity-0 history-slide-2 flex w-full h-full flex-col items-center justify-center">
        <div
          className="absolute top-12 history-slide-2-image w-3/12"
          style={items[1].style || {}}
        >
          <img src={items[1].image.url} alt="" />
        </div>
        <div className="font-serif absolute top-1/2 history-slide-2-text text-white text-3xl w-3/5 mt-6">
          <div className="opacity-100 block history-slide-2-text-0">
            {renderHTML(items[1].text[0])}
          </div>
          <div className="opacity-0 history-slide-2-text-1">
            {renderHTML(items[1].text[1])}
          </div>
        </div>
      </div>
      <div className="absolute history-slide-video opacity-0 flex w-full h-full flex-col items-center justify-center">
        <Video
          data={data.videoContent}
          key="reveal-0"
          onEnded={onVideoEnded}
          playing={videoPlaying}
        />
      </div>
    </div>
  );
};

export default Slide;
