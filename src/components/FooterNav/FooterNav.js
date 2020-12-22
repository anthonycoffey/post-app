import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../store/actions/status.action";
import "./FooterNav.scss";

const FooterNav = () => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const { chapterIndex, pageIndex } = useSelector((state) => state.status);
  let totalPageCount = 0;
  let totalChapterCount = 0;

  if (course && chapterIndex > -1) {
    totalPageCount = course.chapters[chapterIndex].pages.length;
    totalChapterCount = course.chapters.length;
  }

  const handleChapterIndex = (index) => {
    if (index <= totalChapterCount - 1) {
      dispatch(setChapterIndexRequest(index));
    }
    dispatch(setPageIndexRequest(0));
  };

  const handlePageIndex = (index) => {
    if (index === totalPageCount || totalPageCount === 0) {
      handleChapterIndex(chapterIndex + 1);
    } else {
      dispatch(setPageIndexRequest(index));
    }
  };

  return (
    <div className="footer-nav absolute bottom-0 bg-black w-full">
      <div className="flex justify-between">
        <div
          className={`back ${chapterIndex === 0 && pageIndex < 1 ? "hide" : ""}`}
          onClick={() => handleChapterIndex(chapterIndex - 1)}
        >
          Back
        </div>
        <div
          className={`next ${
            chapterIndex === totalChapterCount - 1 &&
            (pageIndex === totalPageCount - 1 || totalPageCount === 0)
              ? "hide"
              : ""
          }`}
          onClick={() => handlePageIndex(pageIndex + 1)}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
