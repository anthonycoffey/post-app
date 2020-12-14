import React from "react";
import Player from "./components/Player";
import courseData from "./course_data.json"
import FooterNav from "./components/FooterNav";
import HeaderNav from "./components/HeaderNav";
function App() {
  return (
    <div className="App">
      <div className="flex flex-col justify-center">
        <HeaderNav />
        <Player data={courseData} />
        <FooterNav/>
      </div>
    </div>
  );
}

export default App;
