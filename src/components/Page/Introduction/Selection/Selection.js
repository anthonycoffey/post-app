import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex } from "lodash";

import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../../../store/actions/status.action";

import "./Selection.scss";

const animations = [
  {
    id: ".choice-item-0",
    type: "from",
    initialDelay: 1.5,
    showingDelay: 0.5,
    duration: 0.5,
  },
  {
    id: ".choice-item-1",
    type: "from",
    initialDelay: 1.6,
    showingDelay: 0.5,
    duration: 0.5,
  },
  {
    id: ".choice-item-2",
    type: "from",
    initialDelay: 1.7,
    showingDelay: 0.5,
    duration: 0.5,
  },
  {
    id: ".choice-item-3",
    type: "from",
    initialDelay: 1.8,
    showingDelay: 0.5,
    duration: 0.5,
  },
  {
    id: ".choice-item-4",
    type: "from",
    initialDelay: 1.9,
    showingDelay: 0.5,
    duration: 0.5,
  },
];

const maxes = [];

const IntroductionSelection = ({ data }) => {
  const { scenario } = data;
  const dispatch = useDispatch();
  const { chapterIndex, pageIndex } = useSelector((state) => state.status);
  const course = useSelector((state) => state.course.course);
  const [clicked, setClicked] = useState(-1);

  useEffect(() => {
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);
  const playSequence = () => {
    TweenMax.to(".introduction-people-wrapper", 0.5, {
      opacity: 1,
    }).delay(1);
    TweenLite.from(".introduction-people-wrapper", 1.5, {
      x: -1000,
    }).delay(0.5);
    TweenMax.to(".selection-wrapper", 0.5, {
      opacity: 1,
    }).delay(1);

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

  function showVideo(index, id, duration, showingDelay) {
    if (index < 3) {
      setTimeout(() => {
        TweenMax.to(document.getElementById(id), duration, {
          opacity: 0,
        });
      }, showingDelay * 1000);
    }

    const leftItems = document.querySelectorAll(".item-answer-left");
    if (index === 2) {
      leftItems.forEach((item) => {
        item.classList.add("custom-yellow");
      });
    }
    if (index === 3) {
      leftItems.forEach((item) => {
        item.classList.remove("custom-yellow");
      });

      const rightItems = document.querySelectorAll(".item-answer-right");
      rightItems.forEach((item) => {
        item.classList.add("custom-yellow");
      });
    }

    if (index === 3) {
      TweenMax.to(document.getElementById("left-item"), 0.5, {
        opacity: 0,
      }).delay(2);
      TweenLite.to(document.getElementById("left-item"), 1, {
        x: -1000,
      }).delay(1);
      TweenMax.to(document.getElementById("right-item"), 0.5, {
        opacity: 0,
      }).delay(2);
      TweenLite.to(document.getElementById("right-item"), 1, {
        x: 1100,
      }).delay(1);
    }
  }

  const currentChapterIndex = findIndex(course.menu, ["id", chapterIndex]);
  let totalPageCount = 0;
  let totalChapterCount = 0;
  if (course && chapterIndex !== -1) {
    totalPageCount = find(course.content, ["id", chapterIndex]).pages.length;
    totalChapterCount = course.menu.length;
  }

  const handleChapterIndex = (index) => {
    if (index <= totalChapterCount - 1) {
      dispatch(setChapterIndexRequest(course.menu[index].id));
    }
    dispatch(setPageIndexRequest(0));
  };

  const handleContinue = () => {
    TweenMax.to(".introduction-people-wrapper", 0.5, {
      opacity: 0,
    });
    TweenMax.to(".introduction-second-wrapper", 0.5, {
      opacity: 1,
    });

    setTimeout(() => {
      if (pageIndex === totalPageCount - 1) {
        handleChapterIndex(currentChapterIndex + 1);
      } else {
        dispatch(setPageIndexRequest(pageIndex + 1));
      }
    }, 2000);
  };

  const handleChoiceClick = (index) => {
    const item = document.getElementById(`choice-item-${index}`);
    if (item.classList.contains("clicked")) {
      item.classList.remove("clicked");
      setClicked(clicked - 1);
    } else {
      item.classList.add("clicked");
      setClicked(clicked + 1);
    }
  };

  return (
    <div
      className={`${scenario.classNames || ""}`}
      style={scenario.style || {}}
    >
      <div
        className="opacity-0 introduction-people-wrapper absolute"
        id="people-hand-up"
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/people/rick/people-hand-up.png`}
          alt=""
        />
      </div>
      <div
        className="opacity-0 introduction-second-wrapper absolute"
        id="people-normal"
      >
        <img
          src={`${process.env.PUBLIC_URL}/assets/people/rick/people-normal.png`}
          alt=""
        />
      </div>
      <div className="opacity-0 selection-wrapper p-12 m-12 flex flex-col items-center justify-start bg-white">
        <div
          className={`selection-title ${scenario.title.classNames || ""}`}
          style={scenario.title.style || {}}
        >
          {scenario.title.content}
        </div>
        <div
          className={`selection-instruction ${
            scenario.instruction.classNames || ""
          }`}
          style={scenario.instruction.style || {}}
        >
          {scenario.instruction.content}
        </div>
        <div className="introduction-selections">
          {scenario.choiceSet.choices.map((choice, index) => {
            return (
              <div
                className={`opacity-0 choice-item choice-item-${index} text-white p-3 mb-3`}
                key={index}
                onClick={() => handleChoiceClick(index)}
                id={`choice-item-${index}`}
              >
                {choice.label}
              </div>
            );
          })}
        </div>
        {clicked > -1 ? (
          <button
            id="done-button"
            className="opacity-100 done-button"
            onClick={() => handleContinue()}
          >
            Done
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default IntroductionSelection;
