import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Player from "./container/Player/Player";
import FooterNav from "./container/FooterNav/FooterNav";
import HeaderNav from "./container/HeaderNav/HeaderNav";
import Loader from "react-loader-spinner";
import { getCourseRequest } from "./store/actions/course.action";

const App = () => {
  const [isLoading, setLoadingStatus] = useState(true);
  const dispatch = useDispatch();
  const { chapterIndex, isInitial } = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(getCourseRequest());
    setLoadingStatus(false);
  }, []);

  return (
    <div className="App">
      <div className="app-container" id="app-container">
        <HeaderNav />

        {!isLoading ? (
          <Player />
        ) : (
          <div className="player-wrapper">
            <div className="flex justify-center mt-24">
              <Loader color="#00BFFF" height={80} width={80} />
            </div>
          </div>
        )}
        {chapterIndex !== -1 || isInitial ? <FooterNav /> : null}
      </div>
    </div>
  );
};

export default App;
