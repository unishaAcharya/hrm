import React from "react";
import Modal from 'react-bootstrap-modal';

const Preview = (props) => (
    <Modal
        show={props.open}
        onHide={props.hidePreviewModal}
        aria-labelledby="ModalHeader"
    >
        <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Employee ID:</label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.currentPromotion.employeeId}
            </h6>
          </div>
          <div className="form-group col-md-12">
            <label>Promotion Rank: </label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.currentPromotion.newPromotionRank}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <label>Implementation Date:</label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.currentPromotion.effectiveDate}
            </h6>
          </div>
          <div className="form-group col-md-12">
            <label>Comment: </label>&nbsp;
            <h6 style={{ display: "inline" }}>
              {props.currentPromotion.comment}
            </h6>
          </div>
        </div>
        
        </Modal.Body>
        <Modal.Footer>
            <Modal.Dismiss className='btn btn-info'>Close</Modal.Dismiss>
        </Modal.Footer>
    </Modal>
);

export default Preview;
