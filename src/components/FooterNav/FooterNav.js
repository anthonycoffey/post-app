import React from "react";
import "./FooterNav.scss";

const FooterNav = ({
  chapterIndex,
  pageIndex,
  setPageIndex,
  totalChapterCount,
  totalPageCount,
}) => {
  return (
    <div className="footer-nav absolute bottom-0 bg-black w-full">
      <div className="flex justify-between">
        <div
          className={`back ${pageIndex < 1 ? "hide" : ""}`}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Back
        </div>
        <div
          className={`next ${chapterIndex === totalChapterCount - 1 && pageIndex === totalPageCount - 1 ? "hide" : ""}`}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
