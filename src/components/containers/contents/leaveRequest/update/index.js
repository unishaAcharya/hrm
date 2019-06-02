import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-bootstrap-modal";
import Configuration from "../../commons/configuration/server";
import FormValidator from "../../commons/formValidator";

export default class LeaveRequestUpdate extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: "leaveStartDate",
        method: "isEmpty",
        validWhen: false,
        message: "leave Start Date is required."
      },
      {
        field: "leaveEndDate",
        method: "isEmpty",
        validWhen: false,
        message: "Leave End Date is required."
      },
      {
        field: "extraDays",
        method: "isEmpty",
        validWhen: false,
        message: "Extra Days is required."
      },
      {
        field: "payForExtraDays",
        method: "isEmpty",
        validWhen: false,
        message: "pay For mExtra Days is required."
      },
      {
        field: "employeeId",
        method: "isEmpty",
        validWhen: false,
        message: "Employee Id is required."
      },
      {
        field: "approvedBy",
        method: "isEmpty",
        validWhen: false,
        message: "Approved By is required."
      },
      {
        field: "comment",
        method: "isEmpty",
        validWhen: false,
        message: "Comment is required."
      }
    ]);
    this.state = {
      id: "",
      validationfield: false,
      validation: this.validator.valid()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      leaveRequestId: nextProps.data.leaveRequestId,
      leaveType: nextProps.data.leaveType,
      leaveStartDate: nextProps.data.leaveStartDate,
      leaveEndDate: nextProps.data.leaveEndDate,
      extraDays: nextProps.data.extraDays,
      payForExtraDays: nextProps.data.payForExtraDays,
      employeeId: nextProps.data.employeeId,
      approvedBy: nextProps.data.approvedBy,
      comment: nextProps.data.comment
    });
  }
  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    var updatedata = {};
    updatedata.leaveRequestId = this.state.leaveRequestId;
    updatedata.leaveType = this.state.leaveType;
    updatedata.leaveStartDate = this.state.leaveStartDate;
    updatedata.leaveEndDate = this.state.leaveEndDate;
    updatedata.extraDays = this.state.extraDays;
    updatedata.payForExtraDays = this.state.payForExtraDays;
    updatedata.employeeId = this.state.employeeId;
    updatedata.approvedBy = this.state.approvedBy;
    updatedata.comment = this.state.comment;
    updatedata.leaveRequestDate = "2061-09-09";

    let id = this.state.leaveRequestId;

    var that = this;

    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateLeaveRequest/${id}`,
        data: updatedata
      })
        .then(function(response) {
          that.props.handleUpdate(updatedata);
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  };
  render() {
    let validation = this.state.validation;
    return (
      <Modal
        show={this.props.open}
        onHide={this.props.closeModal}
        aria-labelledby="ModalHeader"
        className="updateForm"
      >
        <Modal.Header closeButton className="updateForm">
          <Modal.Title id="ModalHeader" className="updateForm">
            Leave Request
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Leave Type</label>
                  <div className="controls updateForm">
                    <select
                      className="form-control updateForm"
                      name="leaveType"
                      onChange={this.handleFieldChange}
                      value={this.state.leaveType}
                    >
                      <option value="Casual">Casual</option>
                      <option value="Bereavement">Bereavement</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label>leave Start Date</label>
                  <div className="controls updateForm">
                    <input
                      type="date"
                      name="leaveStartDate"
                      className="form-control updateForm"
                      placeholder="leave Start Date"
                      onChange={this.handleFieldChange}
                      value={this.state.leaveStartDate}
                    />
                  </div>
                  <span className="help-block updateForm">
                    {validation.leaveStartDate.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label>leave End Date</label>
                  <div className="controls updateForm">
                    <input
                      name="leaveEndDate"
                      id="leaveEndDate"
                      type="date"
                      className="form-control updateForm"
                      placeholder="leaveEndDate"
                      onChange={this.handleFieldChange}
                      value={this.state.leaveEndDate}
                    />
                  </div>
                  <span className="help-block updateForm">
                    {validation.leaveEndDate.message}
                  </span>
                </div>
              </div>
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label>Employee Id</label>
                  <div className="controls updateForm">
                    <input
                      name="employeeId"
                      id="employeeId"
                      type="text"
                      className="form-control updateForm"
                      placeholder="Employee Id"
                      onChange={this.handleFieldChange}
                      value={this.state.employeeId}
                    />
                  </div>
                  <span className="help-block updateForm">
                    {validation.employeeId.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label>Extra Days</label>
                  <div className="controls updateForm">
                    <input
                      name="extraDays"
                      id="extraDays"
                      type="text"
                      className="form-control updateForm"
                      placeholder="Extra Days"
                      onChange={this.handleFieldChange}
                      value={this.state.extraDays}
                    />
                  </div>
                  <span className="help-block updateForm">
                    {validation.extraDays.message}
                  </span>
                </div>
              </div>
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label>Pay For Extra Days</label>
                  <div className="controls updateForm">
                    <input
                      name="payForExtraDays"
                      id="payForExtraDays"
                      type="text"
                      className="form-control updateForm"
                      placeholder="Pay For Extra Days"
                      onChange={this.handleFieldChange}
                      value={this.state.payForExtraDays}
                    />
                  </div>
                  <span className="help-block updateForm">
                    {validation.payForExtraDays.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label>Approved By</label>
                  <div className="controls updateForm">
                    <input
                      name="approvedBy"
                      id="approvedBy"
                      type="text"
                      className="form-control updateForm"
                      placeholder="Approved By"
                      onChange={this.handleFieldChange}
                      value={this.state.approvedBy}
                    />
                  </div>
                  <span className="help-block updateForm">
                    {validation.approvedBy.message}
                  </span>
                </div>
              </div>
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label>Comment</label>
                  <div className="controls updateForm">
                    <textarea
                      name="comment"
                      id="comment"
                      type="text"
                      className="form-control updateForm"
                      placeholder="Comment"
                      onChange={this.handleFieldChange}
                      value={this.state.comment}
                    />
                  </div>
                  <span className="help-block updateForm">
                    {validation.comment.message}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs-right">
              <button type="submit" className="btn btn-info updateForm">
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
