import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "./ConversationRater.sass";
const ConversationRater = ({ data }) => {
  const { scenarios } = data;
  let slider = useRef(null);
  let rater = useRef();
  let skipButton = useRef();
  let count = 0;
  const [selection, setSelection] = useState(0);
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: (current, next) => {
      setSelection(next);
    }
  };
  const handleSlideUp = () => {
    slider.slickNext();
  };
  const handleSlideDown = () => {
    slider.slickPrev();
  };
  const handleSkip = () => {
    const element = rater.current;
    element.classList.remove("opacity-0", "invisible");
  };
  const fadeIn = () => {
    const element = skipButton.current;
    element.classList.remove("opacity-0", "invisible");
  };
  useEffect(() => {
    fadeIn();
  });
  const showChoices = () => {
    if (selection === 0) {
      console.log("good");
    } else if (selection === 1) {
      console.log("ok");
    } else if (selection === 2) {
      console.log("bad");
    }
  };
  console.log(scenarios);
  return (
    <div className="flex content-center justify-center items-center w-full h-full">
      <div className="w-2/5 h-1/2 bg-gray-400 content-center">
        <span>insert video here</span>
      </div>
      <div ref={rater} id="rate-performance" className="opacity-0 invisible">
        <div className="up-button mb-4" onClick={() => handleSlideUp()}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/up-arrow.png`}
            width="30"
            height="30"
            alt=""
          />
        </div>
        <Slider {...settings} ref={ref => (slider = ref)}>
          <div className="slide-item">GOOD</div>
          <div className="slide-item">OK</div>
          <div className="slide-item">BAD</div>
        </Slider>
        <div className="down-button mt-4" onClick={() => handleSlideDown()}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/down-arrow.png`}
            width="30"
            height="30"
            alt=""
          />
        </div>
        <button className="rater-submit" onClick={() => showChoices()}>
          Submit
        </button>
      </div>
      <div className="absolute left-20 bottom-20">
        <p className="font-bold italic">
          Use the arrows to rate the officer's performance. Click Submit when
          you're ready.
        </p>
      </div>
      <div
        id="skip-button"
        ref={skipButton}
        className="absolute bottom-0 my-4 opacity-0 invisible"
      >
        <button onClick={() => handleSkip()}>Skip</button>
      </div>
      <div className="choices">

      </div>
    </div>
  );
};

export default ConversationRater;

/*

            {
              "id": "text-button",
              "type": "text-button",
              "classNames": "border-none background-transparent absolute left-1/2 bottom-0 -translate-x-1/2",
              "actions": [
                {
                  "type": "show",
                  "target": "rate-performance"
                },
                {
                  "type": "show",
                  "target": "rate-description"
                }
              ],
              "title": "skip"
            },
            {
              "id": "rate-performance",
              "type": "rate",
              "classNames": "mx-16 opacity-0 invisible transition-property: all; duration-2000 ease-out",
              "selections": ["good", "bad", "ok"]
            },
            {
              "id": "rate-description",
              "type": "text",
              "classNames": "absolute bottom-8 left-8 italic opacity-0 invisible transition-property: all; duration-2000 ease-out",
              "content": "Use the arrows to rate the officer's performance. Click Submit when you are ready."
            }

 */
