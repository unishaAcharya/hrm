import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

const RankView=(props)=>(
      <Modal
        show={props.open}
        onHide={props.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Rank Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Rank Name: </label>&nbsp;
              <h6 style={{ display: "inline" }}>{props.data.rankName}</h6>
            </div>
            <div className="form-group col-md-6">
              <label>Department Id: </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.departmentId}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Sub Department Id:</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.subDepartmentId}
              </h6>
            </div>
            <div className="form-group col-md-6">
              <label>Salary Range:</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.salaryRange}
              </h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );

export default RankView;
