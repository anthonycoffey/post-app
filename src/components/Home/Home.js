import React from "react";
import { useDispatch } from "react-redux";

import "./Home.scss";

import { setHeaderTitleRequest } from "../../store/actions/status.action";
import { setChapterIndexRequest } from "../../store/actions/status.action";

const Home = ({ course }) => {
  const dispatch = useDispatch();
  const handleNavigation = (index, title) => {
    dispatch(setChapterIndexRequest(index));
    dispatch(setHeaderTitleRequest(title));
  };
  return (
    <div className="home-wrapper">
      <div className="course-title">{course.courseTitle}</div>
      <div className="course-sub-title">{course.courseSubTitle}</div>
      <div className="chapters">
        {course.menu.map((item, index) => (
          <div
            className="chapter"
            key={index}
            onClick={() => handleNavigation(index, item.title)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
