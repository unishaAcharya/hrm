import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

 const DepartmentView =(props)=> (
      <Modal
        show={props.open}
        onHide={props.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Department Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-12">
              <label>Department Name:</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.departmentName}
              </h6>
            </div>
            </div>
            <div className="row">
            <div className="form-group col-md-12">
              <label>Branch Id: </label>&nbsp;
              <h6 style={{ display: "inline" }}>{props.data.branchId}</h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label>Department Address:</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.departmentAddress}
              </h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );

export default DepartmentView;
