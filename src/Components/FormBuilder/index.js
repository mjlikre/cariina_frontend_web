import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { editForm } from "../../actions/forms";
import FieldDisplay from "./FieldDisplay";
import FieldEdit from "./FieldEdit";
import addIcon from "./../../add.png";
import deleteIcon from "./../../delete.png";

export const FormBuilder = ({ item, editForm }) => {
  const [formFields, setFormFields] = useState(null);
  const [tempValues, setTempValues] = useState(null);
  const [formTitle, setFormTitle] = useState(0);
  const [selected, setSelected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (item) {
      setFormFields([...item.form_fields]);
      setTempValues(item.form_fields[0]);
      setFormTitle(item.form_title);
    }
    return () => {};
  }, [item]);
  const handleChange = (item) => {
    let updatedData = [...formFields];
    updatedData.map((i, index) => {
      if (i.index === selected) {
        return (updatedData[index] = tempValues);
      }
    });

    setFormFields(updatedData);
    setTempValues(item);
    setSelected(item.index);
  };
  const handleDelete = (index) => {
    let deletedData = [...formFields];
    deletedData.splice(index, 1);

    setFormFields(deletedData);
  };
  const submitChanges = () => {
    let tempData = [...formFields]
    tempData[selected] = tempValues
    setFormFields(tempData);
    if (formFields !== item.form_fields || formTitle !== item.form_title) {
      let data = {
        id: item.form_id,
        data: {
          form_title: formTitle,
          form_fields: formFields,
        },
      };
      editForm(data);
    }
    setShowModal(true);
    setTempValues(null);
    setSelected(null);
  };
  const handleAdd = () => {
    const maxIndex = Math.max.apply(
      Math,
      formFields.map((o) => {
        return o.index;
      })
    );
    const newField = {
      index: maxIndex + 1,
      label: "",
      options: [""],
      type: 0,
    };
    let updatedData = [...formFields];
    updatedData.map((i, index) => {
      if (i.index === selected) {
        return (updatedData[index] = tempValues);
      }
    });
    updatedData.push(newField);

    setFormFields(updatedData);
    setTempValues(newField);
    setSelected(maxIndex + 1);
  };
  const renderSelectedOption = () => {
    if (tempValues.type === 0) {
      return "Short Answer";
    } else if (tempValues.type === 1) {
      return "Long Asnwer";
    } else if (tempValues.type === 2) {
      return "Single Select";
    } else if (tempValues.type === 3) {
      return "Multi Select";
    } else if (tempValues.type === 4) {
      return "Month/Day/Year";
    } else if (tempValues.type === 5) {
      return "10:00 AM";
    } else if (tempValues.type === 6) {
      return "Number";
    }
  };
  const renderFields = () => {
    if (formFields) {
      return formFields.map((item, index) => {
        return (
          <div key={item.index}>
            {item.index === selected ? (
              <div className="edit-form-wrapper">
                <div className="form-wrapper">
                  <input
                    className="form-input-box"
                    type="text"
                    name={item.index}
                    placeholder="Enter Field Label"
                    autoComplete="off"
                    value={tempValues.label}
                    onChange={(e) => {
                      setTempValues({ ...tempValues, label: e.target.value });
                    }}
                  />
                  <div></div>

                  <FieldEdit
                    item={tempValues}
                    changeOption={(data) => {
                      setTempValues({ ...tempValues, options: data });
                    }}
                  />

                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {renderSelectedOption()}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#/action-1"
                        onClick={() => {
                          setTempValues({ ...tempValues, type: 0 });
                        }}
                      >
                        Short Text
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        onClick={() => {
                          setTempValues({ ...tempValues, type: 1 });
                        }}
                      >
                        Long Text
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-5"
                        onClick={() => {
                          setTempValues({ ...tempValues, type: 6 });
                        }}
                      >
                        Number
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-3"
                        onClick={() => {
                          setTempValues({ ...tempValues, type: 2 });
                        }}
                      >
                        Single Select
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-4"
                        onClick={() => {
                          setTempValues({ ...tempValues, type: 3 });
                        }}
                      >
                        Multi Select
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-6"
                        onClick={() => {
                          setTempValues({ ...tempValues, type: 4 });
                        }}
                      >
                        Date
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-7"
                        onClick={() => {
                          setTempValues({ ...tempValues, type: 5 });
                        }}
                      >
                        Time
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="edit-form-button-area">
                  <button
                    className="side-button"
                    onClick={() => {
                      handleAdd();
                    }}
                  >
                    <img className="icon-img" src={addIcon} />
                  </button>
                  <button
                    className="side-button"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  >
                    <img className="icon-img" src={deleteIcon} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="edit-form-wrapper">
                <div
                  className="form-wrapper"
                  onClick={() => {
                    handleChange(item);
                  }}
                >
                  <div className="form-input-box">
                    {item.label === "" ? "No label, click to edit" : item.label}
                  </div>
                  <div></div>
                  <FieldDisplay item={item} />
                </div>
                <div></div>
              </div>
            )}
          </div>
        );
      });
    }
  };
  return (
    <>
      <h3>
        <input
          className="form-input-box"
          value={formTitle}
          onChange={(e) => {
            setFormTitle(e.target.value);
          }}
        />
      </h3>
      <div className="form-builder-wrapper">
        {renderFields()}
        <br></br>
        <button
          className="add-button"
          onClick={() => {
            submitChanges();
          }}
        >
          Submit
        </button>
      </div>

      <Modal
        size="sm"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Edit Successful
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Your Changes has been saved!</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ forms }) => ({
  form: forms.form,
});

export default connect(mapStateToProps, { editForm })(FormBuilder);
