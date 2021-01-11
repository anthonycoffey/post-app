import React, { useState, useEffect } from "react";
import { TweenMax } from "gsap";

import "./Initial4.scss";
const animations = [
  {
    id: "background-wrapper",
    type: "from",
    initialDelay: 1,
    showingDelay: 2,
    duration: 3,
  },
  {
    id: "string-wrapper",
    type: "from",
    initialDelay: 6,
    showingDelay: 3,
    duration: 4,
  },
];
const maxes = [];

const Initial4 = () => {
  useEffect(() => {
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, []);

  const playSequence = () => {
    animations.forEach((animation, index) => {
      if (index === 0) {
        const max = new TweenMax.to(
          document.getElementById(animation.id),
          animation.duration,
          {
            left: 0,
          }
        ).delay(animation.initialDelay);
        maxes.push(max);
      } else {
        const max = new TweenMax.to(
          document.getElementById(animation.id),
          animation.duration,
          {
            opacity: 1,
          }
        ).delay(animation.initialDelay);
        maxes.push(max);
      }
    });
  };

  return (
    <div className="initial-4-wrapper w-full h-full bg-black flex justify-center items-center">
      <div
        className="background-wrapper absolute top-0"
        id="background-wrapper"
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/background/initial-4-background.jpg`}
          alt=""
        />
      </div>
      <div className="opacity-0 string-wrapper absolute " id="string-wrapper">
        To stop or not to stop?
      </div>
    </div>
  );
};

export default Initial4;
