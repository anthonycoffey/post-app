import React from "react";
import { useDispatch } from "react-redux";
import {
  setChapterIndexRequest,
  setPageIndexRequest,
} from "../../../../store/actions/status.action";

const CustomButton = ({ data }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    if (data.action === "goToMenu") {
      dispatch(setChapterIndexRequest(-1));
      dispatch(setPageIndexRequest(0));
    }
  };
  return (
    <button
      id={data.id}
      className={`shape ${data.classNames || ""}`}
      style={data.style || {}}
      onClick={() => handleClick()}
    >
      {data.title}
    </button>
  );
};

export default CustomButton;
