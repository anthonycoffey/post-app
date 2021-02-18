import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import Audio from "../../../../components/Audio/Audio";
import Video from "../../../../components/Video/Video";

import { TweenMax } from "gsap";

import "./Slide2.scss";

const maxes = [];
const animations = [
  {
    id: ".history-slide-2-text-0",
    initialDelay: 1,
    showingDelay: 8,
  },
  {
    id: ".history-slide-2-text-1",
    initialDelay: 9.5,
    showingDelay: 9,
  },
  {
    id: ".history-slide-2-text-2",
    initialDelay: 18.5,
    showingDelay: 8,
  },
  {
    id: ".history-slide-2-text-3",
    initialDelay: 27.5,
    showingDelay: 8,
  },
  {
    id: ".history-slide-2-text-4",
    initialDelay: 35.5,
    showingDelay: 8,
  },
];
const Slide2 = ({ data, goToNextReveal }) => {
  const { items } = data;
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  const playSequence = () => {
    TweenMax.to(".history-slide-text-image", 0.5, {
      opacity: 1,
    });
    animations.forEach((animation, index) => {
      const max1 = new TweenMax.to(animation.id, 0.5, {
        opacity: 1,
        onComplete: hideItem,
        onCompleteParams: [index, animation.id, animation.showingDelay],
      }).delay(animation.initialDelay);
      maxes.push(max1);
    });

    setTimeout(() => {
      TweenMax.to(".history-slide-text", 0.5, {
        opacity: 0,
      });
      TweenMax.to(".history-slide-video", 0.1, {
        display: 'block',
      });
      TweenMax.to(".history-slide-video", 0.5, {
        opacity: 1,
      });
      setVideoPlaying(true);
    }, 43000);
  };

  function hideItem(index, id, showingDelay) {
    setTimeout(() => {
      TweenMax.to(id, 0.5, {
        opacity: 0,
      });
    }, showingDelay * 1000);
  }

  const onVideoEnded = () => {
    goToNextReveal();
  };

  return (
    <div className={`${data.classNames || ""}`} style={data.style || {}}>
      <div className="absolute opacity-100 history-slide-text flex w-full h-full flex-col items-center justify-center">
        <div
          className="opacity-0 absolute md:top-20 lg:top-12 history-slide-text-image w-3/12"
          style={items[0].style || {}}
        >
          <img className="w-full h-full" src={items[0].image.url} alt="" />
        </div>
        <div className="font-serif absolute top-1/2 history-slide-2-text text-white md:text-xl lg:text-3xl md:w-4/5 lg:w-3/5 md:mt-16 lg:mt-28">
          {items[0].text.map((item, index) => (
            <div
              className={`opacity-0 absolute history-slide-2-text-${index}`}
              key={index}
            >
              {renderHTML(item)}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute hidden history-slide-video opacity-0 w-full h-full flex-col items-center justify-center">
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

export default Slide2;
