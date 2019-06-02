import React, { Component } from "react";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";
import Axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class CreateAttendance extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
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
      }
    ]);
    this.state = {
      employee: [],
      employeeId: "",
      validation: this.validator.valid(),
      approvedBy: ""
    };
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
        this.setState({
          employee: response.data.t,
          employeeId:response.data.t[0].empId
         });
      }
    );
  }
  saveAttendance = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    let data = {};
    data.employeeId = this.state.employeeId;
    data.approvedBy = this.state.approvedBy;

    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerAttendance`,
        data: data
      })
        .then(response => {
          if (response.status === 201) {
            toast.success("Success Notification!");
            this.setState({
              employeeId: "",
              approvedBy: ""
            });
          } else {
            toast.error("Error Notification !");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    let { validation, employee } = this.state;
    return (
      <div className="box">
        <div className="box-body">
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group">
                  <label>Employee Id</label>
                  <div className="controls">
                    <select
                      className="form-control"
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
                <div className="form-group">
                  <label>Approved By</label>
                  <div className="controls">
                    <input
                      type="text"
                      name="approvedBy"
                      className="form-control"
                      placeholder="Approved By"
                      onChange={this.handleFieldChange}
                      value={this.state.approvedBy}
                    />
                    <span className="help-block">
                      {validation.approvedBy.message}
                    </span>
                  </div>
                </div>
                <div className="text-xs-right">
                  <button
                    onClick={this.saveAttendance}
                    type="submit"
                    className="btn btn-info"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAttendance;
