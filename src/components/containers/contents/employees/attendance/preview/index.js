import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

class PreviewAttendance extends Component {
  render() {
    return (
      <Modal
        show={this.props.open}
        onHide={this.props.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Attendance Information</Modal.Title>
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
              <label>Approved By : </label>&nbsp;
              <h6 style={{ display: "inline" }}>
                {this.props.data.approvedBy}
              </h6>
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

export default PreviewAttendance;
