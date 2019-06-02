import React, { Component } from "react";
import Axios from "axios";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class AdvancePayment extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "title",
        method: "isEmpty",
        validWhen: false,
        message: "title is required."
      },
      {
        field: "title",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "deductionDate",
        method: "isEmpty",
        validWhen: false,
        message: "Deduction Date is required."
      },
      {
        field: "paidAmount",
        method: "isEmpty",
        validWhen: false,
        message: "Paid Amount is required."
      },
      {
        field: "paidAmount",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Numbers are required."
      }

    ]);
    this.state = {
      employee:[],
      title: "",
      deductionDate: "",
      paidAmount: "",
      employeeId: "",
      advanceRequestId: "",
      RequestId:[],
      validation: this.validator.valid()
    };
  }
  componentWillMount(){
    Axios.get(`${Configuration.domain}/hrm/getAllAdvanceRequestIdOnly`)
    .then(function(response) {
      Axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
      .then(function(res) {
        this.setState({
            RequestId:response.data.t,
            advanceRequestId:response.data.t[0].advanceRequestId,
            employee:res.data.t,
            employeeId:res.data.t[0].empId
        })
        }.bind(this))
      .catch(function(response) {
        console.log(response);
      });
      this.setState({
          RequestId:response.data.t
      })
      }.bind(this))
    .catch(function(response) {
      console.log(response);
    });
  }
  employeeChange=e=>{
    this.setState({
      employeeId:e.target.value
    })
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  saveRequest = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    var data = {};
    data.title = this.state.title;
    data.deductionDate = this.state.deductionDate;
    data.paidAmount = this.state.paidAmount;
    data.advanceRequestId = this.state.advanceRequestId;
    data.employeeId = this.state.employeeId;

    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerAdvancePayment`,
        data: data
      })
        .then(function(response) {
          if (response.status === 201) {
            this.setState({
              title: "",
              deductionDate: "",
              paidAmount: "",
              employeeId: "",
              advanceRequestId: "",
            });
            toast.success("Success Notification !");
          } else {
            toast.error("Error Notification !");
          }
        }.bind(this))
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    }
  };
  RequestIdChange=e=>{
    this.setState({
      advanceRequestId:e.target.value
    })
  }
  render() {
    console.log(this.state);
    let { validation } = this.state;
    return (
      <div className="box">
        <div className="box-body">
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group">
                  <label>Title</label>
                  <div className="controls">
                    <input
                      type="text"
                      name="title"
                      onChange={e => this.handleFieldChange(e)}
                      className="form-control"
                      placeholder="Title"
                      value={this.state.title}
                    />
                  </div>
                  <span className="help-block">{validation.title.message}</span>
                </div>
                <div className="form-group">
                  <label>Deduction Date</label>
                  <div className="controls">
                    <input
                      type="date"
                      name="deductionDate"
                      onChange={e => this.handleFieldChange(e)}
                      className="form-control"
                      placeholder="deductionDate"
                      value={this.state.deductionDate}
                    />
                  </div>
                  <span className="help-block">
                    {validation.deductionDate.message}
                  </span>
                </div>
                <div className="form-group">
                  <label>Paid Amount</label>
                  <div className="controls">
                    <input
                      name="paidAmount"
                      id="paidAmount"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="Paid Amount"
                      value={this.state.paidAmount}
                    />
                  </div>
                  <span className="help-block">
                    {validation.paidAmount.message}
                  </span>
                </div>
                <div className="form-group">
                  <label>Employee ID</label>
                  <div className="controls">
                    <select
                      type="text"
                      name="employeeId"
                      onChange={e => this.employeeChange(e)}
                      className="form-control"
                      placeholder="employeeId"
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
                <div className="form-group">
                  <label>Advance Request Id</label>
                  <div className="controls">
                    <select
                      name="advanceRequestId"
                      id="advanceRequestId"
                      onChange={e => this.RequestIdChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="advance Request Id"
                      value={this.state.advanceRequestId}
                      >
                      {this.state && this.state.RequestId.map(id=>(
                        <option value={id.advanceRequestId} key={id.advanceRequestId}>
                        {id.advanceRequestId}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-xs-right">
                  <button
                    onClick={this.saveRequest}
                    type="submit"
                    className="btn btn-info"
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
