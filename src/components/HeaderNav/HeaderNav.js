import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setChapterIndexRequest,
  setPageIndexRequest,
  setHeaderTitleRequest,
} from "../../store/actions/status.action";

import "./HeaderNav.scss";

const HeaderNav = () => {
  const headerTitle = useSelector((state) => state.status.headerTitle);
  const dispatch = useDispatch();
  const handleNavigation = (index, title) => () => {
    dispatch(setHeaderTitleRequest(title));
    dispatch(setChapterIndexRequest(index));
    dispatch(setPageIndexRequest(0));
  };

  return (
    <div className="header-nav bg-black absolute top-0 w-full px-4">
      <div className="flex py-4 px-2 justify-between">
        <div>
          <span className="font-bold italic text-white">{headerTitle}</span>
        </div>
        <div
          className="home font-bold italic text-white"
          onClick={handleNavigation(-1, "Main Menu")}
        >
          Menu
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
