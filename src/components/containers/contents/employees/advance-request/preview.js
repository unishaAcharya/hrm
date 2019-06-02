import React from "react";
import Modal from 'react-bootstrap-modal';

const Preview = (props) => (
    <Modal
        show={props.open}
        onHide={props.hidePreviewModal}
        aria-labelledby="ModalHeader"
    >
        <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group col-md-12">
            <label>Employee ID: &nbsp;&nbsp;</label>
              <h6 style={{ display: "inline" }}>{props.currentRequest.employeeId}</h6>
            </div>
            <div className="form-group col-md-12">
            <label>Amount Request: &nbsp;&nbsp; </label>
            <h6 style={{ display: "inline" }}>{props.currentRequest.advanceRequestAmount}</h6>
            </div>
            <div className="form-group col-md-12">
            <label>Request Date: &nbsp;&nbsp; </label>
              <h6 style={{ display: "inline" }}>{props.currentRequest.requestDate}</h6>
              </div>
        </Modal.Body>
        <Modal.Footer>
            <Modal.Dismiss className='btn btn-info'>Close</Modal.Dismiss>
        </Modal.Footer>
    </Modal>
);

export default Preview;
