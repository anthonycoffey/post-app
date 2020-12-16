import React, { useEffect } from "react";
import { connect } from "react-redux";
import Chapter from "./Chapter/Chapter";
import Home from "./Home/Home";
import { getCourseRequest } from "../store/actions/course.action";

const Player = ({
  chapterId,
  pageId,
  setChapterId,
  setPageId,
  course,
  getCourse,
}) => {
  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("chapterId", chapterId, pageId);
  return (
    <div className="player-wrapper">
      {course.chapters ? (
        chapterId < 0 ? (
          <Home
            chapters={course.chapters}
            courseTitle={course.courseTitle}
            courseSubTitle={course.courseSubTitle}
            setChapterId={setChapterId}
          />
        ) : (
          <Chapter content={course.chapters[chapterId]} pageId={pageId} />
        )
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    course: { course },
  } = state;
  return { course };
};

const mapDispatchToProps = (dispatch) => ({
  getCourse: () => dispatch(getCourseRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
