import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex } from "lodash";
import renderHTML from "react-render-html";

import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../../../store/actions/status.action";

import "./IntroductionSlide1.scss";

const animations = [
  {
    id: "people-normal",
    type: "from",
    initialDelay: 0,
    showingDelay: 3,
    duration: 1,
  },
  {
    id: "people-no-idea",
    type: "from",
    initialDelay: 4,
    showingDelay: 3,
    duration: 1,
  },
  {
    id: "people-after-closed",
    type: "from",
    initialDelay: 8,
    showingDelay: 3,
    duration: 1,
  },
  {
    id: "people-hand-up",
    type: "from",
    initialDelay: 12,
    showingDelay: 3,
    duration: 1,
  },
];

const maxes = [];

const IntroductionSlide1 = ({ data }) => {
  const { items } = data;
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
    TweenMax.to(document.getElementById("left-item"), 0.5, {
      opacity: 1,
    }).delay(2);
    TweenLite.from(document.getElementById("left-item"), 1, {
      x: -1000,
    });
    TweenMax.to(document.getElementById("right-item"), 0.5, {
      opacity: 1,
    }).delay(2);
    TweenLite.from(document.getElementById("right-item"), 1, {
      x: 1100,
    });
    // TweenMax.to(document.getElementById("people-normal"), 1, {
    //   opacity: 1,
    // });

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
    if (index !== animations.legnth - 1) {
      setTimeout(() => {
        TweenMax.to(document.getElementById(id), duration, {
          opacity: 0,
        });
      }, showingDelay * 1000);
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
    if (pageIndex === totalPageCount - 1) {
      handleChapterIndex(currentChapterIndex + 1);
    } else {
      dispatch(setPageIndexRequest(pageIndex + 1));
    }
  };

  return (
    <div className={`${data.classNames || ""}`} style={data.style || {}}>
      <div className={`opacity-0 ${items[0].classNames || ""}`} id="left-item">
        <img
          src={`${items[0].image.url}`}
          alt=""
          style={items[0].image.style || {}}
        />
        <div className="item-title">{renderHTML(items[0].title)}</div>
        <div className="item-answers">
          {items[0].answers.map((answer, index) => {
            return (
              <div className="item-answer" key={index}>
                {answer}
              </div>
            );
          })}
        </div>
      </div>
      <div className={`opacity-0 ${items[1].classNames || ""}`} id="right-item">
        <img
          src={`${items[1].image.url}`}
          alt=""
          style={items[1].image.style || {}}
        />
        <div className="item-title">{renderHTML(items[1].title)}</div>
        <div className="item-answers">
          {items[1].answers.map((answer, index) => {
            return (
              <div className="item-answer" key={index}>
                {answer}
              </div>
            );
          })}
        </div>
      </div>
      <div className="persons-wrapper absolute flex justify-center items-center">
        <div
          className="opacity-0 people-wrapper people-normal"
          id="people-normal"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/people/rick/people-normal.png`}
            alt=""
          />
        </div>
        <div
          className="opacity-0 people-wrapper absolute people-no-idea"
          id="people-no-idea"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/people/rick/people-no-idea.png`}
            alt=""
          />
        </div>
        <div
          className="opacity-0 people-wrapper absolute people-after-closed"
          id="people-after-closed"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/people/rick/people-after-closed.png`}
            alt=""
          />
        </div>
        <div
          className="opacity-0 people-wrapper absolute people-hand-up"
          id="people-hand-up"
        >
          <img
            src={`${process.env.PUBLIC_URL}/assets/people/rick/people-hand-up.png`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default IntroductionSlide1;
