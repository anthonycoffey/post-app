import React from "react";
import { useDispatch } from "react-redux";

import "./Home.scss";

import { setHeaderTitleRequest } from "../../store/actions/status.action";
import { setChapterIndexRequest } from "../../store/actions/status.action";

const Home = ({ course }) => {
  const dispatch = useDispatch();
  const handleNavigation = (index, title) => {
    dispatch(setChapterIndexRequest(index));
    dispatch(setHeaderTitleRequest(title));
  };
  return (
    <div className="home-wrapper">
      <div className="chapters md:grid lg:grid">
        {course.menu.map((item, index) => (
          <div
            className={`font-serif chapter ${item.id}`}
            key={index}
            onClick={() => handleNavigation(item.id, item.title)}
          >
            <div className="chapter-image">
              <img
                src={`${process.env.PUBLIC_URL}${item.image}`}
                alt=""
                width="100px"
                height="100px"
              />
            </div>
            {index > 0 ? (
              <div className="ml-6 w-auto">
                {index}. {item.title}
              </div>
            ) : (
              <div className="ml-6 w-auto">Introduction</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
