import React, { useState, useEffect } from "react";
import { TweenMax } from "gsap";

import "./Initial2.scss";
const animations = [
  {
    id: "quote-1",
    type: "from",
    initialDelay: 4,
    showingDelay: 3,
    duration: 3,
  },
  {
    id: "quote-2",
    type: "from",
    initialDelay: 11,
    showingDelay: 3,
    duration: 3,
  },
  {
    id: "quote-3",
    type: "from",
    initialDelay: 19,
    showingDelay: 3,
    duration: 3,
  },
];
const maxes = [];

const Initial2 = () => {
  useEffect(() => {
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, []);


  const playSequence = () => {
    const initialMax = TweenMax.to(
      [
        document.getElementById("quote-up"),
        document.getElementById("quote-down"),
      ],
      3,
      {
        opacity: 1,
      }
    )
      .delay(1)
      .duration(4);
    maxes.push(initialMax);

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
    if (index !== animations.length - 1) {
      setTimeout(() => {
        TweenMax.to(document.getElementById(id), duration, {
          opacity: 0,
        });
      }, showingDelay * 1000);
    } else {
      setTimeout(() => {
        TweenMax.to(
          [
            document.getElementById("quote-up"),
            document.getElementById("quote-down"),
            document.getElementById("quote-1"),
            document.getElementById("quote-2"),
            document.getElementById("quote-3"),
          ],
          duration,
          {
            opacity: 0,
          }
        );
      }, showingDelay * 1000);
    }
  }
  return (
    <div className="initial-1-wrapper w-full h-full bg-black flex flex-col justify-center items-center">
      <div className="opacity-0 absolute quote-up mb-12" id="quote-up">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/quote-up.png`}
          alt=""
          width="150px"
          height="250px"
        />
      </div>
      <div
        className="opacity-0 absolute quote-1 flex text-center flex-col"
        id="quote-1"
      >
        <div className="flex text-center justify-center">
          <span className="text-white">...</span>
          <span className="text-red-700 mr-2">Racial disparities</span>
          <span className="text-white">regarding</span>
        </div>
        <div className="text-white">police stops, searches, and arrests,</div>
        <div className="text-white mb-8">particularly for Black people.</div>
        <div className="additional text-white italic text-right">
          -Racial and Identity Profiling Advisory Board, 2019
        </div>
      </div>
      <div
        className="opacity-0 absolute quote-2 flex text-center flex-col"
        id="quote-2"
      >
        <div className="text-white">...Officers were far move likely to</div>
        <div className="text-white">stop Black and Hispanic drivers</div>
        <div className="flex text-center justify-center mb-12">
          <span className="text-red-700">for no discernible reason</span>
          <span className="text-white">...</span>
        </div>
        <div className="additional text-white italic text-right">
          -Racial and Identity Profiling Advisory Board, 2019
        </div>
      </div>
      <div
        className="opacity-0 absolute quote-3 flex text-center flex-col"
        id="quote-3"
      >
        <div className="text-white leading-none">
          "African-Americans... far more
        </div>
        <div className="text-white leading-tight">
          likely than whites and other
        </div>
        <div className="flex text-center justify-center leading-tight">
          <span className="text-white mr-4">groups to be the</span>
          <span className="text-red-700">victims of use of</span>
        </div>
        <div className="flex text-center justify-center mb-12 leading-tight">
          <span className="text-red-700 mr-4">force</span>
          <span className="text-white">by the police..."</span>
        </div>
        <div className="additional text-white italic text-right">
          -Racial and Identity Profiling Advisory Board, 2019
        </div>
      </div>
      <div className="opacity-0 absolute quote-down mt-12" id="quote-down">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/quote-down.png`}
          alt=""
          width="150px"
          height="250px"
        />
      </div>
    </div>
  );
};

export default Initial2;
