import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TweenLite } from "gsap";
import actionHelper from "../../helpers/ActionHelper";
import "react-h5-audio-player/lib/styles.css";
import { setCompletedRequest } from "../../store/actions/status.action";
import "./Page.scss";
import Content from "./components/Content";
import Audio from "./components/Audio";
import Shape from "./components/Shape";
import Image from "./components/Image";
import ConversationRater from "../ConversationRater";

const Page = ({ elements, style, classNames }) => {
  const pageIndex = useSelector(state => state.status.pageIndex);
  const chapterIndex = useSelector(state => state.status.chapterIndex);
  const dispatch = useDispatch();
  const [elementsState, setElementsState] = useState([]);

  useEffect(() => {
    setCompleteStatus(1);
    setElementsState(elements);
  }, [elements]);
  useEffect(() => {
    playSequence();
  }, [elementsState]);

  const playSequence = () => {
    elements.forEach(element => {
      const { animations } = element;
      if (animations) {
        animations.forEach(animation => {
          let { x, y, delay } = animation;
          if (animation.type === "to") {
            TweenLite.to(document.getElementById(element.id), delay, {
              x: x,
              y: y
            });
          } else if (animation.type === "from") {
            TweenLite.from(document.getElementById(element.id), delay, {
              x: x,
              y: y
            });
          }
        });
      }
    });
  };

  const setCompleteStatus = status => {
    dispatch(setCompletedRequest(chapterIndex, pageIndex, status));
  };

  const handleButtonClick = actions => {
    const initialElements = elementsState;
    setElementsState(actionHelper.doActions(initialElements, actions));
  };

  return (
    <div className={`page-wrapper ${classNames || ""}`} style={style || {}}>
      {elementsState.map((element, index) => {
        if (element.type === "shape") {
          return <Shape data={element} index={index} />;
        } else if (element.type === "audio") {
          return <Audio data={element} index={index} />;
        } else if (element.type === "image") {
          return <Image data={element} index={index} />;
        } else if (element.type === "content") {
          return <Content data={element} index={index} />;
        } else if (element.type === "activity") {
          if (element.activity === "ConversationRater") {
            return <ConversationRater data={element.data} />;
          }
        }
      })}
    </div>
  );
};

export default Page;
