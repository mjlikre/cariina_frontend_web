import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import LabelWrapper from "./LabelWrapper";
import { Dropdown } from "react-bootstrap";

const IndividualField = ({ field, answerChange, parentIndex, key }) => {
  const [multi, setMulti] = useState(field.answer);
  const handleMultiSelect = (index) => {
    let data = [...multi];
    data[index] = !data[index];
    setMulti(data);
    answerChange(data, parentIndex)
  };
  const typeChecking = () => {
    if (field.type === 0) {
      return (
        <LabelWrapper label={field.label}>
          <input
            type="text"
            value= {field.answer}
            onChange={(e) => {
                answerChange(e.target.value, parentIndex)
                console.log(field.index)
            }}
          />
        </LabelWrapper>
      );
    } else if (field.type === 1) {
      return (
        <LabelWrapper label={field.label}>
          <textarea
            rows="5"
            cols="60"
            name="description"
            value= {field.answer}
            onChange={(e) => {
              answerChange(e.target.value, parentIndex)
            }}
          />
        </LabelWrapper>
      );
    } else if (field.type === 2) {
      return (
        <LabelWrapper label={field.label}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {field.answer}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {field.options.length > 0
                ? field.options.map((option, index) => {
                    return (
                      <Dropdown.Item
                        href="#/action-1"
                        onClick={() => {
                          answerChange(option, parentIndex)
                        }}
                      >
                        {option}
                      </Dropdown.Item>
                    );
                  })
                : null}
            </Dropdown.Menu>
          </Dropdown>
        </LabelWrapper>
      );
    } else if (field.type === 3) {
      return (
        <LabelWrapper label={field.label}>
          {field.options.length > 0
            ? field.options.map((option, index) => {
                return (
                  <div>
                    <input
                      defaultChecked={ field.answer[index]}
                      type="checkbox"
                      key={option + index}
                      onChange={(event) => {
                        handleMultiSelect(index);
                      }}
                    />
                    {option}
                  </div>
                );
              })
            : null}
        </LabelWrapper>
      );
    } else if (field.type === 4) {
      return (
        <LabelWrapper label={field.label}>
          <DatePicker onChange={(date) => {answerChange(date, parentIndex)}} value= {field.answer} />
        </LabelWrapper>
      );
    } else if (field.type === 5) {
      return (
        <LabelWrapper label={field.label}>
          <TimePicker onChange={(time) => {answerChange(time, parentIndex)}}  value={field.answer} />
        </LabelWrapper>
      );
    } else if (field.type === 6) {
      return (
        <LabelWrapper label={field.label}>
          <input
            type="number"
            value={field.answer}
            onChange={(e) => {
              answerChange(e.target.value, parentIndex)
            }}
          />
        </LabelWrapper>
      );
    }
  };
  return <div key = {key}>{typeChecking()}</div>;
};

export default IndividualField;
