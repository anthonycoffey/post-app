import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import Slider from "rc-slider";
import Audio from "../Audio/Audio";
import { setPageIndexRequest } from "../../../../store/actions/status.action";

import "./SliderActivity.scss";

const maxes = [];
const animations = [
  {
    id: ".slider-selection-item-0",
    type: "from",
    initialDelay: 1.5,
    showingDelay: 0.5,
    duration: 0.5,
  },
  {
    id: ".slider-selection-item-1",
    type: "from",
    initialDelay: 1.6,
    showingDelay: 0.5,
    duration: 0.5,
  },
  {
    id: ".slider-selection-item-2",
    type: "from",
    initialDelay: 1.7,
    showingDelay: 0.5,
    duration: 0.5,
  },
];
const SliderActivity = ({ data }) => {
  const { data: initialData } = data;
  const dispatch = useDispatch();
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");
  const [feedbackItem, setFeedbackItem] = useState(-1);
  const [selection, setSelection] = useState({});
  const [selectedItem, setSelectedItem] = useState(-1);
  const { pageIndex } = useSelector((state) => state.status);

  useEffect(() => {
    setAudio(initialData.initialAudio);
    setSelection(initialData.selection);
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  useEffect(() => {
    showMark();
  }, [feedbackItem]);

  useEffect(() => {
    showSelectionResult();
  }, [selectedItem]);

  const playSequence = () => {
    TweenMax.to(".slider-done-button", 0.2, {
      opacity: 1,
    });
  };

  const handleDone = () => {
    TweenMax.to(".slider-done-button", 0.2, {
      opacity: 0,
    });
    setAudio(initialData.doneClickAudio);
  };

  const showMark = () => {
    if (feedbackItem > -1) {
      TweenMax.to(`.feedback-mark-${feedbackItem}`, 0.1, {
        display: "block",
      });
      TweenMax.to(`.feedback-mark-${feedbackItem}`, 0.2, {
        opacity: 1,
      }).delay(0.1);
      document.getElementById(
        `feedback-mark-${feedbackItem}`
      ).style.left = `calc(${initialData.feedback[feedbackItem].style.left} - 15px)`;

      TweenLite.from(".feedback-wrapper", 0.2, {
        y: 1000,
      });
    }
  };
  const handleContinue = () => {
    if (feedbackItem < 3) {
      setFeedbackItem(feedbackItem + 1);
    } else {
      setAudio(initialData.afterContinueAudio);
      TweenMax.to(".slider-items", 0.5, {
        opacity: 0,
      });
      TweenMax.to(".feedback-section", 0.5, {
        opacity: 0,
      });
      TweenMax.to(".slider-people-0", 0.5, {
        display: "block",
      });
      TweenMax.to(".slider-people-0", 0.5, {
        opacity: 1,
      }).delay(0.5);
      const max0 = new TweenMax.to(".slider-people-0", 0.2, {
        opacity: 0,
      }).delay(15.5);
      maxes.push(max0);

      const max1 = new TweenMax.to(".slider-people-1", 0.2, {
        display: "block",
      }).delay(15.7);
      maxes.push(max1);

      const max2 = new TweenMax.to(".slider-people-1", 0.5, {
        opacity: 1,
      }).delay(15.9);
      maxes.push(max2);

      const max3 = new TweenMax.to(".slider-people-1", 0.5, {
        opacity: 0,
      }).delay(19.5);
      maxes.push(max3);

      const max4 = new TweenMax.to(".slider-people-2", 0.2, {
        display: "block",
      }).delay(20);
      maxes.push(max4);

      const max5 = new TweenMax.to(".slider-people-2", 0.5, {
        opacity: 1,
      }).delay(20.2);
      maxes.push(max5);
    }
  };

  const onAudioEnded = () => {
    if (audio.includes("done-click")) {
      TweenMax.to(".initial-title", 0.1, {
        opacity: 0,
      });
      TweenMax.to(".initial-title", 0.1, {
        display: "none",
      }).delay(0.2);
      TweenMax.to(".feedback-wrapper", 0.1, {
        display: "flex",
      }).delay(0.2);
      TweenMax.to(".feedback-wrapper", 0.2, {
        opacity: 1,
      }).delay(0.3);
      setFeedbackItem(0);
    }
    if (audio.includes("after-continue")) {
      maxes.forEach((max) => {
        max.kill();
      });
      TweenMax.to(".feedback-section", 0.1, {
        display: "none",
      });
      TweenMax.to(".slider-people-0", 0.1, {
        display: "none",
      });
      TweenMax.to(".slider-people-1", 0.1, {
        display: "none",
      });
      TweenMax.to(".slider-people-2", 0.1, {
        display: "none",
      });

      setAudio(initialData.selectionAudio);
      showSelectionWrapper();
    }
  };

  const showSelectionWrapper = () => {
    TweenMax.to(".slider-selection-wrapper", 0.1, {
      display: "flex",
    }).delay(0.1);
    TweenLite.from(".slider-selection-wrapper", 1, {
      x: 1100,
    }).delay(0.1);
    TweenMax.to(".slider-selection-wrapper", 0.5, {
      opacity: 1,
    }).delay(0.5);
    animations.forEach((animation) => {
      TweenMax.to(animation.id, 0.5, {
        opacity: 1,
      }).delay(animation.initialDelay - 0.5);
      const max = new TweenLite.from(animation.id, animation.duration, {
        x: 1200,
      }).delay(animation.initialDelay);
      maxes.push(max);
    });
  };

  const handleChoiceClick = (item, index) => {
    setSelectedItem(index);
    const temp = selection.items.slice();
    temp[index].selected = true;
    setSelection({ ...selection, items: [...temp] });
  };

  const showSelectionResult = () => {
    if (selectedItem > -1) {
      TweenLite.from(".selection-result-wrapper", 1, {
        x: -1000,
      });
      TweenMax.to(".selection-result-wrapper", 0.5, {
        opacity: 1,
      }).delay(0.5);
    } else {
    }
  };

  const handleResultAction = () => {
    if (!selection.items[selectedItem].isSelectionTrue) {
      TweenMax.to(".selection-result-wrapper", 0.2, {
        opacity: 0,
      });
      setTimeout(() => {
        setSelectedItem(-1);
      }, 500);
    } else {
      if (audio.includes("selection-2")) {
        handleNextSection();
      } else {
        setAudio(initialData.selection2Audio);
        setSelection(initialData.selection2);
        TweenMax.to(".selection-result-wrapper", 0.2, {
          opacity: 0,
        });
        setSelectedItem(-1);
        showSelectionWrapper();
      }
    }
  };

  const handleNextSection = () => {
    dispatch(setPageIndexRequest(pageIndex + 1));
  };

  return (
    <div
      id={initialData.id}
      className={`slider-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div className="slider-section flex w-full items-center justify-between">
        <div className={`slider-image w-5/12 mx-auto`}>
          <img
            src={initialData.image.url}
            alt={initialData.image.alt}
            className={initialData.image.classNames || ""}
          />
        </div>
        <div className="slider-items flex flex-col justify-center items-center w-7/12 md:px-4 lg:px-8 pt-4">
          {initialData.items.map((item, index) => (
            <div className="slider-item-wrapper mb-4 w-full" key={index}>
              <div className="slider-title w-full text-center text-white md:text-xl lg:text-3xl font-bold">
                {item.title}
              </div>
              <div className="slider-content flex items-center justify-between">
                <div className="left-label text-white md:text-xl lg:text-2xl md:mr-8 lg:mr-12">
                  {item.leftLabel}
                </div>
                <div className="slider-component-wrapper w-full relative">
                  <Slider min={item.min} max={item.max} />
                  <img
                    id={`feedback-mark-${index}`}
                    className={`feedback-mark-${index} absolute top-0 opacity-0 hidden`}
                    src={initialData.feedbackMarkImage}
                    alt="feedback-mark"
                    width="35px"
                    height="35px"
                  />
                </div>
                <div className="right-label text-white md:text-xl lg:text-2xl md:ml-8 lg:ml-12">
                  {item.rightLabel}
                </div>
              </div>
            </div>
          ))}
          <button
            id="slider-done-button"
            className="opacity-0 slider-done-button"
            onClick={() => handleDone()}
          >
            Done
          </button>
        </div>
      </div>
      {selection.items ? (
        <div className="absolute hidden opacity-0 bg-white slider-selection-wrapper flex-col justify-center items-left w-7/12 right-0 md:px-4 lg:px-8 md:py-4 lg:py-8 md:mt-4 lg:mt-8">
          <div
            className={`selection-title ${selection.title.classNames || ""}`}
            style={selection.title.style || {}}
          >
            {selection.title.content}
          </div>
          <div
            className={`selection-instruction pb-4 ${
              selection.instruction.classNames || ""
            }`}
            style={selection.instruction.style || {}}
          >
            {selection.instruction.content}
          </div>
          <div className="slider-selections">
            {selection.items.map((item, index) => {
              return (
                <div
                  className={`${
                    item.selected
                      ? item.isSelectionTrue
                        ? "slider-item-active"
                        : "slider-item-selected"
                      : ""
                  } slider-selection-item slider-selection-item-${index} text-center text-white p-3 md:mb-1 lg:mb-3`}
                  key={index}
                  onClick={() => handleChoiceClick(item, index)}
                  id={`choice-item-${index}`}
                >
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="opacity-0 selection-result-wrapper bg-white absolute left-0 bottom-0 w-4/12 md:p-4 lg:p-6 md:m-4 lg:m-6">
        <div className="result-title">Feedback</div>
        <div className="result-content">
          {selectedItem > -1 ? selection.items[selectedItem].feedback : ""}
        </div>
        <div className="result-action">
          <button
            id="result-action-button"
            className="result-action-button"
            onClick={() => handleResultAction()}
          >
            {selectedItem > -1
              ? selection.items[selectedItem].isSelectionTrue
                ? "Continue"
                : "Try again"
              : ""}
          </button>
        </div>
      </div>
      <div className="hidden slider-people-0 absolute lg:left-1/2 md:left-1/3 -bottom-36 lg:w-1/2 md:w-3/5 opacity-0">
        <img src={initialData.peopleImages[0]} alt="" />
      </div>
      <div className="hidden slider-people-1 absolute lg:left-1/2 md:left-1/3 -bottom-36 lg:w-1/2 md:w-3/5 opacity-0">
        <img src={initialData.peopleImages[1]} alt="" />
      </div>
      <div className="hidden slider-people-2 absolute lg:left-1/2 md:left-1/3 -bottom-36 lg:w-1/2 md:w-3/5 opacity-0">
        <img src={initialData.peopleImages[2]} alt="" />
      </div>
      <div className="feedback-section w-full h-full flex items-center justify-center">
        <div className="block initial-title text-white md:text-2xl lg:text-4xl text-center">
          {initialData.title}
        </div>
        <div className="feedback-wrapper hidden opacity-0 w-full lg:px-12 md:px-4 items-center justify-start md:py-2 lg:py-4">
          <div className="feedback-logo md:w-36 lg:w-44 md:mr-12 lg:mr-16">
            <img src={initialData.feedbackLogo} alt="feedback-logo" />
          </div>
          {feedbackItem > -1 ? (
            <div className="feedback-content w-full relative">
              <div className="feedback-title text-white md:text-2xl lg:text-4xl mb-4">
                {initialData.feedback[feedbackItem].title}
              </div>
              <div className="feedback-text md:text-xl lg:text-2xl md:p-2 lg:p-4">
                {initialData.feedback[feedbackItem].text}
              </div>
              <div className="continue-wrapper w-full flex items-center justify-end">
                <button
                  id="slider-continue-button"
                  className="slider-continue-button"
                  onClick={() => handleContinue()}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : null}
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

export default SliderActivity;
