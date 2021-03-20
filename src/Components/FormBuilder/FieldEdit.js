import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import deleteIcon from "../../delete.png";
import doneIcon from "../../done.png";
/* this component is going to take in item as props, changeOptions */
const FieldEdit = ({ item, changeOption }) => {
  const [selected, setSelected] = useState();
  const [tempValue, setTempValue] = useState({});
  useEffect(() => {
    return () => {
      let newData = [...item.options];
      if (newData[selected] !== tempValue.option) {
        newData[selected] = tempValue.option;
        changeOption(newData);
      }
    };
  });
  const optionsOnClick = (index, option) => {
    let newData = [...item.options];
    if (newData[selected] !== tempValue.option) {
      newData[selected] = tempValue.option;
      changeOption(newData);
    }

    setSelected(index);
    setTempValue({ index: index, option: option });
  };
  const handleNewOption = () => {
    let newData = [...item.options, ""];
    console.log(tempValue);
    newData[selected] = tempValue.option;
    changeOption(newData);
  };
  const handleDelete = (index) => {
    let newData = [...item.options];
    newData.splice(index, 1);
    setSelected(0);
    setTempValue({ index: 0, option: item.options[0] });
    changeOption(newData);
  };

  const renderOptions = () => {
    if (item && item.options.length !== 0) {
      return item.options.map((option, index) => {
        if (index !== selected) {
          return (
            <div
              className="form-options"
              key={index}
              onClick={() => {
                optionsOnClick(index, option);
              }}
            >
              <input className="form-checkbox" type="checkbox" disabled />{" "}
              {option ? (
                option
              ) : (
                <div style={{ color: "gray" }}>click to add text</div>
              )}
            </div>
          );
        } else {
          return (
            <div className="form-options" key={index}>
              <input className="form-checkbox" type="checkbox" disabled />
              <input
                autoFocus
                className="option-input-box"
                type="text"
                placeholder="Enter Option"
                value={tempValue.option}
                onChange={(e) => {
                  setTempValue({ ...tempValue, option: e.target.value });
                }}
              />
              {item.options.length > 1 ? (
                <button
                  className="delete-button"
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  <img className="icon-img" src={deleteIcon} />
                </button>
              ) : null}
            </div>
          );
        }
      });
    } else {
      return null;
    }
  };
  if (item.type) {
    if (item.type === 0) {
      return <div className="form form-short">Short Answer</div>;
    } else if (item.type === 1) {
      return <div className="form form-long">Long Answer</div>;
    } else if (item.type === 2 || item.type === 3) {
      return (
        <div className="form form-select">
          {renderOptions()}
          <button
            className="add-button"
            onClick={() => {
              handleNewOption();
            }}
          >
            Add Option
          </button>
        </div>
      );
    } else if (item.type === 4) {
      return <div className="form form-date">Date</div>;
    } else if (item.type === 5) {
      return <div className="form form-time">Time</div>;
    } else if (item.type === 6) {
      return <div className="form form-num">Number</div>;
    } else {
      return <div></div>;
    }
  } else {
    return <div>Loading</div>;
  }
};

export default connect(null, {})(FieldEdit);
