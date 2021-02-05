import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TweenLite, TweenMax } from "gsap";
import actionHelper from "../../helpers/ActionHelper";
import "react-h5-audio-player/lib/styles.css";
import {
  setCompletedRequest,
  setPageIndexRequest,
} from "../../store/actions/status.action";
import "./Page.scss";
import Content from "./components/Content/Content";
import Audio from "./components/Audio/Audio";
import Video from "./components/Video/Video";
import Shape from "./components/Shape/Shape";
import Image from "./components/Image/Image";
import Text from "./components/Text/Text";
import List from "./components/List/List";
import CustomButton from "./components/CustomButton/CustomButton";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import TextDragAndDrop from "../TextDragAndDrop/TextDragAndDrop";
import ImageDragAndDrop from "../ImageDragAndDrop/ImageDragAndDrop";
import ConversationRater from "../ConversationRater/ConversationRater";
import IntroductionSlide1 from "./Introduction/IntroductionSlide1/IntroductionSlide1";
import IntroductionSelection from "./Introduction/Selection/Selection";
import SliderActivity from "./components/SliderActivity/SliderActivity";

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
          let { x, y, duration } = animation;
          if (animation.type === "to") {
            TweenLite.to(document.getElementById(element.id), duration, {
              x: x,
              y: y,
            });
          } else if (animation.type === "from") {
            TweenLite.from(document.getElementById(element.id), duration, {
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

  const onAudioEnded = () => {
    elementsState
      .filter((item) => item.type !== "audio")
      .map((item) => {
        TweenMax.to(document.getElementById(item.id), 0.5, {
          opacity: 0,
        });
      });

    setTimeout(() => {
      dispatch(setPageIndexRequest(pageIndex + 1));
    }, 1000);
  };

  const randomId = new Date().getMilliseconds();

  return (
    <div className={`page-wrapper ${classNames || ""}`} style={style || {}}>
      {elementsState.map((element, index) => {
        if (element.type === "shape") {
          return <Shape data={element} key={index} />;
        } else if (element.type === 'video') {
          return (
            <Video
              data={element}
              key={index}
            />
          )
        } else if (element.type === "audio") {
          return (
            <Audio
              data={element}
              key={index}
              onEnded={element.onEnd ? onAudioEnded : null}
            />
          );
        } else if (element.type === "image") {
          return <Image data={element} key={index} />;
        } else if (element.type === "content") {
          return <Content data={element} key={index} />;
        } else if (element.type === "activity") {
          if (element.activity === "ConversationRater") {
            return <ConversationRater data={element.data} key={index} />;
          } else if (element.activity === 'slider') {
            return <SliderActivity data={element} key={index} />
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
          } else if (element.activity === "selection") {
            return (
              <IntroductionSelection
                data={element.data}
                key={`${chapterIndex}-${pageIndex}-${index}`}
              />
            );
          } else if (element.activity === "TextDragAndDrop") {
            return (
              <TextDragAndDrop
                data={element.data}
                key={`${chapterIndex}-${pageIndex}-${index}-${randomId}`}
              />
            );
          } else if (element.activity === "ImageDragAndDrop") {
            return (
              <ImageDragAndDrop
                data={element.data}
                key={`${chapterIndex}-${pageIndex}-${index}-${randomId}`}
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
