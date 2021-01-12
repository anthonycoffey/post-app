import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setChapterIndexRequest,
  setPageIndexRequest,
  setHeaderTitleRequest,
} from "../../store/actions/status.action";

import "./HeaderNav.scss";

const HeaderNav = () => {
  const dispatch = useDispatch();
  const handleNavigation = (index) => {
    dispatch(setChapterIndexRequest(index));
    dispatch(setPageIndexRequest(0));
  };

  return (
    <div className="header-nav bg-black absolute top-0 w-full flex px-6 justify-between items-center">
      <div className="flex items-center">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/post_logo.png`}
          alt=""
          width="40px"
          height="40px"
          className="mr-4"
        />
        <div className="font-bold text-white">
          Racial and Identity Profiling
        </div>
      </div>
      <div
        className="home font-bold text-white"
        onClick={() => handleNavigation(-1)}
      >
        Menu
      </div>
    </div>
  );
};

export default HeaderNav;
