import React from "react";

const HeaderNav = () => {
  return (
    <div className="bg-black absolute top-0 w-full">
      <div className="flex py-4 px-2 justify-between">
        <div>
          <span className="font-bold italic text-white">
            Main Menu
          </span>
        </div>
        <div>
          <span className="font-bold italic text-white">Menu</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
