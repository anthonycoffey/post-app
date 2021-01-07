import React from "react";
import { useSelector } from "react-redux";
import Initial1 from "./Initial1/Initial1";
import "./Initial.scss";

const Initial = ({ initialIndex }) => {
  const components = {
    0: Initial1,
  };
  const TagName = components[initialIndex || 0];

  return (
    <div className="initial-wrapper">
      <TagName />
    </div>
  );
};

export default Initial;
