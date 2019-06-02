import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

 const LeaveRequestView =(props)=> (
      <Modal
        show={props.open}
        onHide={props.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Leave Request Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Leave Type:</label>&nbsp;
              <h6 style={{ display: "inline" }}>{props.data.leaveType}</h6>
            </div>
            <div className="form-group col-md-6">
              <label>leave Request Date : </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.leaveRequestDate}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>leave Start Date:</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.leaveStartDate}
              </h6>
            </div>
            <div className="form-group col-md-6">
              <label>Leave End Date : </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.leaveEndDate}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Pay For Extra Days:</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.payForExtraDays}
              </h6>
            </div>
            <div className="form-group col-md-6">
              <label>Remaining Days: </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.remainingDays}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Requested Leave Days:</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.payForExtraDays}
              </h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );

export default LeaveRequestView;
