import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex, toSafeInteger } from "lodash";
import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../store/actions/status.action";
import Audio from "../Audio/Audio";
import "./DragAndDrop.scss";

const animations_scenario1 = [
  {
    id: "common-choosen-title",
    type: "from",
    initialDelay: 4,
    showingDelay: 1,
    duration: 1,
  },
  {
    id: "choosen-word-0",
    type: "from",
    initialDelay: 9,
    showingDelay: 1,
    duration: 0.5,
  },
  {
    id: "choosen-word-1",
    type: "from",
    initialDelay: 10,
    showingDelay: 1,
    duration: 0.5,
  },
  {
    id: "choosen-word-2",
    type: "from",
    initialDelay: 11,
    showingDelay: 1,
    duration: 0.5,
  },
  {
    id: "choosen-word-3",
    type: "from",
    initialDelay: 11.5,
    showingDelay: 1,
    duration: 0.5,
  },
  {
    id: "choosen-word-4",
    type: "from",
    initialDelay: 12,
    showingDelay: 1,
    duration: 0.5,
  },
];

const animations_scenario2 = [
  {
    id: "common-choosen-title",
    type: "from",
    initialDelay: 11,
    showingDelay: 1,
    duration: 1,
  },
  {
    id: "choosen-word-0",
    type: "from",
    initialDelay: 14,
    showingDelay: 1,
    duration: 0.5,
  },
  {
    id: "choosen-word-1",
    type: "from",
    initialDelay: 14.8,
    showingDelay: 1,
    duration: 0.5,
  },
  {
    id: "choosen-word-2",
    type: "from",
    initialDelay: 15.5,
    showingDelay: 1,
    duration: 0.5,
  },
  {
    id: "choosen-word-3",
    type: "from",
    initialDelay: 16.5,
    showingDelay: 1,
    duration: 0.5,
  },
  {
    id: "choosen-word-4",
    type: "from",
    initialDelay: 17.5,
    showingDelay: 1,
    duration: 0.5,
  },
];
const maxes = [];

const DragAndDrop = ({ data }) => {
  const { scenario } = data;
  const audioRef = React.createRef();
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
      temp.wip.push({ label: t.label });
    });
    setFinal(temp);
  };

  const showDoneButton = () => {
    if (
      final.first.length > 0 &&
      final.second.length > 0 &&
      final.third.length > 0 &&
      final.firth.length > 0 &&
      final.fifth.length > 0
    ) {
      setShowDone(true);
    } else {
      setShowDone(false);
    }
  };

  const playSequence = () => {
    const titleAnimation = new TweenMax.to(
      document.getElementById("title"),
      1,
      {
        opacity: 1,
      }
    ).delay(1);
    const showingDelay = scenario.id === "scenario-01" ? 2 : 5;
    const imageAnimation = new TweenMax.to(
      document.getElementById("image"),
      1,
      {
        opacity: 1,
        onComplete: showDragItems,
        onCompleteParams: ["image", 1, showingDelay],
      }
    ).delay(1);
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

  const onDragStart = (ev, id, index, source) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("source", source);
    document.getElementById(index).style.opacity = 0.001;
    // if (source === 'wip') {
    //   document.getElementById(index).style.color = "black";
    // }
  };

  const onDragEnd = (ev, id, index, source) => {
    document.getElementById(index).style.opacity = 1;
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let source = ev.dataTransfer.getData("source");
    const temp = final;
    if (cat === source) {
      return;
    }
    if (cat === "wip") {
      const sourceLabel = temp[source][0].label;
      const targetIndex = findIndex(temp.wip, ["label", id]);
      temp.wip[targetIndex].label = sourceLabel;
      temp.wip[targetIndex].isEmpty = false;
      temp.wip[targetIndex].isWhite = true;
      temp[source] = [];
    } else {
      if (temp[cat].length < 1) {
        const sourceIndex = findIndex(temp.wip, ["label", id]);
        temp.wip[sourceIndex].isEmpty = true;
        temp[cat].push({
          label: id,
        });
      } else {
        const sourceIndex = findIndex(temp.wip, ["label", id]);
        temp.wip[sourceIndex].isEmpty = true;
        const targetLabel = temp[cat][0].label;
        temp[cat][0].label = id;
        const targetIndex = findIndex(temp.wip, ["label", targetLabel]);
        temp.wip[targetIndex].isEmpty = false;
      }
    }

    setFinal({ ...temp });
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

  const showCommonWords = () => {
    if (scenario.id === "scenario-01") {
      audioRef.current.audio.current.src =
        "/assets/audio/introduction/drag-drop-2.mp3";
    } else {
      audioRef.current.audio.current.src =
        "/assets/audio/introduction/drag-drop-4.mp3";
    }

    TweenMax.to(document.getElementById("drop-zone-title"), 0.5, {
      opacity: 0,
    });
    TweenMax.to(document.getElementById("drop-zone-title"), 0.5, {
      display: "none",
    });
    TweenMax.to(document.getElementById("drop-zone-extra-title"), 0.5, {
      display: "block",
    }).delay(0.5);
    TweenMax.to(document.getElementById("drop-zone-extra-title"), 0.5, {
      opacity: 1,
    }).delay(0.5);
    TweenMax.to(document.getElementById("drop-items"), 1, {
      opacity: 0,
    });
    TweenMax.to(document.getElementById("drop-items"), 1, {
      display: "none",
    }).delay(1);
    TweenMax.to(document.getElementById("choosen-words"), 1, {
      display: "flex",
    }).delay(2);
    TweenMax.to(document.getElementById("choosen-words"), 1, {
      opacity: 1,
    }).delay(4);

    TweenMax.to(document.getElementById("done-button"), 1, {
      opacity: 0,
    });
    TweenMax.to(document.getElementById("done-button"), 1, {
      display: "none",
    });

    const animations =
      scenario.id === "scenario-01"
        ? animations_scenario1
        : animations_scenario2;

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
    }).delay(20);
  };

  return (
    <div
      className={`drag-and-drop ${scenario.classNames || ""}`}
      style={scenario.style || {}}
    >
      <Audio data={scenario.audio} ref={audioRef} />
      <div
        className={`font-serif ${scenario.title.classNames || ""}`}
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
            className="font-serif hidden opacity-0 drop-zone-extra-title text-white mb-6"
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
              {final.first.length > 0
                ? final.first.map((item, index) => {
                    return (
                      <div
                        key={`choice-first-${index}-${item.label}`}
                        onDragStart={(e) =>
                          onDragStart(
                            e,
                            item.label,
                            `choice-first-${index}`,
                            "first"
                          )
                        }
                        onDragEnd={(e) =>
                          onDragEnd(
                            e,
                            item.label,
                            `choice-first-${index}`,
                            "first"
                          )
                        }
                        draggable
                        id={`choice-first-${index}`}
                        className="draggable"
                      >
                        {item.label}
                      </div>
                    );
                  })
                : null}
            </div>
            <div
              className="droppable"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "second")}
            >
              {final.second.length > 0
                ? final.second.map((item, index) => {
                    return (
                      <div
                        key={`choice-second-${index}`}
                        onDragStart={(e) =>
                          onDragStart(
                            e,
                            item.label,
                            `choice-second-${index}`,
                            "second"
                          )
                        }
                        onDragEnd={(e) =>
                          onDragEnd(e, item.label, `choice-second-${index}`)
                        }
                        draggable
                        id={`choice-second-${index}`}
                        className="draggable"
                      >
                        {item.label}
                      </div>
                    );
                  })
                : null}
            </div>
            <div
              className="droppable"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "third")}
            >
              {final.third.length > 0
                ? final.third.map((item, index) => {
                    return (
                      <div
                        key={`choice-third-${index}`}
                        onDragStart={(e) =>
                          onDragStart(
                            e,
                            item.label,
                            `choice-third-${index}`,
                            "third"
                          )
                        }
                        onDragEnd={(e) =>
                          onDragEnd(e, item.label, `choice-third-${index}`)
                        }
                        draggable
                        id={`choice-third-${index}`}
                        className="draggable"
                      >
                        {item.label}
                      </div>
                    );
                  })
                : null}
            </div>
            <div
              className="droppable"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "firth")}
            >
              {final.firth.length > 0
                ? final.firth.map((item, index) => {
                    return (
                      <div
                        key={`choice-firth-${index}`}
                        onDragStart={(e) =>
                          onDragStart(
                            e,
                            item.label,
                            `choice-firth-${index}`,
                            "firth"
                          )
                        }
                        onDragEnd={(e) =>
                          onDragEnd(e, item.label, `choice-firth-${index}`)
                        }
                        draggable
                        id={`choice-firth-${index}`}
                        className="draggable"
                      >
                        {item.label}
                      </div>
                    );
                  })
                : null}
            </div>
            <div
              className="droppable"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => onDrop(e, "fifth")}
            >
              {final.fifth.length > 0
                ? final.fifth.map((item, index) => {
                    return (
                      <div
                        key={`choice-fifth-${index}`}
                        onDragStart={(e) =>
                          onDragStart(
                            e,
                            item.label,
                            `choice-fifth-${index}`,
                            "fifth"
                          )
                        }
                        onDragEnd={(e) =>
                          onDragEnd(e, item.label, `choice-fifth-${index}`)
                        }
                        draggable
                        id={`choice-fifth-${index}`}
                        className="draggable"
                      >
                        {item.label}
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          {showDone ? (
            <button
              id="done-button"
              className="font-serif block opacity-100 done-button"
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
            {final.wip.length > 0
              ? final.wip.map((item, index) => {
                  return (
                    <div
                      key={`choice-wip-${index}-${item.label}`}
                      onDragStart={(e) =>
                        onDragStart(e, item.label, `choice-wip-${index}`, "wip")
                      }
                      onDragEnd={(e) =>
                        onDragEnd(e, item.label, `choice-wip-${index}`, "wip")
                      }
                      draggable
                      id={`choice-wip-${index}`}
                      className={`draggable ${
                        item.isEmpty ? "invisible" : "visible"
                      } ${item.isWhite ? "text-white" : ""}`}
                    >
                      {item.label}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div
          className="font-serif hidden opacity-0 choosen-words flex-col items-center content-center"
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
