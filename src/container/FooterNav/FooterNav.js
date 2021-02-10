import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { find, findIndex } from "lodash";
import {
  setPageIndexRequest,
  setChapterIndexRequest,
  setInitialIndexRequest,
  setInitialRequest,
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

  const handleChapterIndex = (index, fromNext = false) => {
    if (isInitial) {
      if (initialIndex > 0) {
        dispatch(setInitialIndexRequest(initialIndex - 1));
      }
    } else {
      if (index === -1) {
        dispatch(
          setChapterIndexRequest(course.menu[currentChapterIndex - 1].id)
        );
        dispatch(setPageIndexRequest(0));
      } else {
        if (!fromNext) {
          dispatch(setPageIndexRequest(index));
        } else {
          const chapterId = course.menu[index].id;
          if (find(course.content, ["id", chapterId])) {
            setChapterIndexRequest(course.menu[index].id);
          }
        }
      }

      // if (index <= totalChapterCount - 1) {
      //   dispatch(setChapterIndexRequest(course.menu[index].id));
      // }
    }
  };

  const handlePageIndex = (index) => {
    if (isInitial) {
      if (initialIndex < 3) {
        dispatch(setInitialIndexRequest(initialIndex + 1));
      } else {
        dispatch(setInitialRequest(false));
        dispatch(setPageIndexRequest(0));
        dispatch(setChapterIndexRequest(-1));
      }
    } else {
      console.log(index, totalPageCount);
      if (index === totalPageCount || totalPageCount === 0) {
        handleChapterIndex(currentChapterIndex + 1, true);
      } else {
        dispatch(setPageIndexRequest(index));
      }
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
          onClick={() => handleChapterIndex(pageIndex - 1)}
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
