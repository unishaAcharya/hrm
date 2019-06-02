import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

const SubDepartmentView =(props)=> (
      <Modal
        show={props.open}
        onHide={props.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Sub Department Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Department Id:</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.departmentId}
              </h6>
              />
            </div>
            <div className="form-group col-md-6">
              <label>Sub Department Name: </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.subDepartmentName}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Sub Department Address:</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.subDepartmentAddress}
              </h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );
  export default SubDepartmentView;
