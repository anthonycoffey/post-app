import React from "react";
import { useSelector } from "react-redux";
import { find } from 'lodash';

import Chapter from "./Chapter/Chapter";
import Home from "./Home/Home";

const Player = () => {
  const course = useSelector((state) => state.course.course);
  const { chapterIndex } = useSelector((state) => state.status);
  const content = find(course.content, ['id', chapterIndex]);
  return (
    <div className="player-wrapper">
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
