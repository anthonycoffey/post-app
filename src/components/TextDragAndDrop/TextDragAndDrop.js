import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex } from "lodash";
import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../store/actions/status.action";
import Audio from "../Audio/Audio";
import "./TextDragAndDrop.scss";

const maxes = [];

const TextDragAndDrop = ({ data }) => {
  const { scenario } = data;
  const audioRef = React.createRef();
  const dispatch = useDispatch();
  const { chapterIndex, pageIndex } = useSelector((state) => state.status);
  const course = useSelector((state) => state.course.course);
  const [dragItems, setDragItems] = useState([]);
  const [showDone, setShowDone] = useState(false);
  const [dragIndex, setDragIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [audio, setAudio] = useState("");

  useEffect(() => {
    setDragItems(scenario.choiceSet.titles);
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  useEffect(() => {
    playChoiceAnimation();
  }, [hidden]);

  const showDoneButton = () => {
    setShowDone(false);
  };

  const playChoiceAnimation = () => {
    if (dragIndex !== 0) {
      TweenMax.to(".draggable", 0.1, {
        opacity: 1,
      });
      TweenLite.from(".draggable", 1, {
        y: 1000,
      }).delay(0.2);
    }
  };

  const playSequence = () => {
    TweenLite.to(".text-drag-people-normal", 1, {
      x: -1000,
    }).delay(1);
    TweenMax.to(".text-drag-people-normal", 0.1, {
      opacity: 0,
    }).delay(1.1);
    TweenMax.to(".text-drag-drop-header", 0.5, {
      opacity: 1,
    }).delay(1);

    if (window.innerWidth > 1024) {
      TweenMax.to(".text-drop-zones", 1, {
        height: 200,
      }).delay(3);
    } else {
      TweenMax.to(".text-drop-zones", 1, {
        height: 120,
      }).delay(3);
    }

    setTimeout(() => {
      if (document.getElementById("text-drag-and-drop")) {
        document.getElementById("text-drag-and-drop").style.backgroundImage =
          "url(/assets/background/gray-background.jpg)";
      }
    }, 3000);

    TweenMax.to(".drag-source-wrapper", 0.1, {
      display: "flex",
    }).delay(4);
    TweenMax.to(".drag-source-wrapper", 0.1, {
      opacity: 1,
    }).delay(4);
    TweenLite.from(".drag-source-wrapper", 1, {
      y: 1000,
    }).delay(4);
    TweenMax.to(".drag-and-drop-title", 1, {
      opacity: 1,
    }).delay(6);
    TweenMax.to(".drag-and-drop-initial-title", 1, {
      opacity: 1,
    }).delay(6);

    setTimeout(() => {
      TweenMax.to(".draggable", 0.1, {
        opacity: 1,
      });
      TweenLite.from(".draggable", 1, {
        y: 1000,
      }).delay(0.2);
      setAudio(scenario.initialAudio);
    }, 5000);
  };

  const onDragStart = (ev, id, index, source) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("source", source);
    document.getElementById(index).style.opacity = 0.001;
  };

  const onDragEnd = (ev, index) => {
    document.getElementById(index).style.opacity = 1;
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let source = ev.dataTransfer.getData("source");
    const temp = dragItems;

    if (cat === source) {
      find(temp, ["title", cat]).isFilled = true;
      find(temp, ["title", cat]).label = id;
      setDragItems([...temp]);
      setHidden(true);
      if (dragIndex < dragItems.length) {
        setDragIndex(dragIndex + 1);
        setAudio(find(scenario.choiceSet.choices, ["type", cat]).audio);
      }
    }

    showDoneButton();
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

  const onAudioEnded = () => {
    if (dragIndex < dragItems.length) {
      setHidden(false);
    } else {
      setHidden(true);
      TweenMax.to(".drag-source-wrapper", 0.3, {
        opacity: 0,
      });
      TweenMax.to(".drag-and-drop-initial-title", 0.3, {
        opacity: 0,
      });
      TweenMax.to(".drag-and-drop-initial-title", 0.3, {
        display: "none",
      }).delay(0.3);

      TweenMax.to(".drag-and-drop-finish-title", 0.3, {
        position: "relative",
      }).delay(0.6);
      TweenMax.to(".drag-and-drop-finish-title", 0.3, {
        opacity: 1,
      }).delay(0.9);

      TweenMax.to(".done-button", 0.3, {
        opacity: 1,
      });
      TweenMax.to(".done-button", 0.3, {
        display: "block",
      });
    }
  };

  return (
    <div
      className={`text-drag-and-drop ${scenario.classNames || ""}`}
      style={scenario.style || {}}
      id="text-drag-and-drop"
    >
      <div className={`opacity-100 ${scenario.image.classNames || ""}`}>
        <img src={`${scenario.image.url}`} alt="" />
      </div>
      <div className="md:mt-4 lg:mt-10 grid grid-cols-4 gap-4 text-drag-drop-header opacity-0">
        {scenario.choiceSet.titles.map((item, index) => {
          return (
            <div className="drag-target" key={`drag-target-${index}`}>
              {item.title}
            </div>
          );
        })}
      </div>
      <div className="md:px-2 lg:px-4 md:mt-4 lg:mt-10 grid grid-cols-4 gap-4 text-drop-zones h-0">
        {dragItems.map((item, index) => {
          return (
            <div
              className={`text-drop-zone ${item.isFilled ? "filled" : ""}`}
              key={`drop-zone-${index}`}
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, item.title)}
            >
              {item.isFilled ? (
                <div className="text-drop-zone-content">{item.label}</div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <div className="drag-and-drop-title opacity-0">
        <div
          className={`drag-and-drop-initial-title ${
            scenario.title.classNames || ""
          }`}
          style={scenario.title.style || {}}
        >
          {scenario.title.content}
        </div>
        <div
          className={`drag-and-drop-finish-title ${
            scenario.title.classNames || ""
          }`}
          style={scenario.title.style || {}}
        >
          Click DONE to move on.
        </div>
      </div>
      <div
        className="opacity-0 hidden drag-source-wrapper absolute bottom-0 m-auto"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "wip")}
      >
        {dragIndex > -1 && !hidden ? (
          <div
            key={`drag-source-${dragIndex}`}
            onDragStart={(e) =>
              onDragStart(
                e,
                scenario.choiceSet.choices[dragIndex].label,
                `choice-${dragIndex}`,
                scenario.choiceSet.choices[dragIndex].type
              )
            }
            onDragEnd={(e) => onDragEnd(e, `choice-${dragIndex}`)}
            draggable
            id={`choice-${dragIndex}`}
            className="opacity-0 draggable"
          >
            {scenario.choiceSet.choices[dragIndex].label}
          </div>
        ) : null}
      </div>
      <button
        id="done-button"
        className="hidden opacity-0 done-button absolute"
        onClick={() => handleContinue()}
      >
        Done
      </button>
      <Audio
        data={{
          ...scenario.audio,
          url: audio,
        }}
        ref={audioRef}
        onEnded={onAudioEnded}
      />
    </div>
  );
};

export default TextDragAndDrop;
