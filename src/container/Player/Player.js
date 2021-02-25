import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { find } from "lodash";

import Chapter from "../Chapter/Chapter";
import Home from "../Home/Home";
import Initial from "../Initial/Initial";

const Player = () => {
  const course = useSelector((state) => state.course.course);
  const { chapterIndex, isInitial, initialIndex } = useSelector(
    (state) => state.status
  );
  const content = find(course.content, ["id", chapterIndex]);
  let pageWidth = null;
  let pageHeight = null;
  let basePage = {
    width: 1024,
    height: 712,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
  };

  useEffect(() => {
    getPageSize();
    scalePages(pageWidth, pageHeight);
  }, [course]);

  useEffect(() => {
    const handleResize = () => {
      getPageSize();
      scalePages(pageWidth, pageHeight);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPageSize = () => {
    pageHeight = document.getElementById("app-container").clientHeight - 112;
    pageWidth = document.getElementById("app-container").clientWidth;
  };

  const scalePages = (maxWidth, maxHeight) => {
    let scaleX = 1;
    let scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = scaleX > scaleY ? scaleY : scaleX;

    const newLeftPos = Math.abs(
      Math.floor((basePage.width * basePage.scale - maxWidth) / 2)
    );
    const newTopPos =
      56 + Math.abs(Math.floor((basePage.height * basePage.scale - maxHeight) / 2));
    const playerPage = document.getElementById("player-wrapper");
    if (playerPage) {
      playerPage.setAttribute(
        "style",
        "-webkit-transform:" +
          "scale(" +
          basePage.scale +
          ");left:" +
          newLeftPos +
          "px;top:" +
          newTopPos +
          "px;"
      );
    }
  };

  if (isInitial) {
    return (
      <div className="player-wrapper" id="player-wrapper">
        <Initial initialIndex={initialIndex} />
      </div>
    );
  }

  return (
    <div className="player-wrapper" id="player-wrapper">
      {course.content ? (
        chapterIndex < 0 ? (
          <Home course={course} />
        ) : (
          <Chapter content={content} />
        )
      ) : null}
    </div>
  );
};

export default Player;
