import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CoursePage from "./CoursePage";
import { getCourseRequest } from "../store/actions/course.action";

const Player = ({ course, getCourse }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(course);
  return (
    <div className="player-wrapper">
      <h1>
        {course.course}: {course.module}
      </h1>
      <p>page number: {count + 1}</p>
      {
        course.pages ? (
          <CoursePage
            key={count}
            page={course.pages[count]}
          />
        ) : null
      }
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
