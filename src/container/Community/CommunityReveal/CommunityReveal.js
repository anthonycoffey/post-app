import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import renderHTML from "react-render-html";
import { isEmpty, findIndex } from "lodash";

import Audio from "../../../components/Audio/Audio";
import "./CommunityReveal.scss";

const maxes = [];

const CommunityReveal = ({ data }) => {
  const { scenario } = data;
  const audioRef = React.createRef();
  const [officer, setOfficer] = useState({});
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

  useEffect(() => {
    if (!isEmpty(officer)) {
      const max0 = TweenMax.to(".community-modal", 0.5, {
        opacity: 1,
      });
      const max1 = TweenLite.from(".community-modal-image-wrapper", 0.5, {
        scaleX: 0,
        scaleY: 0,
      }).delay(0.5);
      const max2 = TweenLite.to(".community-modal-image-wrapper", 0.5, {
        opacity: 1,
      }).delay(0.5);
      const max3 = TweenMax.to(".community-modal-description-wrapper", 0.5, {
        opacity: 1,
      }).delay(0.5);
      maxes.push(max0, max1, max2, max3);
      setAudio(officer.audio);
    }
  }, [officer]);

  const playSequence = () => {
    scenario.slideImages.forEach((slideImage, index) => {
      const max0 = TweenMax.to(`.slide-image-${index}`, 0.5, {
        opacity: 1,
      }).delay(slideImage.start);
      if (slideImage.end > -1) {
        const max1 = TweenMax.to(`.slide-image-${index}`, 0.5, {
          opacity: 0,
        }).delay(slideImage.end);
        const max2 = TweenMax.to(`.slide-image-${index}`, 0.5, {
          display: "none",
        }).delay(slideImage.end + 0.5);
        maxes.push(max1, max2);
      }
      maxes.push(max0);
    });
  };

  const onAudioEnded = () => {
    const index = findIndex(scenario.slideImages, ["end", -1]);
    const max0 = TweenMax.to(`.slide-image-${index}`, 0.5, {
      opacity: 0,
    });
    const max1 = TweenMax.to(`.slide-image-${index}`, 0.5, {
      display: "none",
    }).delay(0.5);
    const max2 = TweenMax.to(`#${scenario.audio.id}`, 0.5, {
      opacity: 0,
    });

    maxes.push(max0, max1, max2);
  };

  const handleClick = (officer) => {
    setOfficer(officer);
  };
  const handleCloseModal = () => {
    const max0 = TweenMax.to(".community-modal", 0.5, {
      opacity: 0,
    });
    setAudio("");
    maxes.push(max0);
    setOfficer({});
  };
  return (
    <div
      className={`community-wrapper ${scenario.classNames || ""}`}
      style={scenario.style || {}}
    >
      {scenario.slideImages.map((slideImage, index) => (
        <div
          className={`block opacity-0 slide-image slide-image-${index} absolute w-7/12 -bottom-16`}
          style={slideImage.style || {}}
        >
          <img src={slideImage.url} alt="" />
        </div>
      ))}
      <div className={scenario.title.classNames || ""}>
        {scenario.title.content}
      </div>
      <div className="absolute bg-white p-2 left-1/4 top-20 officers-wrapper grid grid-cols-3 gap-2">
        {scenario.officers.map((officer, index) => (
          <div
            className="officer-wrapper relative cursor-pointer"
            key={`officer-${index}`}
            onClick={() => handleClick(officer)}
          >
            <img src={officer.image} alt="" className="w-36 h-36" />
            <div className="absolute bottom-4 left-4 officer-title text-white font-serif text-xs bg-black">
              {renderHTML(officer.title)}
            </div>
          </div>
        ))}
      </div>
      {!isEmpty(officer) ? (
        <div className="community-modal absolute w-full h-full p-6 bg-black border-white border-4 border-solid">
          <div
            className="close-btn absolute top-0 right-2 font-serif text-2xl text-white p-2 cursor-pointer"
            onClick={() => handleCloseModal()}
          >
            X
          </div>
          <div className="opacity-0 community-modal-image-wrapper w-auto h-auto absolute top-6 left-4">
            <img src={officer.image} alt="" />
          </div>
          <div className="opacity-0 text-white font-serif text-2xl community-modal-description-wrapper absolute top-6">
            {officer.description}
          </div>
        </div>
      ) : null}
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

export default CommunityReveal;
