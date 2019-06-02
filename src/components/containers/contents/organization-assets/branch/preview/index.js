import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

const BranchView =(props)=> (

      <Modal
        show={props.open}
        onHide={props.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Branch Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Branch Name :</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.branchName}
              </h6>
            </div>
            <div className="form-group col-md-6">
              <label>Branch Contact : </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.branchContact}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Branch Email :</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.branchEmail}
              </h6>
            </div>
            <div className="form-group col-md-6">
              <label>Branch Fax No :</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.branchFaxNo}
              </h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-info">Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );
  

export default BranchView;
