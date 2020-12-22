import React from "react";
import { useSelector } from "react-redux";
import Chapter from "./Chapter/Chapter";
import Home from "./Home/Home";

const Player = () => {
  const course = useSelector((state) => state.course.course);
  const { chapterIndex } = useSelector((state) => state.status);
  return (
    <div className="player-wrapper">
      {course.chapters ? (
        chapterIndex < 0 ? (
          <Home course={course} />
        ) : (
          <Chapter content={course.chapters[chapterIndex]} />
        )
      ) : null}
    </div>
  );
};

export default Player;
