import React from "react";

const InputArea = (props) => {
  // returns a input box with title. takes in 3 props: title, val, change. title is a string that will populate the label tag,
  // val correspond to the value field of the input tag, ideally you would want to pass in a variable in the parent component's state,
  // and have change take in a funtion that updates that state. 

  //SAMPLE USE CASE <InputArea title = "My input area" val = {myData} change = {(e) => {setMyData(e.target.value)}} />
  return (
    <div className="row">
      <label className="col-md-12">{props.label}</label>
      <input
        className="col-md-12 kjga-input-box"
        type="number"
        autoComplete="off"
        value={props.val}
        onChange={(e) => {props.change(e)}}
      />
    </div>
  );
};

export default InputArea;
