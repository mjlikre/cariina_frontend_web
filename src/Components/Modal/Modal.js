import React from 'react'
import {Modal, Button} from 'react-bootstrap'
function SmallModal({show, message, setShow}) {
    return (
        <div>
            <Modal

        show={show}
        onHide={() => setShow()}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Here's Your Link!!!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>link: {message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow()}>Close</Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default SmallModal