import React, { useState, useEffect } from "react";
import "./TestDragDrop.scss";

const DropDemo = () => {
  const [items, setItems] = useState([
    { name: "Angular", category: "wip", bgcolor: "yellow" },
    { name: "React", category: "wip", bgcolor: "pink" },
    { name: "Vue", category: "wip", bgcolor: "skyblue" },
  ]);
  const [final, setFinal] = useState({
    wip: [],
    complete: [],
  });
  const filterFunc = () => {
    const temp = {
      wip: [],
      complete: [],
    };
    items.forEach((t) => {
      temp[t.category].push(
        <div
          key={t.name}
          onDragStart={(e) => onDragStart(e, t.name)}
          draggable={temp[t.category].length < 1}
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}
        >
          {t.name}
        </div>
      );
    });
    setFinal(temp);
  };

  useEffect(() => {
    filterFunc();
  }, []);

  const onDragStart = (ev, id) => {
    console.log("dragstart", id);
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    console.log("dragover");
    ev.preventDefault();
  };

  const onDrop = (ev, cat) => {
    console.log(cat);
    let id = ev.dataTransfer.getData("id");

    let tasks = items.filter((task) => {
      if (cat === "wip") {
        if (task.name === id) {
          task.category = cat;
        }
      } else {
        if (final.complete.length < 1) {
          if (task.name === id) {
            task.category = cat;
          }
        }
      }
      return task;
    });
    setItems(tasks);
    filterFunc();
  };

  return (
    <div className="container-drag">
      <h2 className="header">DRAG & DROP DEMO</h2>
      <div
        className="wip"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => {
          onDrop(e, "wip");
        }}
      >
        <span className="task-header">WIP</span>
        {final.wip}
      </div>
      <div
        className="droppable"
        onDragOver={(e) => onDragOver(e)}
        onDrop={(e) => onDrop(e, "complete")}
      >
        <span className="task-header">COMPLETED</span>
        {final.complete}
      </div>
    </div>
  );
};

export default DropDemo;
