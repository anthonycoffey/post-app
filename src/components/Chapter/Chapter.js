import React from "react";
import { useSelector } from "react-redux";

import Page from "../Page/Page";
import Activity from "../Activity/Activity";

import "./Chapter.scss";

const Chapter = ({ content }) => {
  const { pageIndex } = useSelector((state) => state.status);

  if (content.pages.length < 1) {
    return null;
  }
  const { style, elements, classNames, type } = content.pages[pageIndex];

  if (!elements) return null;
  if (type === "activity") {
    return (
      <div className="chapter-wrapper default">
        <Activity
          elements={elements}
          style={style || {}}
          classNames={classNames || ""}
        />
      </div>
    );
  }

  return (
    <div className="chapter-wrapper default">
      <Page
        elements={elements}
        style={style || {}}
        classNames={classNames || ""}
      />
    </div>
  );
};

export default Chapter;
