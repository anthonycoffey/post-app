import React, { useEffect, createRef } from "react";
import { TweenLite } from "gsap";
import renderHTML from "react-render-html";

const Page = ({ elements }) => {
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
    <div>
      {elements.map((element, index) => {
        const elementRef = createRef();
        elementRefs.push(elementRef);
        if (element.type === "shape") {
          return (
            <div className={element.shape} ref={elementRef}>
              shape
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
              <img src={element.url} alt={element.alt} />
            </div>
          );
        } else if (element.type === "content") {
          return (
            <div ref={elementRef} className="content-wrapper" key={index}>
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
