import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Chapter from "./Chapter";
import { getCourseRequest } from "../store/actions/course.action";

const Player = ({ course, getCourse }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log({course});
  return (
    <div className="player-wrapper">
      <h1>
        {course.courseId}
      </h1>
      <p>page number: {count + 1}</p>
      {
        course.chapters ? (
          <Chapter
            key={count}
            data={course.chapters[count]}
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
