import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Player from "./components/Player";
import FooterNav from "./components/FooterNav/FooterNav";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import Loader from "react-loader-spinner";
import { getCourseRequest } from "./store/actions/course.action";

const App = () => {
  const [isLoading, setLoadingStatus] = useState(true);
  const dispatch = useDispatch();
  const { chapterIndex, isInitial } = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(getCourseRequest());
    setLoadingStatus(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="flex flex-col justify-center">
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
