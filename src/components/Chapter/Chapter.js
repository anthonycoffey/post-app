import React from "react";
import renderHTML from 'react-render-html';
import Page from "./components/Page"

import "./Chapter.scss";

const Chapter = ({ content, pageIndex }) => {
  const { style, elements } = content.pages[pageIndex];
  return (
    <div className="chapter-wrapper default">
      <Page elements={elements} style={style} />
    </div>
  );
};

export default Chapter;
