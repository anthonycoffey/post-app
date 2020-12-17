import React, { useEffect, createRef } from "react";
import { TweenLite } from "gsap";
import renderHTML from "react-render-html";
import "./Page.scss";

const Page = ({ elements, style }) => {
  let elementRefs = [];
  useEffect(() => {
    playSequence(elements);
  });
  const playSequence = elements => {
    elements.forEach((element, index) => {
      const {animations} = element;
      animations.forEach(animation => {
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
    <div className="page-wrapper" style={style}>
      {elements.map((element, index) => {
        const elementRef = createRef();
        elementRefs.push(elementRef);
        if (element.type === "shape") {
          return (
            <div className="shape" ref={elementRef} key={index} style={element.style}>
            </div>
          );
        } else if (element.type === "image") {
          return (
            <div
              ref={elementRef}
              className="image-wrapper"
              style={element.style}
              key={index}
            >
              <img src={`${process.env.PUBLIC_URL}${element.url}`} alt={element.alt} />
            </div>
          );
        } else if (element.type === "content") {
          return (
            <div ref={elementRef} className="content-wrapper" key={index} style={element.style}>
              {element.title ? (
                <div className="title" style={element.title.style}>
                  {element.title.content}
                </div>
              ) : null}
              {element.description ? (
                <div className="description" style={element.description.style}>
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
