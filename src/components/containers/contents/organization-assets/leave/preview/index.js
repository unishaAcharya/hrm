import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

const Preview = props => (
  <Modal
    show={props.open}
    onHide={props.closeModal}
    aria-labelledby="ModalHeader"
  >
    <Modal.Header closeButton>
      <Modal.Title id="ModalHeader">Leave Information</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="form-group col-md-6">
        <label>Leave Id:</label>&nbsp;
        <h6 style={{ display: "inline" }}>{props.data.leaveId}</h6>
      </div>
      <div className="form-group col-md-6">
        <label>Leave Type:</label>&nbsp;
        <h6 style={{ display: "inline" }}>{props.data.leaveType}</h6>
      </div>
      <div className="form-group col-md-6">
        <label>Total Leave Days: </label>&nbsp;
        <h6 style={{ display: "inline" }}>{props.data.totalLeaveDays}</h6>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
    </Modal.Footer>
  </Modal>
);
export default Preview;
