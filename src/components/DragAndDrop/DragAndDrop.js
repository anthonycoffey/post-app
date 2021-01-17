import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex } from "lodash";
import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../store/actions/status.action";

import "./DragAndDrop.scss";

const animations = [
  {
    id: "common-choosen-title",
    type: "from",
    initialDelay: 0,
    showingDelay: 1,
    duration: 1,
  },
  {
    id: "choosen-word-0",
    type: "from",
    initialDelay: 3,
    showingDelay: 1,
    duration: 1,
  },
  {
    id: "choosen-word-1",
    type: "from",
    initialDelay: 6,
    showingDelay: 1,
    duration: 1,
  },
  {
    id: "choosen-word-2",
    type: "from",
    initialDelay: 9,
    showingDelay: 1,
    duration: 1,
  },
  {
    id: "choosen-word-3",
    type: "from",
    initialDelay: 12,
    showingDelay: 1,
    duration: 1,
  },
  {
    id: "choosen-word-4",
    type: "from",
    initialDelay: 15,
    showingDelay: 1,
    duration: 1,
  },
];
const maxes = [];

const DragAndDrop = ({ data }) => {
  const { scenario } = data;
  const dispatch = useDispatch();
  const { chapterIndex, pageIndex } = useSelector((state) => state.status);
  const course = useSelector((state) => state.course.course);
  const [dragItems, setDragItems] = useState([]);
  const [showDone, setShowDone] = useState(false);
  const [final, setFinal] = useState({
    wip: [],
    first: [],
    second: [],
    third: [],
    firth: [],
    fifth: [],
  });
  useEffect(() => {
    setDragItems(scenario.choiceSet.choices);
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);
  useEffect(() => {
    filterFunc();
  }, [dragItems]);

  const filterFunc = () => {
    const temp = {
      wip: [],
      first: [],
      second: [],
      third: [],
      firth: [],
      fifth: [],
    };
    dragItems.forEach((t, index) => {
      temp[t.category].push(
        <div
          key={t.label}
          onDragStart={(e) => onDragStart(e, t.label, index)}
          onDragEnd={(e) => onDragEnd(e, t.label, index)}
          draggable
          id={`choice-${index}`}
          className="draggable"
        >
          {t.label}
        </div>
      );
    });
    if (
      temp.first.length > 0 &&
      temp.second.length > 0 &&
      temp.third.length > 0 &&
      temp.firth.length > 0 &&
      temp.fifth.length > 0
    ) {
      setShowDone(true);
    } else {
      setShowDone(false);
    }
    setFinal(temp);
  };

  const playSequence = () => {
    const titleAnimation = new TweenMax.to(
      document.getElementById("title"),
      1,
      {
        opacity: 1,
      }
    );
    const imageAnimation = new TweenMax.to(
      document.getElementById("image"),
      1,
      {
        opacity: 1,
        onComplete: showDragItems,
        onCompleteParams: ["image", 1, 3],
      }
    );
    maxes.push(titleAnimation, imageAnimation);
  };

  function showDragItems(id, duration, showingDelay) {
    setTimeout(() => {
      TweenMax.to(document.getElementById(id), duration, {
        opacity: 0,
      });
      TweenMax.to(document.getElementById(id), duration, {
        display: "none",
      }).delay(1);

      TweenMax.to(document.getElementById("drop-zones"), duration, {
        opacity: 1,
      }).delay(2);
      TweenLite.from(document.getElementById("drop-zones"), 3, {
        x: -1000,
      });
      TweenMax.to(document.getElementById("drop-items"), duration, {
        opacity: 1,
      }).delay(2);
      TweenLite.from(document.getElementById("drop-items"), 3, {
        x: 1100,
      });
    }, showingDelay * 1000);
  }

  const onDragStart = (ev, id, index) => {
    ev.dataTransfer.setData("id", id);
    document.getElementById(`choice-${index}`).style.opacity = 0.001;
    document.getElementById(`choice-${index}`).style.color = 'black';
  };

  const onDragEnd = (ev, id, index) => {
    // ev.dataTransfer.setData("id", id);
    document.getElementById(`choice-${index}`).style.opacity = 1;
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = dragItems.filter((task) => {
      if (cat === "wip") {
        if (task.label === id) {
          task.category = cat;
        }
      } else {
        if (final[cat].length < 1) {
          if (task.label === id) {
            task.category = cat;
          }
        } else {
          if (task.label === id) {
            task.category = cat;
          } else {
            if (task.category === cat) {
              task.category = 'wip';
            }
          }
        }
      }
      return task;
    });
    setDragItems(tasks);
    filterFunc();
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

  const showCommonWords = () => {
    TweenMax.to(document.getElementById("drop-zone-title"), 1, {
      opacity: 0,
    });
    TweenMax.to(document.getElementById("drop-zone-title"), 1, {
      display: "none",
    });
    TweenMax.to(document.getElementById("drop-zone-extra-title"), 1, {
      display: "block",
    }).delay(1);
    TweenMax.to(document.getElementById("drop-zone-extra-title"), 1, {
      opacity: 1,
    }).delay(1);
    TweenMax.to(document.getElementById("drop-items"), 1, {
      opacity: 0,
    });
    TweenMax.to(document.getElementById("drop-items"), 1, {
      display: "none",
    });
    TweenMax.to(document.getElementById("choosen-words"), 1, {
      display: "flex",
    }).delay(1);
    TweenMax.to(document.getElementById("choosen-words"), 1, {
      opacity: 1,
    }).delay(1);

    TweenMax.to(document.getElementById("done-button"), 1, {
      opacity: 0,
    });

    animations.forEach((animation) => {
      TweenMax.to(document.getElementById(animation.id), animation.duration, {
        opacity: 1,
      }).delay(animation.initialDelay);
      TweenLite.from(
        document.getElementById(animation.id),
        animation.duration,
        {
          x: 1100,
        }
      ).delay(animation.initialDelay);
    });
    TweenMax.to(document.getElementById("continue-button"), 1, {
      opacity: 1,
    }).delay(18);
  };

  return (
    <div
      className={`drag-and-drop ${scenario.classNames || ""}`}
      style={scenario.style || {}}
    >
      <div
        className={scenario.title.classNames || ""}
        style={scenario.title.style || {}}
        id="title"
      >
        {scenario.title.content}
      </div>
      <div id="image" className="block opacity-0">
        <img
          className={scenario.image.classNames || ""}
          src={`${scenario.image.url}`}
          alt=""
        />
      </div>
      <div className="drag-drop-wrapper">
        <div className="opacity-0 block drop-zones" id="drop-zones">
          <div
            className="opacity-100 drop-zone-title italic text-white mb-6"
            id="drop-zone-title"
          >
            {scenario.instructions}
          </div>
          <div
            className="hidden opacity-0 drop-zone-extra-title text-white mb-6"
            id="drop-zone-extra-title"
          >
            YOUR WORDS
          </div>
          <div className="drop-zone-items">
            <div
              className="droppable"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "first")}
            >
              {final.first}
            </div>
            <div
              className="droppable"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "second")}
            >
              {final.second}
            </div>
            <div
              className="droppable"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "third")}
            >
              {final.third}
            </div>
            <div
              className="droppable"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "firth")}
            >
              {final.firth}
            </div>
            <div
              className="droppable"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "fifth")}
            >
              {final.fifth}
            </div>
          </div>
          {showDone ? (
            <button
              id="done-button"
              className="opacity-100 done-button"
              onClick={() => showCommonWords()}
            >
              Done
            </button>
          ) : null}
        </div>
        <div className="opacity-0 block drag-items" id="drop-items">
          <div
            className="wip grid grid-cols-2 gap-4"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => {
              onDrop(e, "wip");
            }}
          >
            {final.wip}
          </div>
        </div>
        <div
          className="hidden opacity-0 choosen-words flex-col items-center content-center"
          id="choosen-words"
        >
          <div
            className="opacity-0 common-choosen-title uppercase pb-3 mb-3"
            id="common-choosen-title"
          >
            {scenario.choiceSet.feedback.title}
          </div>
          <div className="choosen-words">
            {scenario.choiceSet.feedback.items.map((item, index) => {
              return (
                <div
                  className={`opacity-0 choosen-word choosen-word-${index}`}
                  id={`choosen-word-${index}`}
                  key={index}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div id="continue-button" className="opacity-0 continue">
        <button className="continue-button" onClick={() => handleContinue()}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default DragAndDrop;
