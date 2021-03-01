import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import Audio from "../../../components/Audio/Audio";

import "./TypeInNext.scss";

const maxes = [];
const timers = [];
const TypeInNext = ({ data }) => {
  const { data: initialData } = data;
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");
  const [respond, setRespond] = useState("");

  useEffect(() => {
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, [data]);

  const playSequence = () => {
    const max4 = TweenMax.to(".audio-panel", 0.1, {
      opacity: 0,
    });
    const max0 = TweenMax.to(".saying-logo", 0.5, {
      opacity: 1,
    });
    const max1 = TweenMax.to(".saying-text", 0.5, {
      opacity: 1,
    }).delay(0.5);

    const max2 = TweenMax.to(".type-in-next-respond-wrapper", 0.5, {
      opacity: 1,
    }).delay(4);
    const max3 = TweenMax.to(".type-in-done-button", 0.5, {
      opacity: 1,
    }).delay(4.5);
    maxes.push(max0, max1, max2, max3, max4);
  };

  const onAudioEnded = () => {};
  const handleDone = () => {
    const max9 = TweenMax.to(".audio-panel", 0.5, {
      opacity: 1,
    });
    if (!respond) {
      setAudio(initialData.tryAgainAudio);
    } else {
      setAudio(initialData.feedbackAudio);
      const max4 = TweenMax.to(".type-in-done-button", 0.5, {
        opacity: 0,
      });
      const max5 = TweenMax.to(".type-in-done-button", 0.1, {
        display: 'none',
      });

      const max6 = TweenLite.from(".type-in-next-feedback-wrapper", 0.5, {
        x: 1100,
      }).delay(3);
      const max7 = TweenMax.to(".type-in-next-feedback-wrapper", 0.5, {
        opacity: 1,
      }).delay(3);
      const max8 = TweenMax.to(".type-in-continue-button", 0.5, {
        opacity: 1,
      }).delay(3.5);
      maxes.push(max4, max5, max6, max7, max8, max9);

    }
  };
  const handleContinue = () => {};
  const handleChange = (e) => {
    setRespond(e.target.value);
  };

  return (
    <div
      id={initialData.id}
      className={`bias-type-in-next-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div className="type-in-saying-wrapper m-6 flex items-center justify-center">
        <div className="opacity-0 flex-shrink-0 saying-logo w-2/12 h-2/12 mr-12">
          <img src={initialData.saying.image} alt="saying-logo" />
        </div>
        <div className="opacity-0 flex-grow saying-text flex items-center justify-center text-xl p-8 h-full">
          {initialData.saying.text}
        </div>
      </div>
      <div className="type-in-next-respond-feedback-wrapper w-full relative">
        <div className="type-in-next-respond pl-4 pr-2 h-96 absolute w-1/2">
          <div
            className={`opacity-0 type-in-next-respond-wrapper ${
              initialData.respond.classNames || ""
            }`}
          >
            <div
              className={`type-in-next-respond-title ${
                initialData.respond.title.classNames || ""
              }`}
            >
              {initialData.respond.title.content}
            </div>
            <textarea
              className="type-in-next-respond-input w-full"
              type="text"
              placeholder="Type your answer here"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="respond-action flex items-center justify-center">
            <button
              id="done-button"
              className="font-serif block opacity-0 type-in-done-button"
              onClick={() => handleDone()}
            >
              Done
            </button>
          </div>
        </div>
        <div className="type-in-next-feedback h-96 pl-2 pr-4 absolute right-0 w-1/2">
          <div
            className={`opacity-0 type-in-next-feedback-wrapper ${
              initialData.feedback.classNames || ""
            }`}
          >
            <div
              className={`type-in-next-feedback-title ${
                initialData.feedback.title.classNames || ""
              }`}
            >
              {initialData.feedback.title.content}
            </div>
            <div className="type-in-next-feedback-description text-2xl">
              {initialData.feedback.description}
            </div>
          </div>
          <div className="feedback-action flex items-center justify-center">
            <button
              id="continue-button"
              className="font-serif block opacity-0 type-in-continue-button"
              onClick={() => handleContinue()}
            >
              Continue
            </button>
          </div>
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

export default TypeInNext;
