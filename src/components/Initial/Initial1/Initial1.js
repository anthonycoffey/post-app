import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { TweenMax } from "gsap";

import "./Initial1.scss";
const animations = [
  {
    id: "racial",
    type: "from",
    initialDelay: 1,
    showingDelay: 2,
    duration: 3,
  },
  {
    id: "identity",
    type: "from",
    initialDelay: 5,
    showingDelay: 2,
    duration: 3,
  },
  {
    id: "profiling",
    type: "from",
    initialDelay: 9,
    showingDelay: 2,
    duration: 3,
  },
];
const maxes = [];

const Initial1 = () => {
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
      const max = new TweenMax.to(
        document.getElementById(animation.id),
        animation.duration,
        {
          opacity: 1,
          onComplete: showVideo,
          onCompleteParams: [index],
        }
      ).delay(animation.initialDelay);
      maxes.push(max);
      max.eventCallback("onComplete", showVideo, [index]);
    });
  };

  function showVideo(index) {
    if (index === 2) {
      setTimeout(() => {
        TweenMax.to(document.getElementById("slide-1"), 1, {
          opacity: 0,
        });
        TweenMax.to(document.getElementById("slide-2"), 1, {
          visibility: "visible",
        });
        TweenMax.to(document.getElementById("slide-2"), 1, {
          opacity: 1,
        });
      }, 3000);
    }
  }

  return (
    <div className="initial-1-wrapper relative w-full h-full">
      <div
        className="slide-1 opacity-100 bg-black absolute w-full h-full top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center"
        id="slide-1"
      >
        <div className="slide-1-top flex justify-center items-center">
          <div
            className="fade-element opacity-0 text-white racial mr-4 text-title"
            id="racial"
          >
            Racial
          </div>
          <div
            className="fade-element opacity-0 text-white identity text-title"
            id="identity"
          >
            and Identity
          </div>
        </div>
        <div
          className="fade-element opacity-0 text-white slide-1-bottom profiling text-title"
          id="profiling"
        >
          Profiling
        </div>
      </div>
      <div
        className="slide-2 invisible opacity-0 absolute w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        id="slide-2"
      >
        <ReactPlayer
          url="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
          width="100%"
          height="100%"
          muted
          controls
        />
      </div>
    </div>
  );
};

export default Initial1;
