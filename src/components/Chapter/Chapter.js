import React from "react";
import Page from "./components/Page";

import "./Chapter.scss";

const Chapter = ({ content, pageIndex }) => {
  const { style, elements, classNames } = content.pages[pageIndex];
  return (
    <div className="chapter-wrapper default">
      <Page elements={elements} style={style} classNames={classNames} />
    </div>
  );
};

export default Chapter;
