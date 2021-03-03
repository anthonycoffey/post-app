import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../../store/actions/status.action";

import Audio from "../../../components/Audio/Audio";
import "./ReportInitial.scss";

const maxes = [];

const ReportInitial = ({ data }) => {
  const { scenario } = data;
  const audioRef = React.createRef();
  const dispatch = useDispatch();
  const { pageIndex } = useSelector((state) => state.status);
  const [audio, setAudio] = useState("");

  useEffect(() => {
    setAudio(scenario.initialAudio);
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  const playSequence = () => {
    const max0 = TweenLite.from(".person", 0.5, {
      x: 1000,
    }).delay(6.5);
    const max1 = TweenMax.to(".person", 0.5, {
      opacity: 1,
    }).delay(6.5);

    const max2 = TweenMax.to(".person", 0.5, {
      opacity: 0,
    }).delay(13.5);
    const max3 = TweenMax.to(".image-0", 0.5, {
      opacity: 0,
    }).delay(13.5);
    const max4 = TweenMax.to(".image-1", 0.5, {
      opacity: 1,
    }).delay(13.5);

    const max5 = TweenMax.to(".image-1", 0.5, {
      opacity: 0,
    }).delay(22.5);
    const max6 = TweenMax.to(".image-2", 0.5, {
      opacity: 1,
    }).delay(22.5);

    const max7 = TweenMax.to(".image-2", 0.5, {
      opacity: 0,
    }).delay(27);
    const max8 = TweenMax.to(".image-3", 0.5, {
      opacity: 1,
    }).delay(27);

    maxes.push(max0, max1, max2, max3, max4, max5, max6, max7, max8);
  };

  const onAudioEnded = () => {
    dispatch(setPageIndexRequest(pageIndex + 1));
  };

  return (
    <div
      className={`report-initial ${scenario.classNames || ""}`}
      style={scenario.style || {}}
      id="report-initial"
    >
      <img
        className="w-full h-full opacity-100 absolute left-0 top-0 image-0"
        src={scenario.image0}
        alt=""
      />
      <img
        className="w-full h-full opacity-0 absolute left-0 top-0 image-1"
        src={scenario.image1}
        alt=""
      />
      <img
        className="w-full h-full opacity-0 absolute left-0 top-0 image-2"
        src={scenario.image2}
        alt=""
      />
      <img
        className="w-full h-full opacity-0 absolute left-0 top-0 image-3"
        src={scenario.image3}
        alt=""
      />
      <img
        className="w-1/2 opacity-0 absolute person"
        src={scenario.person}
        alt=""
      />
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

export default ReportInitial;
