import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";

export default class DepartmentUpdate extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "totalLeaveDays",
        method: "isEmpty",
        validWhen: false,
        message: "Total Leave Days Name is required."
      },
      {
        field: "totalLeaveDays",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Only Numbers"
      }
    ]);
    this.state = {
      leaveType:"",
      validation: this.validator.valid()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleFielChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      leavedynamic:nextProps.leavedynamic,
      leaveId: nextProps.data.leaveId,
      leaveType: nextProps.data.leaveType,
      totalLeaveDays: nextProps.data.totalLeaveDays
    });
  }
  leaveTypeChange = async e => {
    await this.setState({
      leaveType: e.target.value
    });
  };
  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    var leavedata = {};
    leavedata.leaveId = this.state.leaveId;
    leavedata.leaveType = this.state.leaveType;
    leavedata.totalLeaveDays = this.state.totalLeaveDays;

    var that = this;
    var id = this.state.leaveId;
    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateLeave/${id}`,
        data: leavedata
      })
        .then(function(response) {
          that.props.handleUpdate(leavedata);
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
            Leave Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate} className="updateForm">
            <div className="updateForm form-group">
              <label>Leave Type</label>
              <div className="updateForm controls">
                <select
                  className="form-control updateForm"
                  onChange={e => this.leaveTypeChange(e)}
                  name="leaveType"
                  value={this.state.leaveType}
                >
                  <option value={this.state.leaveType}   className="form-control updateForm" >{this.state.leaveType}</option>
                {this.state && this.state.leavedynamic && this.state.leavedynamic.map(leave=>(
                  <option value={leave.leaveId}   className="form-control updateForm" key={leave.leaveId}>{leave.leaveType}</option>
                ))}
                </select>
              </div>
            </div>
            <div className="updateForm form-group">
              <label>Total Leave Days</label>
              <div className="updateForm controls">
                <input
                  name="totalLeaveDays"
                  onChange={e => this.handleFielChange(e)}
                  type="text"
                  className="updateForm form-control"
                  placeholder="totalLeaveDays"
                  value={this.state.totalLeaveDays}
                />
              </div>
              <span className="updateForm help-block">
                {validation.totalLeaveDays.message}
              </span>
            </div>

            <input
              type="submit"
              className="updateForm btn btn-primary btn-block"
              value="Save Changes"
            />
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
