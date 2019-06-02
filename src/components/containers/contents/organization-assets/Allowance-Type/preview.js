import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

const AllowanceTypePreview =(props)=> (

      <Modal
        show={props.open}
        onHide={props.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Allowance Type Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-12">
              <label>Allowance Type : </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {props.data.allowanceType}
              </h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );


export default AllowanceTypePreview;
