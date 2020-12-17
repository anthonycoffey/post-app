import React from "react";
import "./HeaderNav.scss";

const HeaderNav = ({ headerTitle, setChapterIndex, setHeaderTitle }) => {
  const handleNavigation = (index, title) => () => {
    setChapterIndex(index);
    setHeaderTitle(title);
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
