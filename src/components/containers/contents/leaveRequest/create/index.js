import React, { Component } from "react";
import FormValidator from "../../commons/formValidator";
import Axios from "axios";
import Configuration from "../../commons/configuration/server";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default class LeaveModel extends Component {
  constructor(props) {
    super(props);
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
        field: "extraDays",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Numbers are required."
      },
      {
        field: "payForExtraDays",
        method: "isEmpty",
        validWhen: false,
        message: "pay For Extra Days is required."
      },
      {
        field: "payForExtraDays",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Numbers are required."
      },
      {
        field: "extraDays",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Numbers are required."
      },
      {
        field: "approvedBy",
        method: "isEmpty",
        validWhen: false,
        message: "Approved By is required."
      },
      {
        field: "approvedBy",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "comment",
        method: "isEmpty",
        validWhen: false,
        message: "Comment is required."
      }
    ]);
    this.state = {
      employee:[],
      leave:[],
      leaveType: "",
      leaveStartDate: "",
      leaveEndDate: "",
      extraDays: "",
      payForExtraDays: "",
      employeeId: "",
      approvedBy: "",
      comment: "",
      validation: this.validator.valid()
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  employeeChange=e=>{
    this.setState({
      employeeId:e.target.value
    })
  }
  componentWillMount(){
    Axios.get(`${Configuration.domain}/hrm/getAllLeaveIdAndTypeOnly`)
      .then(response => {
        console.log();
        Axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
          .then(res => {
            console.log(response);
            this.setState({
              employee:res.data.t,
              employeeId:res.data.t[0].empId,
              leaveType:response.data.t[0].leaveId,
              leave:response.data.t
            })
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleFormSubmit = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    var data = {};
    data.leaveType = this.state.leaveType;
    data.leaveStartDate = this.state.leaveStartDate;
    data.leaveEndDate = this.state.leaveEndDate;
    data.extraDays = this.state.extraDays;
    data.payForExtraDays = this.state.payForExtraDays;
    data.employeeId = this.state.employeeId;
    data.approvedBy = this.state.approvedBy;
    data.comment = this.state.comment;
    let that = this;


    console.log(data);
    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerLeaveRequest`,
        data: data
      })
        .then(function(response) {
          let status = response.status;
          if (status == 201) {
            toast.success("Success Notification!");
            that.setState({
              leaveType: "Sick",
              leaveStartDate: "",
              leaveEndDate: "",
              extraDays: "",
              payForExtraDays: "",
              employeeId: "",
              approvedBy: "",
              comment: ""
            });
          } else {
            toast.error("Error Notification !");
          }
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    }
  };
  leaveTypeChange=e=>{
    this.setState({
      leaveType:e.target.value
    })
  }
  render() {
    let { validation } = this.state;
    return (
      <div className="box-body">
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleFormSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Leave Type</label>
                    <div className="controls">
                      <select
                        className="form-control"
                        name="leaveType"
                        onChange={this.leaveTypeChange}
                        value={this.state.leaveType}
                        >
                      {this.state && this.state.leave.map(leave=>(
                        <option value={leave.leaveType} key={leave.leaveId}>{leave.leaveType}</option>
                      ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>leave Start Date</label>
                    <div className="controls">
                      <input
                        type="date"
                        name="leaveStartDate"
                        className="form-control"
                        placeholder="leave Start Date"
                        onChange={this.handleFieldChange}
                        value={this.state.leaveStartDate}
                      />
                    </div>
                    <span className="help-block">
                      {validation.leaveStartDate.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>leave End Date</label>
                    <div className="controls">
                      <input
                        name="leaveEndDate"
                        id="leaveEndDate"
                        type="date"
                        className="form-control"
                        placeholder="leaveEndDate"
                        onChange={this.handleFieldChange}
                        value={this.state.leaveEndDate}
                      />
                    </div>
                    <span className="help-block">
                      {validation.leaveEndDate.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Employee Id</label>
                    <div className="controls">
                      <select
                        name="employeeId"
                        id="employeeId"
                        type="text"
                        className="form-control"
                        placeholder="Employee Id"
                        onChange={this.employeeChange}
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
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Extra Days</label>
                    <div className="controls">
                      <input
                        name="extraDays"
                        id="extraDays"
                        type="text"
                        className="form-control"
                        placeholder="Extra Days"
                        onChange={this.handleFieldChange}
                        value={this.state.extraDays}
                      />
                    </div>
                    <span className="help-block">
                      {validation.extraDays.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Pay For Extra Days</label>
                    <div className="controls">
                      <input
                        name="payForExtraDays"
                        id="payForExtraDays"
                        type="text"
                        className="form-control"
                        placeholder="Pay For Extra Days"
                        onChange={this.handleFieldChange}
                        value={this.state.payForExtraDays}
                      />
                    </div>
                    <span className="help-block">
                      {validation.payForExtraDays.message}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Approved By</label>
                    <div className="controls">
                      <input
                        name="approvedBy"
                        id="approvedBy"
                        type="text"
                        className="form-control"
                        placeholder="Approved By"
                        onChange={this.handleFieldChange}
                        value={this.state.approvedBy}
                      />
                    </div>
                    <span className="help-block">
                      {validation.approvedBy.message}
                    </span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Comment</label>
                    <div className="controls">
                      <textarea
                        name="comment"
                        id="comment"
                        type="text"
                        className="form-control"
                        placeholder="Comment"
                        onChange={this.handleFieldChange}
                        value={this.state.comment}
                      />
                    </div>
                    <span className="help-block">
                      {validation.comment.message}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs-right">
                <button type="submit" className="btn btn-info">
                  Submit
                </button>
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
