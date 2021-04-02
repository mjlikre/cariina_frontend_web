import React, { useState, useEffect } from "react";
import IndividualField from "./IndividualField";
import { connect } from "react-redux";
import { fillForm } from "../../actions/forms";
import Modal from "../Modal/Modal"
const FormToFill = ({ form, fillForm }) => {
  const [showModal, setShowModal] = useState(false)
  const [formFields, setFormFields] = useState([]);
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    if (form) {
      let data = [];
      form.form_fields.map((item, index) => {
        let field = {
          index: item.index,
          label: item.label,
          options: item.options,
          type: item.type,
          answer: "",
        };
        if (item.type === 3) {
          field.answer = new Array(item.options.length).fill(false);
        }
        return data.push(field);
      });
      setFormFields(data);
    }
  }, [form]);

  const handleAnswerChange = (answer, childIndex) => {
    let data = [...formFields];
    data[childIndex].answer = answer;
    setFormFields(data);
  };

  const renderFormFields = (formFields) => {
    if (formFields.length > 0) {
      return formFields.map((field, index) => {
        if (selected === index) {
          return (
            <div className="form-to-fill-wrapper" key={field.form_id} style = {{border: "1px solid black", borderLeft: `8px solid ${form.styles.highlight_color}`}} >
              <IndividualField
                field={field}
                answerChange={handleAnswerChange}
                parentIndex={index}
                key={field.form_id}
                
              />
            </div>
          );
        }else{
          return (
            <div className="form-to-fill-wrapper" key={field.form_id} onClick = {()=> {setSelected(index)}} >
              <IndividualField
                field={field}
                answerChange={handleAnswerChange}
                parentIndex={index}
                key={field.form_id}
                
              />
            </div>
          );
        }
        
      });
    }
  };

  return (
    <>
        <h1>{form.form_title}</h1>
      {renderFormFields(formFields)}
  
      <button
        className="add-button"
        style = {{width: "200px", margin: "10px auto"}}
        onClick={() => {
            let data = {
                form_id: form.form_id,
                data: {
                  form_fields_answer: formFields,
                  form_creator: form.form_creator,
                  form_title: form.form_title,
                },
              }
          fillForm(data);
          setShowModal(true)
        }}
      >
        Submit
      </button>
      <br/>
      <br/>
      <br/>
      <br/>
      <Modal message = "Thank you for filling this form, your input is greatly appretiated" show = {showModal} setShow = {()=> {setShowModal(false)}} title= "Thank you!">
      </Modal>
    </>
  );
};

export default connect(null, { fillForm })(FormToFill);
