import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TweenMax } from "gsap";
import { filter } from "lodash";
import { setCompletedRequest } from "../../store/actions/status.action";
import Audio from "../../components/Audio/Audio";
import Video from "../../components/Video/Video";
import Slide from "./components/Slide/Slide";
import Slide2 from "./components/Slide2/Slide2";
import CustomButton from "../../components/CustomButton/CustomButton";

import "./History.scss";

const maxes = [];

const History = ({ data }) => {
  const pageIndex = useSelector((state) => state.status.pageIndex);
  const chapterIndex = useSelector((state) => state.status.chapterIndex);
  const completed = useSelector((state) => state.status.completed);
  console.log('--------', completed);
  const dispatch = useDispatch();
  const [revealItems, setRevealItem] = useState([]);
  const [revealIndex, setRevealIndex] = useState(-1);
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");
  const [finishedItems, setFinishedItems] = useState(0);
  const [videoPlaying, setVidePlaying] = useState(false);
  useEffect(() => {
    setRevealItem(data.items);
    setAudio(data.initialAudio);
    // dispatch(setCompletedRequest(chapterIndex, pageIndex, 0));
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  useEffect(() => {
    if (finishedItems > 0 && finishedItems === revealItems.length) {
      dispatch(setCompletedRequest(chapterIndex, pageIndex, 1));
      setAudio(data.doneAudio);
    }
  }, [finishedItems]);

  useEffect(() => {
    if (
      revealIndex === -1 &&
      completed[chapterIndex][`page_${pageIndex}`] === 1
    ) {
      TweenMax.to(".history-action-wrapper", 0.1, {
        display: "block",
      });
      setAudio('');
        setAudio(data.doneAudio);
    }
  }, [revealIndex]);

  useEffect(() => {
    if (
      finishedItems === revealItems.length &&
      completed[chapterIndex][`page_${pageIndex}`] === 1
    ) {
      setAudio(data.doneAudio);
      setFinishedItems(0);
    }
  }, [revealItems]);

  const handleReveal = (revealIndex, currentIndex) => {
    setRevealIndex(currentIndex);
    const temp = revealItems.slice();
    temp[currentIndex].watched = true;
    setRevealItem(temp);
    if (currentIndex === 0) {
      setVidePlaying(true);
    }
    setAudio("");
  };
  const onVideoEnded = () => {
    setRevealIndex(-1);
    if (finishedItems < revealItems.length) {
      setFinishedItems(finishedItems + 1);
    }
  };

  const renderItem = () => {
    if (revealIndex === -1) {
      TweenMax.to(".audio-panel", 0.1, {
        display: "block",
      });
      return revealItems.map((item, index) => (
        <div
          className={`history-reveal-item ${item.classNames || ""}`}
          key={index}
          onClick={() => handleReveal(item.pageIndex, index)}
        >
          <img src={item.image.url} alt="" style={item.style || {}} />
          {completed[chapterIndex][`page_${pageIndex + 1}`] === 1 || revealItems[index].watched ? (
            <div
              className={`watched-wrapper absolute w-20 h-20 ${
                index === 1
                  ? "right-12 top-6"
                  : index === 2
                  ? "top-12 right-0"
                  : "-top-4 right-12"
              }`}
            >
              <img className="watched" src={data.watchedImage} alt="" />
            </div>
          ) : null}
        </div>
      ));
    } else if (revealIndex === 0) {
      TweenMax.to(".audio-panel", 0.1, {
        display: "none",
      });
      TweenMax.to(".history-action-wrapper", 0.1, {
        display: "none",
      });
      return (
        <Video
          data={revealItems[revealIndex].videoContent}
          key="reveal-0"
          onEnded={onVideoEnded}
          playing={videoPlaying}
        />
      );
    } else if (revealIndex === 1) {
      TweenMax.to(".audio-panel", 0.1, {
        display: "none",
      });
      TweenMax.to(".history-action-wrapper", 0.1, {
        display: "none",
      });
      return (
        <Slide
          data={revealItems[revealIndex].slideContent}
          goToNextReveal={onVideoEnded}
        />
      );
    } else if (revealIndex === 2) {
      TweenMax.to(".audio-panel", 0.1, {
        display: "none",
      });
      TweenMax.to(".history-action-wrapper", 0.1, {
        display: "none",
      });
      return (
        <Slide2
          data={revealItems[revealIndex].slideContent}
          goToNextReveal={onVideoEnded}
        />
      );
    }
  };
  return (
    <div className={`${data.classNames || ""}`} style={data.style || {}}>
      <Audio
        data={{
          ...data.audio,
          url: audio,
        }}
        ref={audioRef}
      />
      {renderItem()}
      {completed[chapterIndex][`page_${pageIndex + 1}`] === 1 ? (
        <div className="absolute bottom-36 history-action-wrapper">
          <CustomButton data={{ title: "Done", action: "goToMenu" }} />
        </div>
      ) : null}
    </div>
  );
};

export default History;
