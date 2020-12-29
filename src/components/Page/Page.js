import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TweenLite } from "gsap";
import renderHTML from "react-render-html";
import AudioPlayer from "react-h5-audio-player";
import actionHelper from "../../helpers/ActionHelper";
import "react-h5-audio-player/lib/styles.css";
import { setCompletedRequest } from "../../store/actions/status.action";
import "./Page.scss";
import Slider from "react-slick";

const Page = ({ elements, style, classNames }) => {
  const pageIndex = useSelector((state) => state.status.pageIndex);
  const chapterIndex = useSelector((state) => state.status.chapterIndex);
  const dispatch = useDispatch();
  const [elementsState, setElementsState] = useState([]);
  let slider = useRef(null);
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

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
            TweenLite.to(document.getElementById(element.id), delay, {
              x: x,
              y: y,
            });
          } else if (animation.type === "from") {
            TweenLite.from(document.getElementById(element.id), delay, {
              x: x,
              y: y,
            });
          }
        });
      }
    });
  };

  const setCompleteStatus = (status) => {
    dispatch(setCompletedRequest(chapterIndex, pageIndex, status));
  };

  const handleButtonClick = (actions) => {
    const initialElements = elementsState;
    setElementsState(actionHelper.doActions(initialElements, actions));
  };

  const handleSlideUp = () => {
    slider.slickNext();
  };

  const handleSlideDown = () => {
    slider.slickPrev();
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
              onClick={() => handleButtonClick(element.actions)}
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
              <div className="up-button mb-4" onClick={() => handleSlideUp()}>
                <img src={`${process.env.PUBLIC_URL}/assets/images/up-arrow.png`} width="30" height="30" alt="" />
              </div>
              <Slider {...settings} ref={ref => (slider = ref)}>
                <div className="slide-item">OK</div>
                <div className="slide-item">GOOD</div>
                <div className="slide-item">BAD</div>
              </Slider>
              <div className="down-button mt-4" onClick={() => handleSlideDown()}>
                <img src={`${process.env.PUBLIC_URL}/assets/images/down-arrow.png`} width="30" height="30" alt="" />
              </div>
            </div>
          );
        } else if (element.type === "text") {
          return (
            <div
              id={element.id}
              className={element.classNames || ""}
              style={element.style || {}}
              key={index}
            >
              {element.content}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Page;
