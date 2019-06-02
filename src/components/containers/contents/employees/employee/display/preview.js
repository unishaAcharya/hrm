import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

const Preview = props => (
  <Modal
    show={props.open}
    onHide={props.hidePreviewModal}
    aria-labelledby="ModalHeader"
  >
    <Modal.Header closeButton>
      <Modal.Title id="ModalHeader">Employee Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="row">
        <div className="form-group col-md-12">
          <label>First Name:</label>&nbsp;
          <h6 style={{ display: "inline" }}>{props.privewData.firstName}</h6>
        </div>
        <div className="form-group col-md-12">
          <label>Last Name : </label>&nbsp;
          <h6 style={{ display: "inline" }}>{props.privewData.lastName}</h6>
        </div>
        <div className="form-group col-md-12">
          <label>Date of Birthday : </label>&nbsp;
          <h6 style={{ display: "inline" }}>{props.privewData.dob}</h6>
        </div>
        <div className="form-group col-md-12">
          <label>Nationality: </label>&nbsp;
          <h6 style={{ display: "inline" }}>{props.privewData.nationality}</h6>
        </div>
        <div className="form-group col-md-12">
          <label>Blood Group: </label>&nbsp;
          <h6 style={{ display: "inline" }}>{props.privewData.bloodGroup}</h6>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
    </Modal.Footer>
  </Modal>
);

export default Preview;
