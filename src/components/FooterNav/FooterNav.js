import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex } from "lodash";
import {
  setPageIndexRequest,
  setChapterIndexRequest,
} from "../../store/actions/status.action";
import "./FooterNav.scss";

const FooterNav = () => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course.course);
  const { chapterIndex, pageIndex, initialIndex, isInitial } = useSelector(
    (state) => state.status
  );
  const currentChapterIndex = findIndex(course.menu, ["id", chapterIndex]);
  let totalPageCount = 0;
  let totalChapterCount = 0;

  if (course && chapterIndex !== -1) {
    totalPageCount = find(course.content, ["id", chapterIndex]).pages.length;
    totalChapterCount = course.menu.length;
  }

  const handleChapterIndex = (index) => {
    if (index <= totalChapterCount - 1) {
      dispatch(setChapterIndexRequest(course.menu[index].id));
    }
    dispatch(setPageIndexRequest(0));
  };

  const handlePageIndex = (index) => {
    if (index === totalPageCount || totalPageCount === 0) {
      handleChapterIndex(currentChapterIndex + 1);
    } else {
      dispatch(setPageIndexRequest(index));
    }
  };

  return (
    <div className="footer-nav absolute bottom-0 bg-black w-full">
      <div className="flex justify-between">
        <div
          className={`back ${
            !isInitial
              ? currentChapterIndex === 0 && pageIndex < 1
                ? "hide"
                : ""
              : initialIndex === 0
              ? "hide"
              : ""
          }`}
          onClick={() => handleChapterIndex(currentChapterIndex - 1)}
        >
          Back
        </div>
        <div
          className={`next ${
            !isInitial
              ? currentChapterIndex === totalChapterCount - 1 &&
                (pageIndex === totalPageCount - 1 || totalPageCount === 0)
                ? "hide"
                : ""
              : initialIndex > 3
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
