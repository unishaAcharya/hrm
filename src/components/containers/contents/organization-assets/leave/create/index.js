import React, { Component } from "react";
import FormValidator from "../../../commons/formValidator";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default class Leave extends Component {
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
      leavedynamic: [],
      leave:"",
      totalLeaveDays: "",
      validation: this.validator.valid()
    };
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllLeaveIdAndTypeOnly`)
      .then(res => {
        this.setState({
          leavedynamic:res.data.t
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleFormSubmit = async e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);

    await this.setState({ validation });
    var leavedata = {};
    leavedata.leaveType = this.state.leave;
    leavedata.totalLeaveDays = this.state.totalLeaveDays;

    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerLeave`,
        data: leavedata
      })
        .then(function(response) {
          if (response.status === 201) {
            toast.success("Success Notification !");
            this.setState({
              leaveType: "Bereavement",
              totalLeaveDays: ""
            });
          } else {
            toast.error("Error Notification !");
          }
        }.bind(this))
        .catch(function(response) {
          console.log(response);
        });
    }
  };

  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  leaveChange = e => {
    this.setState({
      leave: e.target.value
    });
  };
  render() {
    let validation = this.state.validation;
    return (
      <div className="box">
        <div className="box-body">
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group">
                  <label>Leave Type</label>
                  <div className="controls">
                    <select
                      className="form-control"
                      onChange={e => this.leaveChange(e)}
                      name="leave"
                      value={this.state.leave}
                    >
                    {this.state && this.state.leavedynamic.map(leave=>(
                      <option value={leave.leaveId} key={leave.leaveId}>{leave.leaveType}</option>
                    ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Total Leave Days</label>
                  <div className="controls">
                    <input
                      name="totalLeaveDays"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="totalLeaveDays"
                      value={this.state.totalLeaveDays}
                    />
                  </div>
                  <span className="help-block">
                    {validation.totalLeaveDays.message}
                  </span>
                </div>
                <div className="text-xs-right">
                  <button
                    onClick={this.handleFormSubmit}
                    type="submit"
                    className="btn btn-info btn-sm"
                  >
                    Submit
                  </button>
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
