import React, { useEffect, createRef } from "react";
import { TweenLite } from "gsap";
import renderHTML from "react-render-html";

import "./Page.scss";

const Page = ({ elements, style, classNames }) => {
  let elementRefs = [];
  useEffect(() => {
    playSequence();
  }, [elements]);
  const playSequence = () => {
    elements.forEach((element, index) => {
      const { animations } = element;
      animations.forEach((animation) => {
        let elementRef = elementRefs[index];
        let { x, y, delay } = animation;
        if (animation.type === "to") {
          TweenLite.to(elementRef.current, delay, { x: x, y: y });
        } else if (animation.type === "from") {
          TweenLite.from(elementRef.current, delay, { x: x, y: y });
        }
      });
    });
  };
  return (
    <div className={`page-wrapper ${classNames || ""}`} style={style}>
      {elements.map((element, index) => {
        const elementRef = createRef();
        elementRefs.push(elementRef);
        if (element.type === "shape") {
          return (
            <div
              className={`shape ${element.classNames || ""}`}
              ref={elementRef}
              style={element.style || {}}
              key={index}
            ></div>
          );
        } else if (element.type === "image") {
          return (
            <div
              ref={elementRef}
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
              ref={elementRef}
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
        }
      })}
    </div>
  );
};

export default Page;
