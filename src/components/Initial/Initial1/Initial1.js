import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./Initial1.scss";

const Initial1 = () => {
  useEffect(() => {
    playSequence();
  }, []);
  const [isPlaying, setIsPlaying] = useState(false);
  const animations = [
    {
      id: "racial",
      type: "from",
      delay: 2,
    },
    {
      id: "identity",
      type: "from",
      delay: 2,
    },
    {
      id: "profiling",
      type: "from",
      delay: 2,
    },
  ];

  let animationIndex = 0;
  const playSequence = () => {
    setTimeout(() => {
      document.getElementById(animations[animationIndex].id).style.opacity = 1;
      animationIndex++;
      if (animationIndex < animations.length) {
        playSequence();
      } else {
        setTimeout(() => {
          document.getElementById("slide-1").style.opacity = 0;
          document.getElementById("slide-2").style.visibility = "visible";
          document.getElementById("slide-2").style.opacity = 1;
          setIsPlaying(true);
        }, 3000);
      }
    }, 2000);
  };

  return (
    <div className="initial-1-wrapper relative w-full h-full">
      <div
        className="slide-1 bg-black absolute w-full h-full top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center"
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
          playing={isPlaying}
          muted
        />
      </div>
    </div>
  );
};

export default Initial1;
