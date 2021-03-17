import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputArea from "../../Components/InputArea";
import { connect } from "react-redux";
import { updateStatistics, getStatistics } from "../../actions/data";

/* 
popup component for editing inidvidual record, takes in an item prop, which is the country's data that you would like to edit
works great when you have an array of data and needs edit each item. if you want to change the button name it can be converted into a props
where you can pass in the button name that you want. 
*/
const PopUp = (props) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState({
    cases: {
      new: props.item.cases["new"],
      active: parseInt(props.item.cases["active"]),
      critical: props.item.cases["critical"],
      recovered: parseInt(props.item.cases["recovered"]),
      "1M_pop": props.item.cases["1M_pop"],
      total: parseInt(props.item.cases["total"]),
    },
    deaths: {
      new: props.item.deaths["new"],
      "1M_pop": props.item.deaths["1M_pop"],
      total: parseInt(props.item.deaths["total"]),
    },
  });
  const [newCD, setNewCD] = useState({
    cases: 0,
    deaths: 0,
    recovered: 0
  });
  //updates the record at the same time to ensure correct data is being passed into the server. 
  const updateValues = (cases, deaths, recovered) => {
    let UpdatedDeath = parseInt(props.item.deaths.total) + deaths
    let UpdatedCases = parseInt(props.item.cases.total) + cases - recovered 
    let UpdatedRecovered = parseInt(props.item.cases.recovered) + recovered
    let UpdatedActive = parseInt(props.item.cases.recovered) + cases - recovered - deaths 
    setEdit({
      ...edit,
      cases: {
        ...edit.cases,
        total: UpdatedCases,
        active: UpdatedActive,
        recovered: UpdatedRecovered
      },
      deaths: {
          ...edit.deaths,
          total: UpdatedDeath
      }
    });

  }
  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setShow(true);
        }}
      >
        Add
      </Button>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{props.item.country}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputArea
              val_type="number"
              val={newCD.cases}
              label="Add New Cases"
              change={(e) => {
                updateValues(parseInt(e.target.value), 0, 0)
                setNewCD({
                  ...newCD,
                  cases: parseInt(e.target.value)
                })
              }}
            />
            <InputArea
              val_type="number"
              val={newCD.deaths}
              label="Add New Deaths"
              change={(e) => {
                updateValues(0, parseInt(e.target.value), 0)
                setNewCD({
                  ...newCD,
                  deaths: parseInt(e.target.value)
                })
              }}
            />
            <InputArea
              val_type="number"
              val={newCD.recovered}
              label="Add New Recovered Cases"
              change={(e) => {
                updateValues( 0, 0, parseInt(e.target.value))
                setNewCD({
                  ...newCD,
                  recovered: parseInt(e.target.value)
                })
              }}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(false);
              }}
            >
              close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                const difference = {
                  cases: edit.cases.total - parseInt(props.item.cases.total),
                  deaths: edit.deaths.total - parseInt(props.item.deaths.total),
                  recovered: edit.cases.recovered - parseInt(props.item.cases.recovered),
                  active: edit.cases.active - parseInt(props.item.cases.active),
                  continent: props.item.continent
                }
                console.log(difference)
                props.updateStatistics(
                  { country: props.item.country, data: {update: edit, difference: difference} },
                  () => {
                    props.getStatistics();

                    setShow(false);
                  }
                );
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default connect(null, { getStatistics, updateStatistics })(PopUp);
