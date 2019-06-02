import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

class TransferView extends Component {
  render() {
    return (
      <Modal
        show={this.props.open}
        onHide={this.props.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Transfer Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="form-group col-md-12">
              <label>Employee Id :</label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {this.props.data.employeeId}
              </h6>
            </div>
            <div className="form-group col-md-12">
              <label>Transfer Date : </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {this.props.data.effectiveDate}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label>Branch Id :</label>&nbsp;
              <h6 style={{ display: "inline" }}>{this.props.data.branchId}</h6>
            </div>
            <div className="form-group col-md-12">
              <label>Department Id : </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {this.props.data.departmentId}
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label>Rank Id :</label>&nbsp;
              <h6 style={{ display: "inline" }}>{this.props.data.rankId}</h6>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <label>Comment :</label>&nbsp;
              <h6 style={{ display: "inline" }}>{this.props.data.comment}</h6>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TransferView;
