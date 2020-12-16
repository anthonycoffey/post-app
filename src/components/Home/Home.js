import React from "react";
import "./Home.scss";

const Home = ({ chapters, courseTitle, courseSubTitle, setChapterId }) => {
  return (
    <div className="home-wrapper">
      <div className="course-title">{courseTitle}</div>
      <div className="course-sub-title">{courseSubTitle}</div>
      <div className="chapters">
        {chapters.map((chapter, index) => (
          <div
            className="chapter"
            key={index}
            onClick={setChapterId(chapter.id, chapter.title)}
          >
            {chapter.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
