import React from "react";
import "./FooterNav.scss";

const FooterNav = ({ pageIndex, setPageIndex, totalPageCount }) => {
  return (
    <div className="footer-nav absolute bottom-0 bg-black w-full">
      <div className="flex justify-between">
        <div
          className={`back ${
            pageIndex < 1 ? "hide" : ""
          }`}
          onClick={setPageIndex(pageIndex - 1)}
        >
          Back
        </div>
        <div
          className={`next ${
            pageIndex < totalPageCount - 1 ? "" : "hide"
          }`}
          onClick={setPageIndex(pageIndex + 1)}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
