import React, { useState, useEffect } from "react";
import { TweenMax } from "gsap";

import "./Initial3.scss";
const animations = [
  {
    id: "people-normal",
    type: "from",
    initialDelay: 3,
    showingDelay: 3,
    duration: 1,
  },
  {
    id: "people-hand-up",
    type: "from",
    initialDelay: 7,
    showingDelay: 3,
    duration: 1,
  },
  {
    id: "people-up-closed",
    type: "from",
    initialDelay: 11,
    showingDelay: 3,
    duration: 1,
  },
  {
    id: "people-after-closed",
    type: "from",
    initialDelay: 15,
    showingDelay: 3,
    duration: 1,
  },
  {
    id: "people-normal",
    type: "from",
    initialDelay: 19,
    showingDelay: 3,
    duration: 1,
  },
  {
    id: "people-hand-up",
    type: "from",
    initialDelay: 23,
    showingDelay: 3,
    duration: 1,
  },
];
const maxes = [];

const Initial3 = () => {
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
      const max = new TweenMax.to(document.getElementById(animation.id), animation.duration, {
        opacity: 1,
        onComplete: showVideo,
        onCompleteParams: [
          index,
          animation.id,
          animation.duration,
          animation.showingDelay,
        ],
      }).delay(animation.initialDelay);
      maxes.push(max);
    });
  };

  function showVideo(index, id, duration, showingDelay) {
    setTimeout(() => {
      TweenMax.to(document.getElementById(id), duration, {
        opacity: 0,
      });
    }, showingDelay * 1000);
    // else {
    //   setTimeout(() => {
    //     TweenMax.to(
    //       [
    //         document.getElementById("quote-up"),
    //         document.getElementById("quote-down"),
    //         document.getElementById("quote-1"),
    //         document.getElementById("quote-2"),
    //         document.getElementById("quote-3"),
    //       ],
    //       duration,
    //       {
    //         opacity: 0,
    //       }
    //     );
    //   }, showingDelay * 1000);
    // }
  }

  return (
    <div className="initial-3-wrapper w-full h-full bg-black flex justify-center items-center">
      <div className="opacity-0 people-wrapper absolute people-normal" id="people-normal">
        <img
          src={`${process.env.PUBLIC_URL}/assets/people/rick/people-normal.png`}
          alt=""
        />
      </div>
      <div className="opacity-0 people-wrapper absolute people-hand-up" id="people-hand-up">
        <img
          src={`${process.env.PUBLIC_URL}/assets/people/rick/people-hand-up.png`}
          alt=""
        />
      </div>
      <div className="opacity-0 people-wrapper absolute people-up-closed" id="people-up-closed">
        <img
          src={`${process.env.PUBLIC_URL}/assets/people/rick/people-up-closed.png`}
          alt=""
        />
      </div>
      <div className="opacity-0 people-wrapper absolute people-after-closed" id="people-after-closed">
        <img
          src={`${process.env.PUBLIC_URL}/assets/people/rick/people-after-closed.png`}
          alt=""
        />
      </div>
    </div>
  );
};

export default Initial3;
