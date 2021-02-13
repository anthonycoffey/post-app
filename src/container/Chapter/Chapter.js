import React from "react";
import { useSelector } from "react-redux";

import Page from "../Page/Page";
import "./Chapter.scss";

const Chapter = ({ content }) => {
  const { pageIndex } = useSelector((state) => state.status);

  if (content.pages.length < 1) {
    return null;
  }
  const { style, elements, classNames, id } = content.pages[pageIndex];

  if (!elements) return null;

  return (
    <div className="chapter-wrapper default">
      <Page
        elements={elements}
        style={style || {}}
        classNames={classNames || ""}
        key={id}
      />
    </div>
  );
};

export default Chapter;
