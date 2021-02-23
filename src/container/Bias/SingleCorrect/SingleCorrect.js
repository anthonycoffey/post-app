import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import Audio from "../../../components/Audio/Audio";

import "./SingleCorrect.scss";

const maxes = [];
const timers = [];
const animations = [
  {
    id: ".choice-0",
    type: "from",
    initialDelay: 4.5,
    showingDelay: 0.5,
    duration: 0.5,
  },
  {
    id: ".choice-1",
    type: "from",
    initialDelay: 4.6,
    showingDelay: 0.5,
    duration: 0.5,
  },
  {
    id: ".choice-2",
    type: "from",
    initialDelay: 4.7,
    showingDelay: 0.5,
    duration: 0.5,
  },
];

const TypeInNext = ({ data }) => {
  const { data: initialData } = data;
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");
  const [choices, setChoices] = useState([]);
  const [choiceIndex, setChoiceIndex] = useState(-1);

  useEffect(() => {
    setChoices(initialData.choices);
    playSequence();
    setAudio(initialData.initialAudio);
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, [data]);

  useEffect(() => {
    if (choiceIndex > -1) {
      setAudio(choices[choiceIndex].audio);
      const max5 = TweenMax.to(
        ".bias-single-correct-initial-person-wrapper",
        0.5,
        {
          opacity: 0,
        }
      );
      const max6 = TweenMax.to(
        ".bias-single-correct-choice-imagge-wrapper",
        0.5,
        {
          opacity: 1,
        }
      );

      const max7 = TweenMax.to(".whole-overlap", 0.5, {
        display: "block",
      });
      maxes.push(max5, max6, max7);
    }
  }, [choiceIndex]);

  const playSequence = () => {
    const max0 = TweenMax.to(
      ".bias-single-correct-initial-person-wrapper",
      0.5,
      {
        opacity: 1,
      }
    );
    const max1 = TweenLite.from(".choices-wrapper", 0.5, {
      x: 1100,
    }).delay(4);
    const max2 = TweenMax.to(".choices-wrapper", 0.25, {
      opacity: 1,
    }).delay(4);

    animations.forEach((animation) => {
      const max3 = TweenMax.to(animation.id, 0.5, {
        opacity: 1,
      }).delay(animation.initialDelay - 0.5);
      const max4 = new TweenLite.from(animation.id, animation.duration, {
        x: 1200,
      }).delay(animation.initialDelay);
      maxes.push(max3, max4);
    });

    maxes.push(max0, max1, max2);
  };

  const onAudioEnded = () => {
    if (!audio.includes("initial")) {
      const max8 = TweenMax.to(".whole-overlap", 0.5, {
        display: "none",
      });
    }
  };
  const handleChoice = (index) => {
    if (!choices[index].isClicked) {
      setChoiceIndex(index);
      const temp = choices.slice();
      temp[index].isClicked = true;
      setChoices([...temp]);
    }
  };

  return (
    <div
      id={initialData.id}
      className={`bias-single-correct-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div className="hidden whole-overlap w-full h-full absolute left-0 top-0 bottom-0 right-0"></div>
      <div className="opacity-0 absolute -left-12 -bottom-1/4 w-1/2 bias-single-correct-initial-person-wrapper">
        <img src={initialData.initialImage.url} alt="" />
      </div>
      {choiceIndex > -1 ? (
        <div className="opacity-0 absolute -left-12 -bottom-1/4 w-1/2 bias-single-correct-choice-imagge-wrapper">
          <img src={choices[choiceIndex].image} alt="" />
        </div>
      ) : null}
      <div className="absolute right-6 w-1/2 top-20 bg-white opacity-0 choices-wrapper md:p-3 lg:p-6">
        <div className="font-serif font-bold choices-title text-center md:text-xl lg:text-3xl md:px-4 lg:px-8 pb-4 mb-4">
          {initialData.title.text}
        </div>
        {initialData.choices.map((choice, index) => (
          <div
            className={`opacity-0 choice-wrapper font-serif text-white md:text-xl lg:text-3xl choice-${index} ${
              choices && choiceIndex > -1
                ? choices[index].isClicked
                  ? choice.isCorrect
                    ? "active-correct"
                    : "active"
                  : ""
                : null
            }`}
            key={index}
            onClick={() => handleChoice(index)}
          >
            {choice.title}
          </div>
        ))}
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

export default TypeInNext;
