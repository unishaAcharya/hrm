import React, { Component } from "react";
import Modal from 'react-bootstrap-modal';

const Preview = (props) => (
    <Modal
        show={props.open}
        onHide={props.closeModal}
        aria-labelledby="ModalHeader"
    >
        <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>Advance Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Advance Payment Id :</label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.data.advancePaymentId}
            </h6>
          </div>
          <div className="form-group">
            <label>Advance Request  : </label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.data.advanceRequestId}
            </h6>
          </div>
          <div className="form-group">
            <label>Deduction Date :</label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.data.deductionDate}
            </h6>
          </div>
          <div className="form-group">
            <label>Due Amount : </label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.data.dueAmount}
            </h6>
          </div>
          <div className="form-group">
            <label>Paid Amount :</label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.data.paidAmount}
            </h6>
          </div>
          <div className="form-group">
            <label>Title : </label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.data.title}
            </h6>
          </div>

        </Modal.Body>
        <Modal.Footer>
            <Modal.Dismiss className='btn btn-info'>Close</Modal.Dismiss>
        </Modal.Footer>
    </Modal>
);

export default Preview;
