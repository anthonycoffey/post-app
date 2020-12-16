import React from "react";
import "./FooterNav.scss";

const FooterNav = () => {
  return (
    <div className="footer-nav absolute bottom-6 w-full">
      <div className="flex py-2 justify-between">
        <div className="back bg-black font-bold italic text-white">
          Back
        </div>
        <div className="next bg-black font-bold italic text-white">
          Next
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
