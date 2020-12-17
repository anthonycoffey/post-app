import React from "react";
import "./Home.scss";

const Home = ({
  course,
  setChapterIndex,
  setHeaderTitle,
}) => {
  const handleNavigation = (index, title) => () => {
    setChapterIndex(index);
    setHeaderTitle(title);
  };
  return (
    <div className="home-wrapper">
      <div className="course-title">{course.courseTitle}</div>
      <div className="course-sub-title">{course.courseSubTitle}</div>
      <div className="chapters">
        {course.chapters.map((chapter, index) => (
          <div
            className="chapter"
            key={index}
            onClick={handleNavigation(chapter.id, chapter.title)}
          >
            {chapter.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
