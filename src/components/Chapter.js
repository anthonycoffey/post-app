import React from "react";

const Chapter = ({data}) => {
  // pageCount
  // chapterCount
  console.log(data);
  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
};

export default Chapter;
