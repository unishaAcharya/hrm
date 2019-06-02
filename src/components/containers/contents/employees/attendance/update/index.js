import React, { Component } from "react";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";
import Axios from "axios";

class AttendanceUpdate extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: "approvedBy",
        method: "isEmpty",
        validWhen: false,
        message: "Approved By is required."
      }
    ]);
    this.state = {
      employee: [],
      attendanceId: "",
      approvedBy: "",
      employeeId: "",
      validation: this.validator.valid()
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      employeeId: nextProps.data.employeeId,
      approvedBy: nextProps.data.approvedBy,
      attendanceId: nextProps.data.attendanceId,
      attendanceDate: nextProps.data.attendanceDate
    });
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleEmployeeField = e => {
    this.setState({
      employeeId: e.target.value
    });
  };
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`).then(
      response => {
        this.setState({ employee: response.data.t });
      }
    );
  }
  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    let data = {};
    data.approvedBy = this.state.approvedBy;
    data.employeeId = this.state.employeeId;
    data.attendanceDate = this.state.attendanceDate;
    let attendanceId = this.state.attendanceId;

    Axios({
      method: "put",
      url: `${Configuration.domain}/hrm/updateAttendance/${attendanceId}`,
      data: data
    })
      .then(response => {
        console.log(response);
        this.props.handleUpdates(data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    let { validation, employee } = this.state;

    return (
      <Modal
        show={this.props.open}
        onHide={this.props.closeModal}
        aria-labelledby="ModalHeader"
        className="updateForm"
      >
        <Modal.Header closeButton className="updateForm">
          <Modal.Title id="ModalHeader" className="updateForm">
            Attendance Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate} className="updateForm">
            <div className="form-group updateForm">
              <label className="updateForm">Employee Id</label>
              <div className="controls updateForm">
                <select
                  className="form-control updateForm"
                  name="employeeId"
                  onChange={this.handleEmployeeField}
                  value={this.state.employeeId}
                >
                  {employee &&
                    employee.map(employee => (
                      <option value={employee.empId} key={employee.empId}>
                        {employee.fullName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="form-group updateForm">
              <label className="updateForm">Approved By</label>
              <div className="controls updateForm">
                <input
                  type="text"
                  name="approvedBy"
                  className="form-control updateForm"
                  placeholder="Approved By"
                  onChange={this.handleFieldChange}
                  value={this.state.approvedBy}
                />
                <span className="help-block updateForm">
                  {validation.approvedBy.message}
                </span>
              </div>
            </div>
            <div className="text-xs-right updateForm">
              <button
                onClick={this.saveAttendance}
                type="submit"
                className="btn btn-info updateForm"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AttendanceUpdate;
