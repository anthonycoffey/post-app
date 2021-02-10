import React from "react";
import { useDispatch } from "react-redux";
import { setPageIndexRequest } from "../../../../store/actions/status.action";
import "./List.scss";

const List = ({ data }) => {
  const dispatch = useDispatch();
  const handleItemClick = (index) => {
    dispatch(setPageIndexRequest(index));
  };
  return (
    <div
      id={data.id}
      className={`shape ${data.classNames || ""}`}
      style={data.style || {}}
    >
      {data.items.map((item, index) => {
        return (
          <div
            className="list-item-wrapper flex items-start content-start"
            key={index}
            onClick={() => handleItemClick(item.pageIndex)}
          >
            <div className="bullet"></div>
            <div className="list-item-title">{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
