import React from "react";
import Page from "../Page/Page";

import "./Chapter.scss";

const Chapter = ({ content, pageIndex }) => {
  if (content.pages.length < 1) {
    return null;
  }
  const { style, elements, classNames } = content.pages[pageIndex];
  return (
    <div className="chapter-wrapper default">
      <Page elements={elements} style={style || {} } classNames={classNames || ""} />
    </div>
  );
};

export default Chapter;
