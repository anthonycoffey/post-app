import React, { useState, useEffect } from "react";
import renderHTML from "react-render-html";
import { TweenLite } from "gsap";

import "./Checkbox.scss";

const Checkbox = ({ elements, elementsPanel, classNames, style, handleSkills }) => {
  const [elementsState, setElementsState] = useState([]);
  const [elementPanelsState, setElementPanelsState] = useState([]);
  useEffect(() => {
    setElementsState(elements);
  }, [elements]);
  useEffect(() => {
    setElementPanelsState(elementsPanel);
  }, [elementsPanel]);

  useEffect(() => {
    playSequence();
  }, [elementPanelsState]);

  const updateValue = (index, value) => {
    const tempState = elementsState.slice();
    handlePanelShowing(tempState[index].id);
    tempState.forEach((temp, tempIndex) => {
      if (index === tempIndex) {
        if (!temp.classNames.includes('active')) {
          temp.classNames += ' active';
        } else {
          temp.classNames = temp.classNames.replace('normal', 'active');
        }
      } else {
        if (!temp.classNames.includes('normal')) {
          temp.classNames += ' normal';
        }
        temp.classNames = temp.classNames.replace('active', 'normal');
      }
    });
    if (!value) {
      return;
    }
    tempState[index].value = value;
    setElementsState(tempState);
    handleSkills(tempState);
  };
  const handleSkillClick = (index) => {
    const tempState = elementsState.slice();
    handlePanelShowing(tempState[index].id);
    tempState.forEach((temp, tempIndex) => {
      if (index === tempIndex) {
        if (!temp.classNames.includes('active')) {
          temp.classNames += ' active';
        } else {
          temp.classNames = temp.classNames.replace('normal', 'active');
        }
      } else {
        if (!temp.classNames.includes('normal')) {
          temp.classNames += ' normal';
        }
        temp.classNames = temp.classNames.replace('active', 'normal');
      }
    });
    if (tempState[index].value) {
      return;
    }

    tempState[index].value = !tempState[index].value;
    setElementsState(tempState);
    handleSkills(tempState);
  }
  const handlePanelShowing = (id) => {
    const tempPanels = elementPanelsState.slice();
    tempPanels.forEach(tempPanel => {
      if (tempPanel.id === id) {
        tempPanel.classNames = tempPanel.classNames.replace('hidden', 'block');
      } else {
        tempPanel.classNames = tempPanel.classNames.replace('block', 'hidden');
      }
    });
    setElementPanelsState(tempPanels);
  }

  const playSequence = () => {
    elementPanelsState.forEach((element) => {
      const { animations } = element;
      if (animations) {
        animations.forEach((animation) => {
          let { x, y, delay } = animation;
          if (animation.type === "to") {
            TweenLite.to(document.getElementById(element.id), delay, {
              x: x,
              y: y,
            });
          } else if (animation.type === "from") {
            TweenLite.from(document.getElementById(element.id), delay, {
              x: x,
              y: y,
            });
          }
        });
      }
    });
  };

  return (
    <div className={classNames} style={style}>
      {elementsState.map((skill, index) => (
        <div
          className={skill.classNames || ""}
          style={skill.style || {}}
          key={index}
          onClick={() => handleSkillClick(index)}
        >
          <div className="caption text-bold text-title pr-6">{skill.caption}</div>
          <label className="option">
            <input
              type="checkbox"
              id="checkbox"
              value={true}
              checked={skill.value}
              onChange={(event) => updateValue(index, event.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      ))}
      {
        elementPanelsState.map((element, index) => (
          <div
              id={element.id}
              className={`content-wrapper ${
                element.classNames ? element.classNames : ""
              }`}
              key={index}
              style={element.style || {}}
            >
              {element.title ? (
                <div
                  className={`title ${element.title.classNames || ""}`}
                  style={element.title.style || {}}
                >
                  {element.title.content}
                </div>
              ) : null}
              {element.description ? (
                <div
                  className={`description ${
                    element.description.classNames || ""
                  }`}
                  style={element.description.style || {}}
                >
                  {renderHTML(element.description.content)}
                </div>
              ) : null}
            </div>
        ))
      }
    </div>
  );
};

export default Checkbox;
