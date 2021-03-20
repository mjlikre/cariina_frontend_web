import React, { useState, useEffect } from "react";
import IndividualField from "./IndividualField";
import { connect } from "react-redux";
import { fillForm } from "../../actions/forms";
const FormToFill = ({ form, fillForm }) => {
  const [formFields, setFormFields] = useState([]);
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
        return (
          <div className="form-to-fill-wrapper" key={field.form_id}>
            <IndividualField
              field={field}
              answerChange={handleAnswerChange}
              parentIndex={index}
              key={field.form_id}
            />
          </div>
        );
      });
    }
  };

  return (
    <>
      {renderFormFields(formFields)}{" "}
      <button
        className="add-button"
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
          console.log(data)
        }}
      >
        Submit
      </button>
    </>
  );
};

export default connect(null, { fillForm })(FormToFill);
