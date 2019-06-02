import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

class PreviewForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var bank =
      this.props && this.props.actualbankDetails.length > 0
        ? this.props.actualbankDetails.map((value, idx) => {
            return (
              <div className="row" key={idx}>
                <div className="form-group col-md-3">
                  <label>Bank Name</label>
                  <p>{value.bankName}</p>
                </div>
                <div className="form-group col-md-2">
                  <label>Account Name</label>
                  <p>{value.accountName}</p>
                </div>
                <div className="form-group col-md-2">
                  <label>Account Number</label>
                  <p>{value.accountNumber}</p>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="input_branch_Name" className="col-form-label">
                    Branch Name
                  </label>
                  <p>{value.branchName}</p>
                </div>
              </div>
            );
          })
        : bank;
    let educationList =
      this.props && this.props.actualEducationList.length > 0
        ? this.props.actualEducationList.map((val, idx) => {
            return (
              <div className="row" key={idx}>
                <div className="form-group col-md-3">
                  <label htmlFor="input_degreeName" className="col-form-label">
                    Degree Name
                  </label>
                  <p>{val.degreeName}</p>
                </div>
                <div className="form-group col-md-3">
                  <label>Board University</label>
                  <p>{val.boardUniversity} </p>
                </div>
                <div className="form-group col-md-2">
                  <label>Grade Percentage</label>
                  <p>{val.boardUniversity}</p>
                </div>
                <div className="form-group col-md-2">
                  <label className="col-form-label" htmlFor="input_passYear">
                    Pass Year{" "}
                  </label>
                  <p>{val.passYear}</p>
                </div>
              </div>
            );
          })
        : educationList;
    let workHistory =
      this.props && this.props.actualWorkList.length > 0
        ? this.props.actualWorkList.map((val, idx) => {
            return (
              <div className="row" key={idx}>
                <div className="form-group col-md-3">
                  <label>Organization Name</label>
                  <p>{val.organization}</p>
                </div>
                <div className="form-group col-md-3">
                  <label>Job Title</label>
                  <p>{val.jobTitle}</p>
                </div>
                <div className="form-group col-md-3">
                  <label>Work Start Date</label>
                  <p>{val.workStartDate}</p>
                </div>

                <div className="form-group col-md-2">
                  <label>Experience</label>
                  <p>{val.experience}</p>
                </div>
              </div>
            );
          })
        : workHistory;

    return (
      <Modal
        show={this.props.open}
        onHide={this.props.hidePreviewModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <label>Profile Image</label>
            <br />
          </div>
          <img
            src={this.props.previewImageData && this.props.previewImageData}
            style={{ width: "50%" }}
          />
          <br />
          <br />
          <div className="row">
            <div className="form-group col-md-6">
              <label>First Name:</label> {this.props.preview.firstName}
            </div>
            <div className="form-group col-md-6">
              <label>Middle Name: </label> {this.props.preview.middleName}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Last Name: </label> {this.props.preview.lastName}
            </div>
            <div className="form-group col-md-6">
              <label>Started Date: </label> {this.props.preview.started_date}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Ended Date:</label> {this.props.preview.ended_date}
            </div>
            <div className="form-group col-md-6">
              <label>Contract Period:</label>{" "}
              {this.props.preview.contract_period}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>Rank Id: </label> {this.props.preview.rankId}
            </div>
            <div className="form-group col-md-6">
              <label>Branch Id:</label> {this.props.preview.branchId}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>national_id:</label> {this.props.preview.national_id}
            </div>
            <div className="form-group col-md-6">
              <label>workshift_id:</label> {this.props.preview.workshift_id}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>department_id: </label> {this.props.preview.department_id}
            </div>
            <div className="form-group col-md-6">
              <label>income_tax_status:</label>{" "}
              {this.props.preview.income_tax_status}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>report_to:</label> {this.props.preview.report_to}
            </div>
            <div className="form-group col-md-6">
              <label>selectedOption: </label>{" "}
              {this.props.preview.selectedOption}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>bloodGroup:</label> {this.props.preview.bloodGroup}
            </div>
            <div className="form-group col-md-6">
              <label>nationality:</label> {this.props.preview.nationality}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>serviceType: </label> {this.props.preview.serviceType}
            </div>
            <div className="form-group col-md-6">
              <label> empGroup: </label> {this.props.preview.empGroup}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label> currentAddress:</label>{" "}
              {this.props.preview.currentAddress}
            </div>
            <div className="form-group col-md-6">
              <label> currentCountry: </label>{" "}
              {this.props.preview.currentCountry}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label> currentDistrict:</label>{" "}
              {this.props.preview.currentDistrict}
            </div>
            <div className="form-group col-md-6">
              <label> permanentAddress: </label>{" "}
              {this.props.preview.permanentAddress}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label> permanentDistrict:</label>{" "}
              {this.props.preview.permanentDistrict}
            </div>
            <div className="form-group col-md-6">
              <label> phoneMobileNo: </label> {this.props.preview.phoneMobileNo}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label> email:</label> {this.props.preview.email}
            </div>
            <div className="form-group col-md-6">
              <label> emergencyContactName: </label>{" "}
              {this.props.preview.emergencyContactName}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label> emergencyContactNo:</label>{" "}
              {this.props.preview.emergencyContactNo}
            </div>
            <div className="form-group col-md-6">
              <label> emergencyContactEmail: </label>{" "}
              {this.props.preview.emergencyContactEmail}
            </div>
          </div>
          {bank}
          {educationList}
          {workHistory}
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-warning">Cancel</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default PreviewForm;
