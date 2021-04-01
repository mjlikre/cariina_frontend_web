import React from "react";
import { Modal, Button } from "react-bootstrap";
function SmallModal({ show, message, setShow, title, confirmFunction }) {
  return (
    <div>
      <Modal
        backdrop="static"
        show={show}
        onHide={() => setShow()}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-sm">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          {confirmFunction ? (
            <>
            <Button
              onClick={() => {
                confirmFunction();
                setShow()
              }}
            >
              Confirm
            </Button>
            <Button
              onClick={() => {
                setShow()
              }}
            >
              Cancel
            </Button>
            </>
            
          ) : (
            <Button onClick={() => setShow()}>
              <a style={{ color: "black" }} href="http://localhost:3000/main">
                Close
              </a>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SmallModal;
