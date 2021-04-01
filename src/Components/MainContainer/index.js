import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeForm, getAllForm, deleteForm, clearForm } from "../../actions/forms";
import FormBuilder from "../FormBuilder";
import deteleIcon from "../../delete.png";
import editIcon from "../../edit.png";
import Modal from "../Modal/Modal";
import Notification from "../Notification/Notification";
export const MainContainer = ({
  makeForm,
  getAllForm,
  allForms,
  deleteForm,
  clearForm
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [formToDelete, setToDelete] = useState("");
  const [formToEdit, setFformToEdit] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState("")
  const [notif, setNotif] = useState([null, null]);
  useEffect(() => {
    getAllForm();
    clearForm()
  }, []);

  const renderForm = () => {
    if (allForms.length > 0) {
      return allForms.map((form, index) => {
        return (
          <div
            className="form-display"
            key={form.form_id}
            
          >
            {form.form_title}
           
            <div className = "delete-form-position">
              <button className = "edit-button-big" onClick={() => {
              setFformToEdit(form);
            }}><img src = {editIcon} className = "big-icon-img"/></button>
              <button className = "delete-button-big" onClick={() => {
              setToDelete(form.form_id);
              setDeleteConfirm(true)
            }}><img src = {deteleIcon} className = "big-icon-img"/></button>
            </div>
            
          </div>
        );
      });
    }
  };
  return (
    <div className="main-form-wrapper">
      {formToEdit ? (
        <>
        <div>
        <button
            onClick={() => {
              setFformToEdit(false);
              setLink("")
            }}
            className = "add-button"
          >
            See All Forms
          </button>
          <button
           onClick = {()=> {
             setLink(`http://localhost:3000/fillform/${formToEdit.form_id}`)
             setShowModal(true)
           }}
            className = "add-button"
          >
            Generate Link
          </button>
        </div>
          <br></br>
          <FormBuilder item={formToEdit} />
        </>
      ) : (
        <>
         
          <div className="form-table">
          <button
            className="form-display"
            onClick={() => {
              makeForm();
            }}
          >
            Crete a New Form
          </button>
            {renderForm()}</div>
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
      <Modal message = {link} show = {showModal} setShow = {()=> {setShowModal(false)}} />
      <Notification data={notif} />
    </div>
  );
};
const mapStateToProps = ({ forms }) => ({
  allForms: forms.allForms,
});
export default connect(mapStateToProps, {
  makeForm,
  getAllForm,
  deleteForm,
  clearForm
})(MainContainer);
