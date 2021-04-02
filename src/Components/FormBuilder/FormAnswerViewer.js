import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchFilledForm } from "../../actions/forms";
import { Spinner } from "react-bootstrap";
export const FormAnswerViewer = ({ fetchFilledForm, id, filled }) => {
  useEffect(() => {
    fetchFilledForm(id);
  }, []);
  const [formIndex, setFormIndex] = useState(0);

  const renderAnswer = (fieldIndex) => {
    return filled[formIndex].form_fields_answer.map((field, index) => {
      if (field.index === fieldIndex && field.type === 3) {
        return field.options.map((option, index) => {
          return (
            <div>
              <input type="checkbox" defaultChecked={field.answer[index]} />
              {option}
            </div>
          );
        });
      } else if (field.index === fieldIndex && field.type !== 3) {
        return field.answer;
      }
    });
  };

  const renderFormFields = (formIndex) => {
    if (filled.length > 0) {
      return filled[formIndex].form_fields_answer.map((field, index) => {
        return (
          <div className="answer-wrapper" key={field.form_id}>
            <div className="form-input-box">{field.label}</div>
            <div style = {{textAlign: "left"}}>{renderAnswer(field.index)}</div>

            <div></div>
          </div>
        );
      });
    }
  };
  const renderControlButton = () => {
    return (
      <div>
        <button
          className="control-button"
          onClick={() => {
            if (formIndex !== 0) {
              let temp = formIndex - 1;
              setFormIndex(temp);
            }
          }}
        >
          {"<"}
        </button>
        {formIndex + 1} of {filled.length} responses
        <button
          className="control-button"
          onClick={() => {
            if (formIndex+1 !== filled.length) {
              let temp = formIndex + 1;
              setFormIndex(temp);
            }
          }}
        >
          {">"}
        </button>
      </div>
    );
  };

  if (filled) {
    return (
      <div
        className="kjga-display-block"
        style={{ margin: "0px auto", padding: "100px 0px 0px 0px" }}
      >
        <div className="form-builder-wrapper" style={{ margin: "0px auto" }}>
          {renderControlButton()}
          {renderFormFields(0)}
        </div>
      </div>
    );
  } else {
    return <Spinner animation="border" />;
  }
};

const mapStateToProps = ({ forms }) => ({
  filled: forms.filledForms,
});

export default connect(mapStateToProps, { fetchFilledForm })(FormAnswerViewer);
