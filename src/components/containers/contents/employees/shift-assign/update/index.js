import React, { Component } from "react";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import Axios from "axios";

class ShiftUpdate extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "shiftStartDate",
        method: "isEmpty",
        validWhen: false,
        message: "Start Date is Required"
      },
      {
        field: "shiftEndDate",
        method: "isEmpty",
        validWhen: false,
        message: "End Date is Required"
      },
      {
        field: "shiftAssignedBy",
        method: "isEmpty",
        validWhen: false,
        message: "Shift Assign By is Required"
      },
      {
        field: "employeeId",
        method: "isEmpty",
        validWhen: false,
        message: "Employee Id By is Required"
      }
    ]);
    this.state = {
      shiftStartDate: "",
      shiftEndDate: "",
      shiftAssignedDate: "",
      shiftAssignedBy: "",
      employeeId: "",
      workShiftId: "16ebe1d9-4531-469b-aafa-02c9234e10df",

      validation: this.validator.valid()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      workshift:nextProps.workshift,
      employee:nextProps.employee,
      employeeId: nextProps.data.employeeId,
      shiftStartDate: nextProps.data.shiftStartDate,
      shiftEndDate: nextProps.data.shiftEndDate,
      shiftAssignedDate: nextProps.data.shiftAssignedDate,
      workShiftId: nextProps.data.workShiftId,
      shiftAssignedBy: nextProps.data.shiftAssignedBy,
      workShiftAssignId: nextProps.data.workShiftAssignId
    });
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
employeeIdchange=e=>{
  this.setState({
    employeeId:e.target.value
  })
}
workChange=e=>{
  this.setState({
    workShiftId:e.target.value
  })
}
  handleUpdate = async e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);

    await this.setState({ validation });
    this.submitted = true;
    var updatedata = {};
    updatedata.employeeId = this.state.employeeId;
    updatedata.shiftStartDate = this.state.shiftStartDate;
    updatedata.shiftEndDate = this.state.shiftEndDate;
    updatedata.shiftAssignedDate = this.state.shiftAssignedDate;
    updatedata.workShiftId = this.state.workShiftId;
    updatedata.shiftAssignedBy = this.state.shiftAssignedBy;
    updatedata.workShiftAssignId = this.state.workShiftAssignId;
    let that = this;
    let id = this.state.workShiftAssignId;

    if (validation.isValid) {
      Axios({
        method: "put",
        url: `http://localhost:8080/hrm/updateWorkShiftAssign/${id}`,
        data: updatedata
      })
        .then(function(response) {
          that.props.handleUpdate(updatedata);
        })
        .catch(function(err) {
          console.log(err);
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
            Shift Assign
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate} className="updateForm">
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label className="updateForm" htmlFor="Start Date">
                    Shift Start Date
                  </label>
                  <input
                    type="date"
                    placeholder="Shift Start Date"
                    className="form-control updateForm"
                    onChange={e => this.change(e)}
                    name="shiftStartDate"
                    value={this.state.shiftStartDate}
                  />
                  <span className="help-block updateForm">
                    {validation.shiftStartDate.message}
                  </span>
                </div>
              </div>
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label className="updateForm" htmlFor="End Date">
                    Shift End Date
                  </label>
                  <input
                    type="date"
                    placeholder="Shift End Date"
                    className="form-control updateForm"
                    onChange={e => this.change(e)}
                    name="shiftEndDate"
                    value={this.state.shiftEndDate}
                  />
                  <span className="help-block updateForm">
                    {validation.shiftEndDate.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label htmlFor="Shift Assign by updateForm">
                    Shift Assign By
                  </label>
                  <input
                    type="text"
                    placeholder="Shift Assign By"
                    className="form-control updateForm"
                    onChange={e => this.change(e)}
                    name="shiftAssignedBy"
                    value={this.state.shiftAssignedBy}
                  />
                  <span className="help-block updateForm">
                    {validation.shiftAssignedBy.message}
                  </span>
                </div>
              </div>
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label className="updateForm" htmlFor="Employee Id">
                    Employee Id
                  </label>
                  <select
                    type="text"
                    placeholder="Employee Id"
                    className="form-control updateForm"
                    onChange={e => this.employeeIdchange(e)}
                    name="employeeId"
                    value={this.state.employeeId}
                  >
                  {this.state.employee && this.state.employee.map(employee=>(
                    <option className="form-group updateForm" value={employee.empId} key={employee.empId}>
                    {employee.fullName}
                  </option>
                  ))
                    }
                    </select>
                </div>
              </div>
            </div>
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label className="updateForm" htmlFor="Workshift ID">
                    Workshift Id
                  </label>
                  <select
                  name="workShiftId"
                  className="form-control updateForm"
                  onChange={(e)=>this.workChange(e)}
                  value={this.state.workShiftId}
                  >
                  {this.state.workshift && this.state.workshift.map(work=>(
                    <option className="form-group updateForm" value={work.workshiftId} key={work.workshiftId}>
                      {work.workshiftType}
                    </option>
                  ))}
                  </select>
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-sm updateForm">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ShiftUpdate;
