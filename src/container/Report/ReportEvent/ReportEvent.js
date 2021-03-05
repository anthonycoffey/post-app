import React, { useEffect, useState } from "react";
import { TweenMax, TweenLite } from "gsap";
import { isEmpty } from "lodash";
import renderHTML from "react-render-html";
import Audio from "../../../components/Audio/Audio";
import "./ReportEvent.scss";

const maxes = [];
const timers = [];
const ReportEvent = ({ data }) => {
  const { scenario } = data;
  const audioRef = React.createRef();
  const [audio, setAudio] = useState("");
  const [eventIndex, setEventIndex] = useState(-1);
  const [events, setEvents] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [saying, setSaying] = useState({});
  const [eventChoices, setEventChoices] = useState(false);
  const [sayingIndex, setSayingIndex] = useState(0);
  const [choice, setChoice] = useState({});

  useEffect(() => {
    setAudio(scenario.initialAudio);
    setEvents(scenario.events);
    playSequence();
    return () => {
      maxes.forEach((max) => {
        max.kill();
      });
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, [data]);

  useEffect(() => {
    if (!isEmpty(feedback)) {
      const max0 = TweenLite.from(".feedback-wrapper", 1, {
        x: 1100,
      });
      const max1 = TweenMax.to(".feedback-wrapper", 0.5, {
        opacity: 1,
      });
      const max2 = TweenMax.to(".event-choices-wrapper-overlay", 0.1, {
        display: "block",
      });
      const max3 = TweenMax.to(".event-choices-wrapper-overlay", 0.5, {
        opacity: 1,
      });
      maxes.push(max0, max1, max2, max3);
    }
  }, [feedback]);

  useEffect(() => {
    if (!isEmpty(saying)) {
      const max0 = TweenMax.to(".report-saying-wrapper", 0.5, {
        opacity: 1,
      });
      const max1 = TweenMax.to(".report-saying-text", 0.5, {
        opacity: 1,
      }).delay(0.5);
      const timer1 = setInterval(() => increaseSayingIndex(), 4000);
      timers.push(timer1);
      maxes.push(max0, max1);
    }
  }, [saying]);

  const increaseSayingIndex = () => {
    const max0 = TweenMax.to(".report-saying-text", 0.1, {
      opacity: 0,
    });
    maxes.push(max0);
    setTimeout(() => setSayingIndex(sayingIndex + 1), 100);
  };

  useEffect(() => {
    if (!isEmpty(saying) && sayingIndex === saying.data.length - 1) {
      timers.forEach((timer) => {
        clearInterval(timer);
      });

      setTimeout(() => setFeedback(choice.feedback), 4000);
    }
    if (sayingIndex > 0) {
      const max0 = TweenMax.to(".report-saying-text", 0.3, {
        opacity: 1,
      });
      maxes.push(max0);
    }
  }, [sayingIndex]);

  useEffect(() => {
    if (eventChoices) {
      const max0 = TweenMax.to(".select-events-wrapper", 0.5, {
        opacity: 0,
      }).delay(0.5);
      const max1 = TweenMax.to(".event-choices-wrapper", 0.1, {
        display: "block",
      }).delay(0.5);
      const max2 = TweenMax.to(".event-choices-wrapper", 0.5, {
        opacity: 1,
      }).delay(0.5);
      const max3 = TweenLite.from(".event-choices", 0.6, {
        x: -1100,
      }).delay(1);
      const max4 = TweenMax.to(".event-choices", 0.3, {
        opacity: 1,
      }).delay(1);
      maxes.push(max0, max1, max2, max3, max4);
    }
  }, [eventChoices]);

  const playSequence = () => {
    const max0 = TweenMax.to(".report-select-event-over", 0.1, {
      display: "block",
    });
    const max1 = TweenMax.to(".report-select-event-over", 1, {
      opacity: 1,
    });
    const max2 = TweenMax.to(".person-image-0", 0.1, {
      display: "block",
    });
    const max3 = TweenMax.to(".person-image-0", 1, {
      opacity: 1,
    });

    const max4 = TweenMax.to(".person-image-0", 0.1, {
      display: "none",
    }).delay(5);
    const max5 = TweenMax.to(".person-image-0", 0.5, {
      opacity: 0,
    }).delay(5);

    const max6 = TweenMax.to(".person-image-1", 0.1, {
      display: "block",
    }).delay(5.5);
    const max7 = TweenMax.to(".person-image-1", 0.5, {
      opacity: 1,
    }).delay(5.5);
    maxes.push(max0, max1, max2, max3, max4, max5, max6, max7);
  };

  const onAudioEnded = () => {
    maxes.forEach((max) => {
      max.kill();
    });
    setEventIndex(0);
    const max0 = TweenMax.to(".report-select-event-over", 0.1, {
      display: "none",
    });
    const max1 = TweenMax.to(".report-select-event-over", 0.5, {
      opacity: 0,
    });
    const max2 = TweenMax.to(".person-image-1", 0.1, {
      display: "none",
    });
    const max3 = TweenMax.to(".person-image-1", 0.5, {
      opacity: 0,
    });
    const max4 = TweenMax.to(".person-image-0", 0.1, {
      display: "none",
    });
    const max5 = TweenMax.to(".person-image-0", 0.5, {
      opacity: 0,
    });
    const max6 = TweenMax.to(".audio-panel", 0.5, {
      opacity: 0,
    });
    const max7 = TweenMax.to(".audio-panel", 0.1, {
      display: "none",
    });
    maxes.push(max0, max1, max2, max3, max4, max5, max6, max7);
  };

  const handleClickEvent = (index) => {
    if (eventIndex === index) {
      setEventChoices(true);
    }
  };

  const handleClickEventChoice = (choice) => {
    setChoice(choice);
    if (choice.action === "go-to-feedback") {
      setFeedback(choice.feedback);
    } else if (choice.action === "go-to-saying") {
      setSaying(choice.saying);
    }
  };

  const handleFeedbackContinue = () => {
    if (feedback.action === "go-selection") {
      const max0 = TweenMax.to(".event-choices-wrapper", 0.1, {
        display: "none",
      });
      const max1 = TweenMax.to(".event-choices-wrapper", 0.5, {
        opacity: 0,
      });
      const max2 = TweenMax.to(".select-events-wrapper", 0.5, {
        opacity: 1,
      });
      setFeedback({});
      setEventChoices(false);
      setEventIndex(eventIndex + 1);
      maxes.push(max0, max1, max2);
    }
  };

  return (
    <div
      className={`report-select-event ${scenario.classNames || ""}`}
      style={scenario.style || {}}
      id="report-select-event"
    >
      <div className="hidden opacity-0 report-select-event-over absolute left-0 top-0 bottom-0 right-0 w-full h-full"></div>
      <div className="absolute select-events-wrapper opacity-100 left-0 top-0">
        <div className="opacity-0 hidden person-image-0 w-1/2 -bottom-24 left-56 absolute ">
          <img src={scenario.personImage0} alt="" />
        </div>
        <div className="opacity-0 hidden person-image-1 w-1/2 -bottom-24 left-56 absolute ">
          <img src={scenario.personImage1} alt="" />
        </div>
        <div className="top-events px-8 mt-20 grid grid-cols-4 gap-4">
          {scenario.events.slice(0, 4).map((event, index) => (
            <div
              className={`${
                eventIndex === index ? "cursor-pointer" : ""
              } report-event shadow-xl w-full h-full`}
              key={index}
              onClick={() => handleClickEvent(index)}
            >
              <img
                src={
                  eventIndex === index ? event.enableImage : event.disableImage
                }
                alt=""
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
        <div className="my-8 font-serif report-select-title text-2xl text-white w-full text-center">
          {scenario.title || ""}
        </div>
        <div className="bottom-events w-full flex items-center justify-center">
          <div
            className={`${
              eventIndex === 4 ? "cursor-pointer" : ""
            } report-event shadow-xl mr-4 w-1/3`}
          >
            <img
              src={
                eventIndex === 4
                  ? scenario.events[4].enableImage
                  : scenario.events[4].disableImage
              }
              alt=""
            />
          </div>
          <div
            className={`${
              eventIndex === 5 ? "cursor-pointer" : ""
            } report-event shadow-xl ml-4  w-1/3`}
          >
            <img
              src={
                eventIndex === 5
                  ? scenario.events[5].enableImage
                  : scenario.events[5].disableImage
              }
              alt=""
            />
          </div>
        </div>
      </div>
      {eventChoices && scenario.events ? (
        <div className="hidden absolute event-choices-wrapper w-full h-full opacity-0 bg-white">
          <div className="hidden opacity-0 absolute w-full h-full event-choices-wrapper-overlay"></div>
          <div className="event-choices-wrapper-background w-full h-full absolute top-0 -right-60">
            <img
              src={scenario.events[eventIndex].eventData.backgroundImage.url}
              alt=""
              className="w-full h-full"
              style={
                scenario.events[eventIndex].eventData.backgroundImage.style ||
                {}
              }
            />
          </div>
          <div className="event-choices-panel p-6 absolute left-0 bottom-0 w-7/12 h-5/6 bg-white">
            <div className="event-choices-panel-title px-4 pb-6 mb-6 font-serif text-3xl">
              {scenario.events[eventIndex].eventData.title}
            </div>
            <div className="event-choices-panel-description mb-6 font-serif text-2xl">
              {scenario.events[eventIndex].eventData.description}
            </div>
            <div className="event-choices">
              {scenario.events[eventIndex].eventData.choices.map(
                (choice, index) => (
                  <div
                    className="cursor-pointer event-choice p-3 text-white font-serif mb-3 text-2xl"
                    key={index}
                    onClick={() => handleClickEventChoice(choice)}
                  >
                    {choice.content}
                  </div>
                )
              )}
            </div>
          </div>
          {!isEmpty(feedback) ? (
            <div className="opacity-0 feedback-wrapper absolute right-4 w-5/12 top-24 p-6 bg-white">
              <div className="font-serif feedback-title text-2xl pb-6 mb-6 px-4">
                Feedback
              </div>
              <div className="feedback-content font-serif text-2xl px-4">
                {renderHTML(feedback.content)}
              </div>
              <div className="feedback-action w-full">
                <button
                  className="m-auto font-serif block opacity-100 continue-button"
                  onClick={() => handleFeedbackContinue()}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : null}
          {!isEmpty(saying) ? (
            <div className="opacity-0 report-saying-wrapper absolute w-full h-full left-0 top-0">
              <div className="saying-wrapper-background w-full h-full absolute top-0 left-0">
                <img
                  src={saying.backgroundImage}
                  alt=""
                  className="w-full h-full"
                />
              </div>
              <div className="saying-wrapper-person">
                <img
                  src={saying.personImage.url}
                  alt=""
                  className={saying.personImage.classNames || ""}
                  style={saying.personImage.style || {}}
                />
              </div>
              <div
                className="opacity-0 absolute font-serif report-saying-text flex items-center justify-center text-lg p-4"
                style={saying.sayingWrapperStyle || {}}
              >
                {saying.data[sayingIndex].content}
              </div>
            </div>
          ) : null}
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

export default ReportEvent;
