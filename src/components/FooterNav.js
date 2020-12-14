import React from "react";

const FooterNav = () => {
  return (
    <div className="bg-black absolute bottom-0 w-full">
      <div className="flex py-2 px-2 justify-between">
        <div>
          <span className="font-bold italic text-white">Prev</span>
        </div>
        <div>
          <span className="font-bold italic text-white">Next</span>
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
