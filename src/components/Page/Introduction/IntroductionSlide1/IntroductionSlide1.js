import React, { useEffect } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex } from "lodash";
import renderHTML from "react-render-html";
import Audio from "../../components/Audio/Audio";

import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../../../store/actions/status.action";

import "./IntroductionSlide1.scss";

const animations = [
  {
    id: "people-normal",
    type: "from",
    initialDelay: 1,
    showingDelay: 1,
    duration: 1,
  },
  {
    id: "people-no-idea",
    type: "from",
    initialDelay: 3,
    showingDelay: 2,
    duration: 1,
  },
  {
    id: "people-after-closed",
    type: "from",
    initialDelay: 6,
    showingDelay: 4,
    duration: 1,
  },
  {
    id: "people-hand-up",
    type: "from",
    initialDelay: 11,
    showingDelay: 9,
    duration: 1,
  },
];

const maxes = [];

const IntroductionSlide1 = ({ data }) => {
  const { items } = data;
  const dispatch = useDispatch();
  const audioRef = React.createRef();
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
    TweenLite.from(document.getElementById("left-item"), 1.5, {
      x: -1000,
    }).delay(1);
    TweenMax.to(document.getElementById("right-item"), 0.5, {
      opacity: 1,
    }).delay(2);
    TweenLite.from(document.getElementById("right-item"), 1.5, {
      x: 1100,
    }).delay(1);

    animations.forEach((animation, index) => {
      const max = new TweenMax.to(
        document.getElementById(animation.id),
        animation.duration,
        {
          opacity: 1,
          onComplete: showVideo,
          onCompleteParams: [
            index,
            animation.id,
            animation.duration,
            animation.showingDelay,
          ],
        }
      ).delay(animation.initialDelay);
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

  const onEnded = () => {
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
    setTimeout(() => {
      handleContinue();
    }, 3000);
  };

  return (
    <div className={`${data.classNames || ""}`} style={data.style || {}}>
      <Audio data={data.audio} ref={audioRef} onEnded={onEnded} />
      <div
        className={`introduction-item opacity-0 ${items[0].classNames || ""}`}
        id="left-item"
      >
        <div className="item-header">
          <img
            src={`${items[0].image.url}`}
            alt=""
            style={items[0].image.style || {}}
          />
          <div className="item-title">{renderHTML(items[0].title)}</div>
        </div>
        <div className="item-answers">
          {items[0].answers.map((answer, index) => {
            return (
              <div
                className="item-answer item-answer-left"
                key={index}
                id="item-answer-left"
              >
                {answer}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`introduction-item opacity-0 ${items[1].classNames || ""}`}
        id="right-item"
      >
        <div className="item-header">
          <img
            src={`${items[1].image.url}`}
            alt=""
            style={items[1].image.style || {}}
          />
          <div className="item-title">{renderHTML(items[1].title)}</div>
        </div>
        <div className="item-answers">
          {items[1].answers.map((answer, index) => {
            return (
              <div className="item-answer item-answer-right" key={index}>
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
