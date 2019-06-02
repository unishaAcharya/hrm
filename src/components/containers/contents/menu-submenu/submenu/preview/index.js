import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

const Preview = props => (
  <Modal
    show={props.open}
    onHide={props.closeModal}
    aria-labelledby="ModalHeader"
  >
    <Modal.Header closeButton>
      <Modal.Title id="ModalHeader">Sub Menu Information</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="form-group">
        <label>Sub Menu Id:</label>&nbsp;&nbsp;&nbsp;
        <h6 style={{ display: "inline" }}>{props.data.subMenuId}</h6>
      </div>
      <div className="form-group">
        <label>Sub Menu Name:</label>&nbsp;&nbsp;&nbsp;
        <h6 style={{ display: "inline" }}>{props.data.subMenuName}</h6>
      </div>
      <div className="form-group">
        <label>Redirect Url:</label>&nbsp;&nbsp;&nbsp;
        <h6 style={{ display: "inline" }}>{props.data.redirectUrl}</h6>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
    </Modal.Footer>
  </Modal>
);
export default Preview;
