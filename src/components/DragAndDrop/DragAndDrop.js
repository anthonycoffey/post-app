import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import "./DragAndDrop.scss";

const animations = [
  {
    id: "title",
    type: "from",
    initialDelay: 1,
    showingDelay: 1,
    duration: 1,
  },
  {
    id: "iamge",
    type: "from",
    initialDelay: 1,
    showingDelay: 1,
    duration: 1,
  },
];
const maxes = [];

const DragAndDrop = ({ data }) => {
  const { scenario } = data;
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
    dragItems.forEach((t) => {
      temp[t.category].push(
        <div
          key={t.label}
          onDragStart={(e) => onDragStart(e, t.label)}
          draggable
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

  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
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
        }
      }
      return task;
    });
    setDragItems(tasks);
    filterFunc();
  };

  const showCommonWords = () => {
    console.log('hehehe');
  }

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
        <img src={`${scenario.image}`} alt="" width="300px" height="300px" />
      </div>
      <div className="drag-drop-wrapper">
        <div className="opacity-0 drop-zones" id="drop-zones">
          <div className="drop-zone-title italic text-white mb-6">
            {scenario.instructions}
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
          {showDone ? <button className="done-button" onClick={() => showCommonWords()}>Done</button> : null}
        </div>
        <div className="opacity-0 drag-items" id="drop-items">
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
      </div>
    </div>
  );
};

export default DragAndDrop;
