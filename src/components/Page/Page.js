import React, { useState, useEffect, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TweenLite } from "gsap";
import renderHTML from "react-render-html";
import AudioPlayer from "react-h5-audio-player";
import actionHelper from "../../helpers/ActionHelper";
import "react-h5-audio-player/lib/styles.css";
import { setCompletedRequest } from "../../store/actions/status.action";
import "./Page.scss";

const Page = ({ elements, style, classNames }) => {
  const pageIndex = useSelector((state) => state.status.pageIndex);
  const chapterIndex = useSelector((state) => state.status.chapterIndex);
  const dispatch = useDispatch();
  const [elementsState, setElementsState] = useState([]);

  useEffect(() => {
    setCompleteStatus(1);
    setElementsState(elements);
    playSequence();
  }, [elements]);

  const playSequence = () => {
    elements.forEach((element) => {
      const { animations } = element;
      if (animations) {
        animations.forEach((animation) => {
          let { x, y, delay } = animation;
          if (animation.type === "to") {
            TweenLite.to(document.getElementById(element.id), delay, { x: x, y: y });
          } else if (animation.type === "from") {
            TweenLite.from(document.getElementById(element.id), delay, { x: x, y: y });
          }
        });
      }
    });
  };

  const setCompleteStatus = (status) => {
    dispatch(setCompletedRequest(chapterIndex, pageIndex, status));
  };

  const handleButtonClick = (action) => {
    if (action.type === "show") {
      const initialElements = elementsState;
      setElementsState(
        actionHelper.showElement(initialElements, action.target)
      );
    }
  };

  return (
    <div className={`page-wrapper ${classNames || ""}`} style={style || {}}>
      {elementsState.map((element, index) => {
        if (element.type === "shape") {
          return (
            <div
              id={element.id}
              className={`shape ${element.classNames || ""}`}
              style={element.style || {}}
              key={index}
            ></div>
          );
        } else if (element.type === "audio") {
          return (
            <div
              id={element.id}
              className={`audio-panel ${element.classNames || ""}`}
              key={index}
              style={element.style || {}}
            >
              <AudioPlayer
                autoPlay
                src={`${process.env.PUBLIC_URL}${element.url}`}
                // onPlay={(e) => console.log("onPlay")}
                // other props here
              />
            </div>
          );
        } else if (element.type === "image") {
          return (
            <div
              id={element.id}
              className={`image-wrapper ${element.classNames || ""}`}
              style={element.style || {}}
              key={index}
            >
              <img
                src={`${process.env.PUBLIC_URL}${element.url}`}
                alt={element.alt}
              />
            </div>
          );
        } else if (element.type === "content") {
          return (
            <div
              id={element.id}
              className={`content-wrapper ${
                element.classNames ? element.classNames : ""
              }`}
              key={index}
              style={element.style || {}}
            >
              {element.title ? (
                <div
                  className={`title ${element.title.classNames || ""}`}
                  style={element.title.style || {}}
                >
                  {element.title.content}
                </div>
              ) : null}
              {element.description ? (
                <div
                  className={`description ${
                    element.description.classNames || ""
                  }`}
                  style={element.description.style || {}}
                >
                  {renderHTML(element.description.content)}
                </div>
              ) : null}
            </div>
          );
        } else if (element.type === "video") {
          return (
            <div
              id={element.id}
              className={element.classNames || ""}
              style={element.style || {}}
              key={index}
            />
          );
        } else if (element.type === "text-button") {
          return (
            <button
              id={element.id}
              className={element.classNames || ""}
              style={element.style || {}}
              onClick={() => handleButtonClick(element.action)}
              key={index}
            >
              {element.title}
            </button>
          );
        } else if (element.type === "rate") {
          return (
            <div
              id={element.id}
              className={element.classNames || ""}
              style={element.style || {}}
              key={index}
            >
              Selection
            </div>
          );
        }
      })}
    </div>
  );
};

export default Page;
