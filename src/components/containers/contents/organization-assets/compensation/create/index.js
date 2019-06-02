import React, { Component } from "react";
import Axios from "axios";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default class CompensationAllowance extends Component {
  constructor(props) {
    super(props);
    this.validationPercentage = new FormValidator([
      {
        field: "percentage",
        method: "isEmpty",
        validWhen: false,
        message: "Percentage is required."
      },
      {
        field: "percentage",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Only Numbers is required."
      },
      {
        field: "projectId",
        method: "isEmpty",
        validWhen: false,
        message: "Project Id is required."
      },
      {
        field: "completeDate",
        method: "isEmpty",
        validWhen: false,
        message: "Complete Date is required."
      }
    ]);
    this.validationCash = new FormValidator([
      {
        field: "cash",
        method: "isEmpty",
        validWhen: false,
        message: "Cash is required."
      },
      {
        field: "cash",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Only Numbers is required."
      },
    ]);
    this.validationPaymentSchedule = new FormValidator([
      {
        field: "paymentRules",
        method: "isEmpty",
        validWhen: false,
        message: "Payment Rules is required."
      }
    ]);
    this.validationallowanceType = new FormValidator([
      {
        field: "paymentFrom",
        method: "isEmpty",
        validWhen: false,
        message: "Payment From is required."
      },
      {
        field: "paymentFrom",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Only Numbers is required."
      },
    ]);

    this.state = {
      allowanceType: [],
      paymentType: "percentage",
      percentage: "",
      cash: "",
      paymentFrom: "",
      unit: "day",
      projectId: "",
      paymentRules: [{ abc: "11", xyz: "22" }],
      paymentSchedule: "projectend",
      completeDate: "",
      activepercentage: true,
      activeinterval: false,
      allowance: "f9dcb729-5ff5-4480-8a3a-9f46107464db",
      validation: this.validationallowanceType.valid(),
      validationCash: this.validationCash.valid(),
      validationPercentage: this.validationPercentage.valid(),
      validationPaymentSchedule: this.validationPaymentSchedule.valid()
    };
    this.submitted = false;
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllAllowanceAndCompensation`)
      .then(res => {
        this.setState({
          allowanceType: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFieldChange = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
    if (this.state.paymentType === "percentage") {
      this.setState({ activepercentage: true });
    } else {
      this.setState({ activepercentage: false });
    }
    if (
      this.state.activepercentage &&
      this.state.paymentSchedule === "interval"
    ) {
      this.setState({ activeinterval: true });
    } else {
      this.setState({ activeinterval: false });
    }
    if (this.state.paymentType === "cash") {
      this.setState({ activepercentage: false });
    } else {
      this.setState({ activepercentage: true });
    }
  };
  onChange = e => {
    this.setState({
      allowance: e.target.value
    });
  };
  handleFormSubmit = async event => {
    event.preventDefault();
    var cash = {};
    cash.cash = this.state.cash;

    var percentage = {};
    percentage.percentage = this.state.percentage;
    percentage.projectId = this.state.projectId;
    percentage.completeDate = this.state.completeDate;

    var paymentSchedule = {};
    paymentSchedule.paymentRules = this.state.paymentRules;

    var allowanceType = {};
    allowanceType.allowance = this.state.allowance;
    allowanceType.unit = this.state.unit;
    allowanceType.paymentFrom = this.state.paymentFrom;

    const validation = this.validationallowanceType.validate(allowanceType);
    var that = this;

    if (this.state.paymentType === "percentage") {
      const validationPercentage = this.validationPercentage.validate(
        percentage
      );
      await this.setState({
        validation,
        validationPercentage
      });
      var percentagedata = {};
      percentagedata.allowanceType = this.state.allowance;
      percentagedata.paymentType = this.state.paymentType;
      percentagedata.percentage = this.state.percentage;
      percentagedata.paymentFrom = this.state.paymentFrom;
      percentagedata.unit = this.state.unit;
      percentagedata.projectId = this.state.projectId;
      percentagedata.paymentSchedule = this.state.paymentSchedule;
      percentagedata.completeDate = this.state.completeDate;

      if (this.state.paymentSchedule === "interval") {
        const validationPaymentSchedule = this.validationPaymentSchedule.validate(
          paymentSchedule
        );
        const validationPercentage = this.validationPercentage.validate(
          percentage
        );
        await this.setState({
          validation,
          validationPercentage,
          validationPaymentSchedule
        });
        var paymentRules = {};
        paymentRules.allowanceType = this.state.allowance;
        paymentRules.paymentType = this.state.paymentType;
        paymentRules.percentage = this.state.percentage;
        paymentRules.paymentFrom = this.state.paymentFrom;
        paymentRules.unit = this.state.unit;
        paymentRules.projectId = this.state.projectId;
        paymentRules.paymentRules = ["11", "22"];
        paymentRules.paymentSchedule = this.state.paymentSchedule;
        paymentRules.completeDate = this.state.completeDate;


        Axios({
          method: "post",
          url: `${Configuration.domain}/hrm/registerAllowanceAndCompensation`,
          data: paymentRules
        })
          .then(response => {
            let status = response.status;
            if (status === 201) {
              that.setState({
                allowance: "",
                paymentType: "percentage",
                percentage: "",
                cash: "",
                paymentFrom: "",
                unit: "day",
                projectId: "",
                paymentRules: [],
                paymentSchedule: "project end",
                completeDate: ""
              });
              toast.success("Insert Successfully!");
            } else {
              toast.error("Error Notification !");
            }
          })
          .catch(function(response) {
            console.log(response);
          });
      } else if (validationPercentage.isValid && validation.isValid) {
        Axios({
          method: "post",
          url: `${Configuration.domain}/hrm/registerAllowanceAndCompensation`,
          data: percentagedata
        })
          .then(response => {
            let status = response.status;
            if (status === 201) {
              that.setState({
                allowance: "",
                paymentType: "percentage",
                percentage: "",
                cash: "",
                paymentFrom: "",
                unit: "day",
                projectId: "",
                paymentRules: [],
                paymentSchedule: "project end",
                completeDate: ""
              });
              toast.success("Insert Successfully!");
            } else {
              toast.error("Insert Notification !");
            }
          })
          .catch(function(response) {
            console.log(response);
          });
      }
    } else if (this.state.paymentType === "cash") {
      const validationCash = this.validationCash.validate(cash);
      await this.setState({
        validation,
        validationCash
      });
      var cashdata = {};
      cashdata.allowanceType = this.state.allowance;
      cashdata.paymentType = this.state.paymentType;
      cashdata.cash = this.state.cash;
      cashdata.paymentFrom = this.state.paymentFrom;
      cashdata.unit = this.state.unit;


      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerAllowanceAndCompensation`,
        data: cashdata
      })
        .then(response => {
          let status = response.status;
          if (status === 201) {
            that.setState({
              allowance: "",
              paymentType: "percentage",
              percentage: "",
              cash: "",
              paymentFrom: "",
              unit: "day",
              projectId: "",
              paymentRules: [],
              paymentSchedule: "project end",
              completeDate: ""
            });
            toast.success("Insert Successfully!");
          } else {
            toast.error("Insert Notification !");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  };

  render() {
    let validation = this.state.validation;
    let validationCash = this.state.validationCash;
    let validationPercentage = this.state.validationPercentage;
    let validationPaymentSchedule = this.state.validationPaymentSchedule;
    let { allowanceType } = this.state;
    return (
      <div className="box">
        <div className="box-body">
          <div className="row">
            <div className="col">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Allowance Type</label>
                      <select
                        className="form-control"
                        onChange={e => this.onChange(e)}
                        name="allowance"
                        value={this.state.allowance}
                      >
                        {this.state &&
                          this.state.allowanceType &&
                          this.state.allowanceType.map(allowanceType => (
                            <option
                              value={allowanceType.allowanceTypeId}
                              onChange={e => this.onChange(e)}
                              key={allowanceType.allowanceTypeId}
                            >
                              {allowanceType.allowanceType}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Payment Type</label>
                      <select
                        className="form-control"
                        onChange={e => this.handleFieldChange(e)}
                        name="paymentType"
                        value={this.state.paymentType}
                      >
                        <option value="percentage">Percentage</option>
                        <option value="cash">Cash</option>
                      </select>
                    </div>
                  </div>
                  {this.state.activepercentage && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Percentage</label>
                        <div className="controls">
                          <input
                            type="text"
                            name="percentage"
                            onChange={e => this.handleFieldChange(e)}
                            className="form-control"
                            placeholder="Percentage"
                            value={this.state.percentage}
                          />
                        </div>
                        <span className="help-block">
                          {validationPercentage.percentage.message}
                        </span>
                      </div>
                    </div>
                  )}
                  {!this.state.activepercentage && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Cash</label>
                        <div className="controls">
                          <input
                            type="text"
                            name="cash"
                            onChange={e => this.handleFieldChange(e)}
                            className="form-control"
                            placeholder="Cash"
                            value={this.state.cash}
                          />
                        </div>
                        <span className="help-block">
                          {validationCash.cash.message}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Payment From</label>
                      <div className="controls">
                        <input
                          type="text"
                          name="paymentFrom"
                          onChange={e => this.handleFieldChange(e)}
                          className="form-control"
                          placeholder="Payment From"
                          value={this.state.paymentFrom}
                        />
                      </div>
                      <span className="help-block">
                        {validation.paymentFrom.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Unit</label>
                      <div className="controls">
                        <select
                          className="form-control"
                          onChange={e => this.handleFieldChange(e)}
                          name="unit"
                          value={this.state.unit}
                        >
                          <option value="day">Days</option>
                          <option value="week">Week</option>
                          <option value="month">Month</option>
                          <option value="year">Year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {this.state.activepercentage && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Project Id</label>
                        <div className="controls">
                          <input
                            type="text"
                            name="projectId"
                            onChange={e => this.handleFieldChange(e)}
                            className="form-control"
                            placeholder="Project Id"
                            value={this.state.projectId}
                          />
                        </div>
                        <span className="help-block">
                          {validationPercentage.projectId.message}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {this.state.activepercentage && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Payment Schedule</label>
                        <div className="controls">
                          <select
                            className="form-control"
                            onChange={e => this.handleFieldChange(e)}
                            name="paymentSchedule"
                            value={this.state.paymentSchedule}
                          >
                            <option value="projectend">Project End</option>
                            <option value="interval">Interval</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Complete Date</label>
                        <div className="controls">
                          <input
                            type="date"
                            name="completeDate"
                            onChange={e => this.handleFieldChange(e)}
                            className="form-control"
                            placeholder="Complete Date"
                            value={this.state.completeDate}
                          />
                        </div>
                        <span className="help-block">
                          {validationPercentage.completeDate.message}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {this.state.activeinterval && (
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Payment Rules</label>
                        <input
                          type="text"
                          name="paymentRules"
                          onChange={e => this.handleFieldChange(e)}
                          className="form-control"
                          placeholder="Payment Rules"
                          value={this.state.paymentRules}
                        />
                      </div>
                      <span className="help-block">
                        {validationPaymentSchedule.paymentRules.message}
                      </span>
                    </div>
                  </div>
                )}
                <div className="text-xs-right">
                  <button
                    onClick={this.handleFormSubmit}
                    type="submit"
                    className="btn btn-info-sm"
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
