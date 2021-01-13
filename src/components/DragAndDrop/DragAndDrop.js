import React, { useEffect } from "react";
import { TweenMax } from "gsap";
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
  useEffect(() => {
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, []);
  const playSequence = () => {
    const titleAnimation = new TweenMax.to(document.getElementById('title'), 1, {
      opacity: 1,
    });
    const imageAnimation = new TweenMax.to(document.getElementById('image'), 1, {
      opacity: 1,
      onComplete: showDragItems,
        onCompleteParams: [
          'image',
          1,
          3,
        ],
    });
    maxes.push(titleAnimation, imageAnimation);
  };

  function showDragItems(id, duration, showingDelay) {
    setTimeout(() => {
      TweenMax.to(document.getElementById(id), duration, {
        opacity: 0,
      });
    }, showingDelay * 1000);
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
      <div id="image" className="opacity-0">
        <img src={`${scenario.image}`} alt="" width="300px" height="300px" />
      </div>
    </div>
  );
};

export default DragAndDrop;
