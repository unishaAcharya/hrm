import React, { Component } from "react";
import FormValidator from "../../../commons/formValidator";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class ShiftForm extends Component {
  constructor() {
    super();
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
      }
    ]);
    this.state = {
      shiftStartDate: "",
      shiftEndDate: "",
      shiftAssignedDate: "",
      shiftAssignedBy: "",
      employeeId: "",
      workShiftId: "",
      workshift:[],
      employee:[],
      validation: this.validator.valid()
    };
  }

  componentWillMount(){
    Axios.get(`${Configuration.domain}/hrm/getAllWorkShiftIdAndTypeOnly`)
    .then(res=>{
      Axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
        .then(response => {

          this.setState({
            employee:response.data.t,
            workshift:res.data.t
          })
        })
        .catch(err => {
          console.log(err);
        });
    }).catch(err=>{
      console.log(err);
    })
  }
  employeeChange=e=>{
    this.setState({
      employeeId:e.target.value
    })
  }
  // For form Submit
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    await this.setState({ validation });
    this.submitted = true;
    var updatedata = {};
    updatedata.employeeId = this.state.employeeId;
    updatedata.shiftStartDate = this.state.shiftStartDate;
    updatedata.shiftEndDate = this.state.shiftEndDate;
    updatedata.shiftAssignedBy = this.state.shiftAssignedBy;
    updatedata.workShiftId = this.state.workShiftId;

    let that = this;
    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerWorkShiftAssign`,
        data: updatedata
      })
        .then(function(response) {
          if (response.status === 201) {
            toast.success("Success Notification!");
            that.setState({
              shiftStartDate: "",
              shiftEndDate: "",
              shiftAssignedBy: "",
              employeeId: "",
              workShiftId: ""
            });
          } else {
            toast.error("Error Notification !");
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };
  workChange=(e)=>{
    this.setState({
      workShiftId:e.target.value
    })
  }
  render() {
    let validation = this.state.validation;
    return (
      <div className="box-body">
        <form action="">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Start Date">Shift Start Date</label>
                <input
                  type="date"
                  placeholder="Shift Start Date"
                  className="form-control"
                  onChange={e => this.handleFieldChange(e)}
                  name="shiftStartDate"
                  value={this.state.shiftStartDate}
                />
                <span className="help-block">
                  {validation.shiftStartDate.message}
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="End Date">Shift End Date</label>
                <input
                  type="date"
                  placeholder="Shift End Date"
                  className="form-control"
                  onChange={e => this.handleFieldChange(e)}
                  name="shiftEndDate"
                  value={this.state.shiftEndDate}
                />
                <span className="help-block">
                  {validation.shiftEndDate.message}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Shift Assign by">Shift Assign By</label>
                <input
                  type="text"
                  placeholder="Shift Assign By"
                  className="form-control"
                  onChange={e => this.handleFieldChange(e)}
                  name="shiftAssignedBy"
                  value={this.state.shiftAssignedBy}
                />
                <span className="help-block">
                  {validation.shiftAssignedBy.message}
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Employee Id">Employee Id</label>
                <select
                  type="text"
                  placeholder="Employee Id"
                  className="form-control"
                  onChange={e => this.employeeChange(e)}
                  name="employeeId"
                  value={this.state.employeeId}
                >
                {this.state.employee && this.state.employee.map(employee=>(
                  <option value={employee.empId} key={employee.empId}>
                  {employee.fullName}
                </option>
                ))
                  }
              </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="Workshift ID">Workshift Id</label>
                <select
                name="workShiftId"
                className="form-control"
                onChange={(e)=>this.workChange(e)}
                value={this.state.workShiftId}
                >
                {this.state.workshift && this.state.workshift.map(work=>(
                  <option value={work.workshiftId} key={work.workshiftId}>
                    {work.workshiftType}
                  </option>
                ))}
                </select>
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    );
  }
}

export default ShiftForm;
