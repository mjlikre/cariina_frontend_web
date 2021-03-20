import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeForm, getAllForm, deleteForm } from "../../actions/forms";
import FormBuilder from "../FormBuilder";
import deteleIcon from "../../delete.png"
import editIcon from "../../edit.png"
import Modal from "../Modal/Modal"
export const MainContainer = ({ makeForm, getAllForm, allForms, deleteForm }) => {
  const [formToEdit, setFformToEdit] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState("")
  useEffect(() => {
    getAllForm();
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
              deleteForm(form.form_id);
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
          <button
            className="create-form"
            onClick={() => {
              makeForm();
            }}
          >
            Crete a New Form
          </button>
          <div className="form-table">{renderForm()}</div>
        </>
      )}
      <Modal message = {link} show = {showModal} setShow = {()=> {setShowModal(false)}} />
      
    </div>
  );
};
const mapStateToProps = ({ forms }) => ({
  allForms: forms.allForms,
});
export default connect(mapStateToProps, { makeForm, getAllForm, deleteForm })(
  MainContainer
);
