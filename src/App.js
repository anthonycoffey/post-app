import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Player from "./components/Player";
import FooterNav from "./components/FooterNav/FooterNav";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import { getCourseRequest } from "./store/actions/course.action";

const App = ({ course, getCourse }) => {
  const [chapterIndex, setChapterIndex] = useState(-1);
  const [pageIndex, setPageIndex] = useState(0);
  const [headerTitle, setHeaderTitle] = useState("Main Menu");
  let totalPageCount = 0;

  useEffect(() => {
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChapterIndex = (index) => {
    setChapterIndex(index);
    setPageIndex(0);
  };
  const handlePageIndex = (index) => () => {
    if (pageIndex === 0) {
      setPageIndex(0);
    }
    setPageIndex(index);
  };
  const initialCourse = course;

  if (initialCourse && chapterIndex > -1) {
    totalPageCount = initialCourse.chapters[chapterIndex].pages.length;
  }
  console.log(totalPageCount);

  return (
    <div className="App">
      <div className="flex flex-col justify-center">
        <HeaderNav
          headerTitle={headerTitle}
          setChapterIndex={handleChapterIndex}
          setHeaderTitle={setHeaderTitle}
        />
        <Player
          course={initialCourse}
          chapterIndex={chapterIndex}
          pageIndex={pageIndex}
          setChapterIndex={handleChapterIndex}
          setHeaderTitle={setHeaderTitle}
        />
        {
          chapterIndex > -1 ? (
            <FooterNav
              pageIndex={pageIndex}
              totalPageCount={totalPageCount}
              setPageIndex={handlePageIndex}
            />
          ) : null
        }
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
