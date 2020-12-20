import React from "react";
import Chapter from "./Chapter/Chapter";
import Home from "./Home/Home";

const Player = ({
  course,
  chapterIndex,
  pageIndex,
  setChapterIndex,
  setHeaderTitle,
}) => {
  return (
    <div className="player-wrapper">
      {course.chapters ? (
        chapterIndex < 0 ? (
          <Home
            course={course}
            setChapterIndex={setChapterIndex}
            setHeaderTitle={setHeaderTitle}
          />
        ) : (
          <Chapter
            content={course.chapters[chapterIndex]}
            pageIndex={pageIndex}
          />
        )
      ) : null}
    </div>
  );
};

export default Player;
