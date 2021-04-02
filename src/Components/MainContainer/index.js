import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeForm, getAllForm, deleteForm } from "../../actions/forms";
import FormBuilder from "../FormBuilder";
import deteleIcon from "../../delete.png";
import Modal from "../Modal/Modal";
import Notification from "../Notification/Notification";
import FormAnswerViewer from "../FormBuilder/FormAnswerViewer";
export const MainContainer = ({
  makeForm,
  getAllForm,
  allForms,
  deleteForm,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [formToDelete, setToDelete] = useState("");
  const [formToEdit, setFformToEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState("");
  const [notif, setNotif] = useState([null, null]);
  const [responses, setResponses] = useState(null);
  useEffect(() => {
    getAllForm();
  }, []);

  const renderForm = () => {
    if (allForms.length > 0) {
      return allForms.map((form, index) => {
        return (
          <div className="form-display" key={form.form_id}>
            <div
              className="top-clickable"
              onClick={() => {
                setFformToEdit(form);
              }}
            >
              {form.form_title}
            </div>

            <div className="bottom-control">
              <button
                className="delete-button-big"
                onClick={() => {
                  setToDelete(form.form_id);
                  setDeleteConfirm(true);
                }}
              >
                <img src={deteleIcon} className="big-icon-img" />
              </button>
            </div>
          </div>
        );
      });
    }
  };
  return (
    <>
      {formToEdit ? (
        <>
          <div className="secondary-nav">
            <button
              onClick={() => {
                setResponses(!responses);
              }}
              className="add-button"
            >
              {responses ? "Questions" : "Responses"}
            </button>
            <button
              onClick={() => {
                setLink(`http://localhost:3000/fillform/${formToEdit.form_id}`);
                setShowModal(true);
              }}
              className="add-button"
            >
              Generate Link
            </button>
          </div>
          <br></br>
          <div className="main-form-wrapper">
            {responses ? (
              <FormAnswerViewer id={formToEdit.form_id}/>
            ) : (
              <FormBuilder item={formToEdit} />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="kjga-display-block ">
            <div className="main-form-wrapper">
              <div className="form-table">
                <button
                  className="form-display"
                  onClick={() => {
                    makeForm();
                  }}
                >
                  Crete a New Form
                </button>
                {renderForm()}
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        message="Are you sure you want to delete this form?"
        show={deleteConfirm}
        setShow={() => {
          setDeleteConfirm(false);
        }}
        title="Confirmation"
        confirmFunction={() => {
          deleteForm(
            formToDelete,
            setNotif(["You've successfully deleted a form", "Form Deleted"])
          );
        }}
      />
      <Modal
        message={link}
        show={showModal}
        setShow={() => {
          setShowModal(false);
        }}
      />
      <Notification data={notif} />
    </>
  );
};
const mapStateToProps = ({ forms }) => ({
  allForms: forms.allForms,
});
export default connect(mapStateToProps, {
  makeForm,
  getAllForm,
  deleteForm,
})(MainContainer);
