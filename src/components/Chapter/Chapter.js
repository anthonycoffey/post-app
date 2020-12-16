import React from "react";
import renderHTML from 'react-render-html';

import "./Chapter.scss";

const Chapter = ({ content, pageId }) => {
  const { background, elements, type } = content.pages[pageId];
  const wrapperStyle = {
    background: background,
  };
  console.log(elements);
  return (
    <div className={`chapter-wrapper ${type}`} style={wrapperStyle}>
      {elements.map((element, index) => {
        if (element.type === "image") {
          return (
            <div className="image-wrapper" key={index} style={element.style}>
              <img
                src={element.url}
                alt={element.alt}
              />
            </div>
          );
        } else if (element.type === "content") {
          return (
            <div className="content-wrapper" key={index} style={element.style}>
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

export default Chapter;
