import React from "react";
import renderHTML from 'react-render-html';
import Page from "./components/Page"

import "./Chapter.scss";

const Chapter = ({ content, pageId }) => {
  const { background, elements, type } = content.pages[pageId];
  const wrapperStyle = {
    background: background,
  };
  return (
    <div className={`chapter-wrapper ${type}`} style={wrapperStyle}>
      <Page elements={elements}/>
    </div>
  );
};

export default Chapter;
