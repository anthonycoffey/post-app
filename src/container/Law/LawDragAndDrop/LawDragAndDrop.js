import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { find, max } from "lodash";
import Audio from "../../../components/Audio/Audio";

import "./LawDragAndDrop.scss";

const maxes = [];

const LawDragAndDrop = ({ data }) => {
  const { data: initialData } = data;
  const [audio, setAudio] = useState("");
  const audioRef = React.createRef();
  const [dragItems, setDragItems] = useState([]);
  const [dragIndex, setDragIndex] = useState(0);

  useEffect(() => {
    setDragItems(initialData.choices);
    setAudio(initialData.initialAudio);
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
    };
  }, [data]);

  useEffect(() => {
    if (dragIndex > 0 && dragIndex === dragItems.length) {
      setAudio(initialData.summaryAudio);
      const max10 = TweenMax.to(".audio-panel", 0.5, {
        opacity: 1,
      }).delay(1);
      const max1 = TweenLite.to(".law-drop-zone.not-protected", 0.5, {
        x: 1100,
      }).delay(1);
      const max2 = TweenMax.to(".law-drop-zone.not-protected", 0.5, {
        opacity: 0,
      }).delay(1);
      const max6 = TweenMax.to(".law-drop-zone-title.not-protected-title", 0.5, {
        opacity: 0,
      }).delay(1);
      const max5 = TweenMax.to(".law-drag-drop-person-1-wrapper", 0.1, {
        display: 'block',
      }).delay(1);
      const max3 = TweenLite.from(".law-drag-drop-person-1-wrapper", 0.5, {
        x: 1100,
      }).delay(1);
      const max4 = TweenMax.to(".law-drag-drop-person-1-wrapper", 0.5, {
        opacity: 1,
      }).delay(1);

      const max9 = TweenMax.to(".law-drag-drop-person-1-wrapper", 0.5, {
        opacity: 0,
      }).delay(12);
      const max7 = TweenMax.to(".law-drag-drop-person-2-wrapper", 0.1, {
        display: 'block',
      }).delay(12);
      const max8 = TweenMax.to(".law-drag-drop-person-2-wrapper", 0.5, {
        opacity: 1,
      }).delay(12);
      maxes.push(max1, max2, max3, max4, max5, max6, max7, max8, max9, max10);
    }
  }, [dragIndex]);

  const playSequence = () => {
    const max0 = TweenMax.to(".law-intial-person-1-wrapper", 0.5, {
      opacity: 1,
    });
    const max1 = TweenMax.to(".law-intial-person-1-wrapper", 0.5, {
      opacity: 0,
    }).delay(11);
    const max2 = TweenMax.to(".law-intial-person-2-wrapper", 0.5, {
      opacity: 1,
    }).delay(11);

    const max3 = TweenLite.from(".law-initial-title", 0.5, {
      x: 1100,
    }).delay(11);
    const max4 = TweenMax.to(".law-initial-title", 0.5, {
      opacity: 1,
    }).delay(11);

    const max5 = TweenLite.to(".law-initial-wrapper", 0.5, {
      y: -1100,
    }).delay(16);
    const max6 = TweenMax.to(".law-initial-wrapper", 0.5, {
      opacity: 0,
    }).delay(16);
    const max7 = TweenMax.to(".law-drag-drop", 0.5, {
      opacity: 1,
    }).delay(16);

    maxes.push(max0, max1, max2, max3, max4, max5, max6, max7);
  };
  const onAudioEnded = () => {
    const max1 = TweenMax.to(".audio-panel", 0.3, {
      opacity: 0,
    });
    maxes.push(max1);
  };

  const onDragStart = (ev, id, index, source) => {
    ev.dataTransfer.setData("id", id);
    ev.dataTransfer.setData("source", source);
    document.getElementById(index).style.opacity = 0.001;
  };

  const onDragEnd = (ev, index) => {
    document.getElementById(index).style.opacity = 1;
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let source = ev.dataTransfer.getData("source");
    const temp = dragItems;
    if (cat === source) {
      find(temp, (item) => {
        return item.type === cat && item.title === id;
      }).isFilled = true;
      const max1 = TweenMax.to(".law-correct-wrapper", 0.5, {
        opacity: 1,
      });
      const max2 = TweenMax.to(".law-correct-wrapper", 0.5, {
        opacity: 0,
      }).delay(0.5);
      maxes.push(max1, max2);
      setDragItems([...temp]);
      setDragIndex(dragIndex + 1);
    } else if (cat !== 'wip') {
      const max3 = TweenMax.to(".law-warning-wrapper", 0.5, {
        opacity: 1,
      });
      const max4 = TweenMax.to(".law-warning-wrapper", 0.5, {
        opacity: 0,
      }).delay(0.5);
      maxes.push(max3, max4);
    }
  };

  return (
    <div
      id={initialData.id}
      className={`law-drag-and-drop-wrapper ${initialData.classNames || ""}`}
      style={initialData.style || {}}
    >
      <div className="law-initial-wrapper w-full h-full relative">
        <div className="opacity-0 law-intial-person-1-wrapper w-9/12 -bottom-48 absolute left-24">
          <img src={initialData.person1Image.url} alt="" />
        </div>
        <div className="opacity-0 law-intial-person-2-wrapper w-9/12 -bottom-48 absolute -left-32">
          <img src={initialData.person2Image.url} alt="" />
        </div>
        <div
          className={`absolute top-1/3 left-1/2 opacity-0 law-initial-title ${
            initialData.title.classNames || ""
          }`}
        >
          {initialData.title.text}
        </div>
      </div>
      <div className="law-drag-drop opacity-0 left-0 top-0 right-0 w-full absolute">
        <div className="hidden opacity-0 law-drag-drop-person-1-wrapper w-9/12 -bottom-48 absolute right-0">
          <img src={initialData.person1Image.url} alt="" />
        </div>
        <div className="hidden opacity-0 law-drag-drop-person-2-wrapper w-9/12 -bottom-48 absolute right-0">
          <img src={initialData.person3Image.url} alt="" />
        </div>
        <div className="opacity-0 law-warning-wrapper absolute">
          incorrect. try
          <br />
          again.
        </div>
        <div className="opacity-0 law-correct-wrapper absolute">correct</div>
        <div className="law-drop-zone-title protected-title">protected</div>
        <div className="law-drop-zone-title not-protected-title">
          not protected
        </div>
        <div
          className="law-drop-zone protected"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "protected")}
        >
          {dragItems.map((item, index) =>
            item.isFilled && item.isProtected ? (
              <div className="law-drop-zone-content" key={index}>
                {item.label}
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <div
          className="opacity-100 law-drop-zone not-protected"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "not-protected")}
        >
          {dragItems.map((item, index) => {
            return item.isFilled && !item.isProtected ? (
              <div className="law-drop-zone-content" key={index}>
                {item.label}
              </div>
            ) : (
              ""
            );
          })}
        </div>
        <div
          className="law-drag-source-wrapper w-full absolute bottom-28 m-auto"
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, "wip")}
        >
          {dragIndex > -1 && dragIndex < dragItems.length ? (
            <div
              key={`drag-source-${dragIndex}`}
              onDragStart={(e) =>
                onDragStart(
                  e,
                  initialData.choices[dragIndex].title,
                  `choice-${dragIndex}`,
                  initialData.choices[dragIndex].type
                )
              }
              onDragEnd={(e) => onDragEnd(e, `choice-${dragIndex}`)}
              draggable
              id={`choice-${dragIndex}`}
              className="law-draggable"
            >
              {initialData.choices[dragIndex].title}
            </div>
          ) : null}
        </div>
      </div>
      <Audio
        data={{
          ...initialData.audio,
          url: audio,
        }}
        ref={audioRef}
        onEnded={onAudioEnded}
      />
    </div>
  );
};

export default LawDragAndDrop;
