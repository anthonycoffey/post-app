import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex } from "lodash";
import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../store/actions/status.action";
import Audio from "../Page/components/Audio/Audio";
import "./ImageDragAndDrop.scss";

const maxes = [];

const ImageDragAndDrop = ({ data }) => {
  const { scenario } = data;
  const audioRef = React.createRef();
  const dispatch = useDispatch();
  const { chapterIndex, pageIndex } = useSelector((state) => state.status);
  const course = useSelector((state) => state.course.course);
  const [dragItems, setDragItems] = useState([]);
  const [dragIndex, setDragIndex] = useState(-1);
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
  }, [dragIndex]);

  const playChoiceAnimation = () => {
    if (dragIndex > -1) {
      TweenMax.to(".image-draggable", 0.1, {
        opacity: 1,
      });
      TweenLite.from(".image-draggable", 1, {
        y: 1000,
      }).delay(0.2);
      setAudio(scenario.choiceSet.choices[dragIndex].initialAudio);
    }
  };

  const playSequence = () => {
    TweenMax.to(".text-drag-drop-header", 0.5, {
      opacity: 1,
    }).delay(1);
    TweenMax.to(".drag-and-drop-title", 1, {
      opacity: 1,
    }).delay(1);
    TweenMax.to(".drag-and-drop-initial-title", 1, {
      opacity: 1,
    }).delay(1);

    setTimeout(() => {
      setAudio(scenario.initialAudio);
    }, 2000);
  };

  const onDragStart = (ev, image, index, source) => {
    ev.dataTransfer.setData("image", image);
    ev.dataTransfer.setData("source", source);
    ev.dataTransfer.setData("index", index);
    document.getElementById(index).style.opacity = 0.001;
  };

  const onDragEnd = (ev, index) => {
    // document.getElementById(index).style.opacity = 1;
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    let image = ev.dataTransfer.getData("image");
    let source = ev.dataTransfer.getData("source");
    let index = ev.dataTransfer.getData("index");
    const temp = dragItems;

    if (cat === source) {
      find(temp, ["title", cat]).isFilled = true;
      find(temp, ["title", cat]).image = image;
      setDragItems([...temp]);
      setAudio(scenario.choiceSet.choices[dragIndex].afterAudio);
    } else {
      if (document.getElementById(index)) {
        document.getElementById(index).style.opacity = 1;
      }
    }
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
    if (audio.includes("initial")) {
      TweenMax.to(".image-drag-source-wrapper", 0.1, {
        display: "flex",
      });
      TweenMax.to(".image-drag-source-wrapper", 0.1, {
        opacity: 1,
      });
      TweenLite.from(".image-drag-source-wrapper", 1, {
        y: 1000,
      });
      setDragIndex(0);
    } else {
      if (audio.includes("after")) {
        if (dragIndex < dragItems.length - 1) {
          setDragIndex(dragIndex + 1);
        } else {
          setAudio(scenario.afterAudio);

          TweenMax.to(".image-drag-source-wrapper", 0.3, {
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
      }
    }
  };
  return (
    <div
      className={`image-drag-and-drop ${scenario.classNames || ""}`}
      style={scenario.style || {}}
      id="text-drag-and-drop"
    >
      <div className="md:mt-4 lg:mt-10 grid grid-cols-4 gap-4 text-drag-drop-header opacity-0">
        {scenario.choiceSet.titles.map((item, index) => {
          return (
            <div className="drag-target" key={`drag-target-${index}`}>
              {item.title}
            </div>
          );
        })}
      </div>
      <div className="md:px-8 lg:px-16 md:mt-4 lg:mt-10 grid grid-cols-4 md:gap-8 lg:gap-16 image-drop-zones md:h-44 lg:h-52">
        {dragItems.map((item, index) => {
          return (
            <div
              className={`image-drop-zone ${item.isFilled ? "filled" : ""}`}
              key={`drop-zone-${index}`}
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, item.title)}
            >
              {item.isFilled ? (
                <div className="image-drop-zone-content">
                  <img src={item.image} alt="" />
                </div>
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
        className="opacity-0 hidden image-drag-source-wrapper absolute bottom-0 m-auto"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "wip")}
      >
        {dragIndex > -1 ? (
          <div className="opacity-0 image-draggable">
            <div
              key={`drag-source-${dragIndex}`}
              onDragStart={(e) =>
                onDragStart(
                  e,
                  scenario.choiceSet.choices[dragIndex].image,
                  `choice-${dragIndex}`,
                  scenario.choiceSet.choices[dragIndex].type
                )
              }
              onDragEnd={(e) => onDragEnd(e, `choice-${dragIndex}`)}
              draggable
              id={`choice-${dragIndex}`}
            >
              <div className="choice-image">
                <img src={scenario.choiceSet.choices[dragIndex].image} alt="" />
              </div>
            </div>
            <div className="choice-text">
              {scenario.choiceSet.choices[dragIndex].text}
            </div>
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

export default ImageDragAndDrop;
