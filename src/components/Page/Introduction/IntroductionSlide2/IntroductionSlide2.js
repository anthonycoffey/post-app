import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex } from "lodash";
import renderHTML from "react-render-html";

import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../../../store/actions/status.action";

import "./IntroductionSlide2.scss";

const animations_part1 = [
  {
    id: ".cant-breathe",
    initialDelay: 1,
    showingDelay: 3,
    duration: 2,
  },
  {
    id: ".killing-us",
    initialDelay: 6,
    showingDelay: 3,
    duration: 2,
  },
  {
    id: ".had-enough",
    initialDelay: 11,
    showingDelay: 3,
    duration: 2,
  },
];

const animations_part2 = [
  {
    id: ".initial-1",
    initialDelay: 32,
    showingDelay: 3,
    duration: 2,
  },
  {
    id: ".initial-2",
    initialDelay: 37,
    showingDelay: 3,
    duration: 2,
  },
  {
    id: ".initial-3",
    initialDelay: 42,
    showingDelay: 3,
    duration: 2,
  },
];

const animations_part2_result = [
  {
    id: ".initial-1",
    type: 'hide',
    initialDelay: 52,
  },
  {
    id: ".result-1",
    initialDelay: 52,
    type: 'show',
  },
  {
    id: ".initial-2",
    type: 'hide',
    initialDelay: 54,
  },
  {
    id: ".result-2",
    initialDelay: 54,
    type: 'show',
  },
  {
    id: ".initial-3",
    type: 'hide',
    initialDelay: 56,
  },
  {
    id: ".result-3",
    initialDelay: 56,
    type: 'show',
  },
];

const maxes = [];

const IntroductionSlide2 = ({ data }) => {
  const { items } = data;
  const part1 = items.slice(0, 3);
  const initials = items.slice(5, 8);
  const results = items.slice(8, 11);
  const dispatch = useDispatch();
  const { chapterIndex, pageIndex } = useSelector((state) => state.status);
  const course = useSelector((state) => state.course.course);
  useEffect(() => {
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);
  const playSequence = () => {
    animations_part1.forEach((animation, index) => {
      const max = new TweenMax.to(animation.id, animation.duration, {
        opacity: 1,
      }).delay(animation.initialDelay);
      maxes.push(max);
    });

    TweenMax.to(".part-1", 1, {
      opacity: 0,
    }).delay(20);
    TweenMax.to(".part-2", 1, {
      opacity: 1,
    }).delay(22);

    TweenMax.to(".part-2-person", 0.5, {
      opacity: 1,
    }).delay(22);
    TweenLite.from(".part-2-person", 1, {
      x: -5500,
    }).delay(24);
    TweenMax.to(".part-2-right-items", 0.5, {
      opacity: 1,
    }).delay(25);
    TweenLite.from(".part-2-right-items", 1, {
      x: 1100,
    }).delay(27);

    TweenMax.to(".part-2-person", 0.5, {
      opacity: 0,
    }).delay(30);
    TweenLite.to(".part-2-person", 1, {
      x: -5500,
    }).delay(31);

    animations_part2.forEach((animation, index) => {
      const max = new TweenMax.to(animation.id, animation.duration, {
        opacity: 1,
      }).delay(animation.initialDelay);
      maxes.push(max);
    });

    TweenLite.to(".part-2-right-item-answers-1", 1, {
      x: 1100,
    }).delay(48);
    TweenMax.to(".part-2-right-item-answers-1", 0.5, {
      display: "none",
    }).delay(49);
    TweenMax.to(".part-2-right-item-answers-2", 0.5, {
      display: "block",
    }).delay(50);
    TweenMax.to(".part-2-right-item-answers-2", 0.5, {
      opacity: 1,
    }).delay(50);
    TweenLite.from(".part-2-right-item-answers-2", 1, {
      x: 1100,
    }).delay(51);

    animations_part2_result.forEach((animation, index) => {
      if (animation.type === 'hide') {
        const max = new TweenMax.to(animation.id, 0.5, {
          opacity: 0,
        }).delay(animation.initialDelay);
        maxes.push(max);
      } else {
        const max = new TweenMax.to(animation.id, 0.5, {
          opacity: 1,
        }).delay(animation.initialDelay);
        maxes.push(max);
      }
    });
  };

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
    if (pageIndex === totalPageCount - 1) {
      handleChapterIndex(currentChapterIndex + 1);
    } else {
      dispatch(setPageIndexRequest(pageIndex + 1));
    }
  };

  return (
    <div className={`${data.classNames || ""}`} style={data.style || {}}>
      <div className="part-1 opacity-100 absolute">
        {part1.map((item, index) => {
          return (
            <div
              className={`image-wrapper absolute opacity-0 ${
                item.classNames || ""
              }`}
              id={item.classNames}
              style={item.image.style || {}}
              key={`part1-${index}`}
            >
              <img src={`${item.image.url}`} alt="" />
            </div>
          );
        })}
      </div>
      <div className="part-2 opacity-0 absolute">
        <div className="opacity-0 part-2-person absolute mb-6">
          <img
            src={`${process.env.PUBLIC_URL}/assets/people/rick/people-normal.png`}
            alt=""
          />
        </div>
        <div
          className={`opacity-0 part-2-right-items absolute ${
            items[1].classNames || ""
          }`}
        >
          <img
            src={`${items[4].image.url}`}
            alt=""
            style={items[4].image.style || {}}
          />
          <div className="part-2-right-item-title">
            {renderHTML(items[4].title)}
          </div>
          <div className="block opacity-100 part-2-right-item-answers-1">
            {items[4].answers_1.map((answer, index) => {
              return (
                <div
                  className="part-2-right-item-answer part-2-right-item-answer-1-right"
                  key={`part-2-right-item-answer-1-${index}`}
                >
                  {answer}
                </div>
              );
            })}
          </div>
          <div className="hidden opacity-0 part-2-right-item-answers-2">
            {items[4].answers_2.map((answer, index) => {
              return (
                <div
                  className="part-2-right-item-answer part-2-right-item-answer-2-right"
                  key={`part-2-right-item-answer-2-${index}`}
                >
                  {answer}
                </div>
              );
            })}
          </div>
        </div>
        {initials.map((initial, index) => {
          return (
            <div
              className={`image-wrapper absolute opacity-0 ${
                initial.classNames || ""
              }`}
              id={initial.classNames}
              style={initial.image.style || {}}
              key={`part2-initial-${index}`}
            >
              <img src={`${initial.image.url}`} alt="" />
            </div>
          );
        })}
        {results.map((result, index) => {
          return (
            <div
              className={`image-wrapper absolute opacity-0 ${
                result.classNames || ""
              }`}
              id={result.classNames}
              style={result.image.style || {}}
              key={`part2-result-${index}`}
            >
              <img src={`${result.image.url}`} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IntroductionSlide2;
