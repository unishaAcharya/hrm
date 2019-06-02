import React, { Component } from "react";
import FormValidator from "../../../commons/formValidator";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Configuration from "../../../commons/configuration/server";
import helpers from "../../../commons/helper";

class WorkShift extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "workshiftType",
        method: "isEmpty",
        validWhen: false,
        message: "Workshift name is requried."
      },
      {
        field: "workshiftType",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "workshiftStartTime",
        method: "isEmpty",
        validWhen: false,
        message: "Workshift start time is required."
      },
      {
        field: "workshiftEndTime",
        method: "isEmpty",
        validWhen: false,
        message: "Workshift end time is required."
      }
    ]);
    this.overTimeValidator = new FormValidator([
      {
        field: "overtimeMinutes",
        method: "isEmpty",
        validWhen: false,
        message: "Over time is requried"
      }
    ]);
    this.state = {
      workshiftType: "",
      workshiftStartTime: "",
      workshiftEndTime: "",
      isOvertimeApplicable: "no",
      overtimeMinutes: "",
      displayOverTime: false,
      validation: this.validator.valid(),
      overTimeValidator: this.overTimeValidator.valid()
    };
    // this.convertTo12Hours = this.convertTo12Hours.bind(this)
  }

  changeFields = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
    if (this.state.isOvertimeApplicable === "yes") {
      this.setState({
        displayOverTime: true
      });
    } else {
      this.setState({
        displayOverTime: false
      });
    }
  };

  saveWorkShift = async event => {
    event.preventDefault();
    var data = {};
    data.workshiftType = this.state.workshiftType;
    data.workshiftStartTime = helpers.convertTo12Hours(
      this.state.workshiftStartTime
    );
    data.workshiftEndTime = helpers.convertTo12Hours(
      this.state.workshiftEndTime
    );
    data.isOvertimeApplicable = this.state.isOvertimeApplicable;
    data.overtimeMinutes = this.state.overtimeMinutes;

    if (this.state.displayOverTime) {
      const validation = this.validator.validate(data);
      var overTimedata = {};
      overTimedata.overtimeMinutes = this.state.overtimeMinutes;
      const overTimeValidator = this.overTimeValidator.validate(overTimedata);
      await this.setState({ validation, overTimeValidator });
    } else {
      const validation = this.validator.validate(data);
      await this.setState({ validation });
    }

    if (this.state.validation.isValid) {
      axios
        .post(`${Configuration.domain}/hrm/registerWorkShift`, data)
        .then(response => {
          if (response.status === 201) {
            toast.success("Success Created !");
            this.workshiftForm.reset();
            this.setState({
              workshiftType: "",
              workshiftStartTime: "",
              workshiftEndTime: "",
              isOvertimeApplicable: "no",
              overtimeMinutes: "",
              displayOverTime: false
            });
          } else {
            toast.error("Something wents wrong !");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    let { validation, overTimeValidator } = this.state;

    return (
      <div className="box">
        <div className="box-body">
          <div className="row">
            <div className="col">
              <form ref={el => (this.workshiftForm = el)}>
                <div className="form-group">
                  <div className="controls">
                    <label>Work Shift Name</label>
                    <input
                      name="workshiftType"
                      onChange={e => this.changeFields(e)}
                      type="text"
                      className="form-control"
                      placeholder="Work Shift Name"
                    />
                  </div>
                  <span className="help-block">
                    {validation.workshiftType.message}
                  </span>
                </div>
                <div className="form-group">
                  <div className="controls">
                    <label>Start Time:</label>
                    <input
                      name="workshiftStartTime"
                      onChange={e => this.changeFields(e)}
                      type="time"
                      className="form-control"
                      placeholder="Shift Start Time"
                    />
                  </div>
                  <span className="help-block">
                    {validation.workshiftStartTime.message}
                  </span>
                </div>
                <div className="form-group">
                  <div className="controls">
                    <label>End Time</label>
                    <input
                      name="workshiftEndTime"
                      onChange={e => this.changeFields(e)}
                      type="time"
                      className="form-control"
                      placeholder="Shift End Time"
                    />
                  </div>
                  <span className="help-block">
                    {validation.workshiftEndTime.message}
                  </span>
                </div>
                <div className="form-group">
                  <div className="controls">
                    <label>Is Overtime available??</label>
                    <select
                      className="form-control"
                      onChange={e => this.changeFields(e)}
                      name="isOvertimeApplicable"
                    >
                      <option value="no"> No</option>
                      <option value="yes"> Yes</option>
                    </select>
                  </div>
                </div>
                {this.state.displayOverTime ? (
                  <div className="form-group">
                    <div className="controls">
                      <label>Overtime Duration</label>
                      <input
                        name="overtimeMinutes"
                        onChange={e => this.changeFields(e)}
                        type="text"
                        className="form-control"
                        placeholder="Overtime Duration (in minutes)"
                      />
                    </div>
                    <span className="help-block">
                      {overTimeValidator.overtimeMinutes.message}
                    </span>
                  </div>
                ) : (
                  ""
                )}

                <div className="text-xs-right">
                  <button
                    onClick={this.saveWorkShift}
                    type="submit"
                    className="btn btn-info btn-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default WorkShift;
