import React from "react";
import Initial1 from "./Initial1/Initial1";
import Initial2 from "./Initial2/Initial2";
import Initial3 from "./Initial3/Initial3";
import Initial4 from "./Initial4/Initial4";
import "./Initial.scss";

const Initial = ({ initialIndex }) => {
  const components = {
    0: Initial1,
    1: Initial2,
    2: Initial3,
    3: Initial4,
  };

  const TagName = components[initialIndex];
  return (
    <div className="initial-wrapper">
      <TagName />
    </div>
  );
};

export default Initial;
