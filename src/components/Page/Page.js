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
import Text from "./components/Text";
import List from "./components/List";
import CustomButton from "./components/CustomButton";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import ConversationRater from "../../components/ConversationRater/ConversationRater";
import IntroductionSlide1 from "./Introduction/IntroductionSlide1/IntroductionSlide1";

const Page = ({ elements, style, classNames }) => {
  const pageIndex = useSelector((state) => state.status.pageIndex);
  const chapterIndex = useSelector((state) => state.status.chapterIndex);
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

  return (
    <div className={`page-wrapper ${classNames || ""}`} style={style || {}}>
      {elementsState.map((element, index) => {
        if (element.type === "shape") {
          return <Shape data={element} key={index} />;
        } else if (element.type === "audio") {
          return <Audio data={element} key={index} />;
        } else if (element.type === "image") {
          return <Image data={element} key={index} />;
        } else if (element.type === "content") {
          return <Content data={element} key={index} />;
        } else if (element.type === "activity") {
          if (element.activity === "ConversationRater") {
            return <ConversationRater data={element.data} key={index} />;
          } else if (element.activity === "DragAndDrop") {
            return (
              <DragAndDrop
                data={element.data}
                key={`${chapterIndex}-${pageIndex}-${index}`}
              />
            );
          } else if (element.activity === "introduction-slide1") {
            return (
              <IntroductionSlide1
                data={element.data}
                key={`${chapterIndex}-${pageIndex}-${index}`}
              />
            );
          }
        } else if (element.type === "text") {
          return <Text data={element} key={index} />;
        } else if (element.type === "list") {
          return <List data={element} key={index} />;
        } else if (element.type === "button") {
          return <CustomButton data={element} key={index} />;
        }
        return null;
      })}
    </div>
  );
};

export default Page;
