import React, { useState } from "react";
import Player from "./components/Player";
import FooterNav from "./components/FooterNav/FooterNav";
import HeaderNav from "./components/HeaderNav/HeaderNav";

const App = () => {
  const [chapterId, setChapterId] = useState(-1);
  const [pageId, setPageId] = useState(0);
  const [headerTitle, setHeaderTitle] = useState("Main Menu");

  const handleChapterId = (id, title) => () => {
    setChapterId(id);
    setHeaderTitle(title);
  };
  const handlePageId = (id, title) => () => {
    setChapterId(id);
    setHeaderTitle(title);
  };

  return (
    <div className="App">
      <div className="flex flex-col justify-center">
        <HeaderNav headerTitle={headerTitle} setChapterId={handleChapterId} />
        <Player
          chapterId={chapterId}
          setChapterId={handleChapterId}
          pageId={pageId}
          setPageId={handlePageId}
        />
        <FooterNav
          chapterId={chapterId}
          setChapterId={handleChapterId}
          pageId={pageId}
          setPageId={handlePageId}
        />
      </div>
    </div>
  );
};

export default App;
