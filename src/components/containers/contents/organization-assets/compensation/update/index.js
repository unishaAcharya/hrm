import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";

export default class BranchUpdate extends Component {
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
      }
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
      }
    ]);

    this.state = {
      activepercentage: true,
      activeinterval: false,
      allowance: "",
      validation: this.validationallowanceType.valid(),
      validationCash: this.validationCash.valid(),
      validationPercentage: this.validationPercentage.valid(),
      validationPaymentSchedule: this.validationPaymentSchedule.valid()
    };
  }

  change = async e => {
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

  componentWillReceiveProps(nextProps) {
    this.setState({

      allowanceId: nextProps.data.allowanceId,
      allowanceType: nextProps.allowanceType,
      allowance: nextProps.data.allowanceType,
      paymentType: nextProps.data.paymentType,
      percentage: nextProps.data.percentage,
      cash: nextProps.data.cash,
      paymentFrom: nextProps.data.paymentFrom,
      unit: nextProps.data.unit,
      projectId: nextProps.data.projectId,
      paymentRules: nextProps.data.paymentRules,
      paymentSchedule: nextProps.data.paymentSchedule,
      completeDate: nextProps.data.completeDate
    });
    if (nextProps.data.paymentType === "percentage") {
      this.setState({ activepercentage: true });
    } else {
      this.setState({ activepercentage: false });
    }
    if (
      nextProps.data.paymentType === "percentage" &&
      nextProps.data.paymentSchedule === "interval"
    ) {
      this.setState({ activeinterval: true });
    } else {
      this.setState({ activeinterval: false });
    }
    if (nextProps.data.paymentType === "cash") {
      this.setState({ activepercentage: false });
    } else {
      this.setState({ activepercentage: true });
    }
  }
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
    var id = this.state.allowanceId;

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
          method: "put",
          url: `${
            Configuration.domain
          }/hrm/updateAllowanceAndCompensation/${id}`,
          data: paymentRules
        })
          .then(response => {
            let status = response.status;
            if (status === 200) {
              that.props.handleUpdate(paymentRules);
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
            }
          })
          .catch(function(response) {
            console.log(response);
          });
      } else if (validationPercentage.isValid && validation.isValid) {
        Axios({
          method: "put",
          url: `${
            Configuration.domain
          }/hrm/updateAllowanceAndCompensation/${id}`,
          data: percentagedata
        })
          .then(response => {
            let status = response.status;
            if (status === 200) {
              that.props.handleUpdate(percentagedata);
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
        method: "put",
        url: `${Configuration.domain}/hrm/updateAllowanceAndCompensation/${id}`,
        data: cashdata
      })
        .then(response => {
          let status = response.status;
          if (status === 200) {
            that.props.handleUpdate(cashdata);
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
      <Modal
        show={this.props.open}
        onHide={this.props.closeModal}
        aria-labelledby="ModalHeader"
        className="updateForm"
      >
        <Modal.Header closeButton className="updateForm">
          <Modal.Title id="ModalHeader" className="updateForm">
            Compensation and Allowance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form>
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <h5>Allowance Type</h5>
                  <select
                    className="form-control updateForm"
                    onChange={e => this.onChange(e)}
                    name="allowance"
                    value={this.state.allowance}
                  >
                    {this.state &&
                      this.state.allowanceType &&
                      this.state.allowanceType.map(allowanceType => (
                        <option
                          className="form-control updateForm"
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
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <h5>Payment Type</h5>
                  <select
                    className="form-control updateForm"
                    onChange={e => this.change(e)}
                    name="paymentType"
                    value={this.state.paymentType}
                  >
                    <option
                      className="form-control updateForm"
                      value="percentage"
                    >
                      Percentage
                    </option>
                    <option className="form-control updateForm" value="cash">
                      Cash
                    </option>
                  </select>
                </div>
              </div>
              {this.state.activepercentage && (
                <div className="col-md-6 updateForm">
                  <div className="form-group updateForm">
                    <h5>Percentage</h5>
                    <div className="controls updateForm">
                      <input
                        type="text"
                        name="percentage"
                        onChange={e => this.change(e)}
                        className="form-control updateForm"
                        placeholder="Percentage"
                        value={this.state.percentage}
                      />
                    </div>
                    <span className="help-block updateForm">
                      {validationPercentage.percentage.message}
                    </span>
                  </div>
                </div>
              )}
              {!this.state.activepercentage && (
                <div className="col-md-6 updateForm">
                  <div className="form-group updateForm">
                    <h5>Cash</h5>
                    <div className="controls updateForm">
                      <input
                        type="text"
                        name="cash"
                        onChange={e => this.change(e)}
                        className="form-control updateForm"
                        placeholder="Cash"
                        value={this.state.cash}
                      />
                    </div>
                    <span className="help-block updateForm">
                      {validationCash.cash.message}
                    </span>
                  </div>
                </div>
              )}
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <h5>Payment From</h5>
                  <div className="controls updateForm">
                    <input
                      type="text"
                      name="paymentFrom"
                      onChange={e => this.change(e)}
                      className="form-control updateForm"
                      placeholder="Payment From"
                      value={this.state.paymentFrom}
                    />
                  </div>
                  <span className="help-block updateForm">
                    {validation.paymentFrom.message}
                  </span>
                </div>
              </div>
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <h5>Unit</h5>
                  <div className="controls updateForm">
                    <select
                      className="form-control updateForm"
                      onChange={e => this.change(e)}
                      name="unit"
                      value={this.state.unit}
                    >
                      <option className="form-control updateForm" value="day">
                        Days
                      </option>
                      <option className="form-control updateForm" value="week">
                        Week
                      </option>
                      <option className="form-control updateForm" value="month">
                        Month
                      </option>
                      <option className="form-control updateForm" value="year">
                        Year
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              {this.state.activepercentage && (
                <div className="col-md-6 updateForm">
                  <div className="form-group updateForm">
                    <h5>Project Id</h5>
                    <div className="controls updateForm">
                      <input
                        type="text"
                        name="projectId"
                        onChange={e => this.change(e)}
                        className="form-control updateForm"
                        placeholder="Project Id"
                        value={this.state.projectId}
                      />
                    </div>
                    <span className="help-block updateForm">
                      {validationPercentage.projectId.message}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {this.state.activepercentage && (
              <div className="row updateForm">
                <div className="col-md-6 updateForm">
                  <div className="form-group updateForm">
                    <h5>Payment Schedule</h5>
                    <div className="controls updateForm">
                      <select
                        className="form-controls updateForm"
                        onChange={e => this.change(e)}
                        name="paymentSchedule"
                        value={this.state.paymentSchedule}
                      >
                        <option
                          className="form-controls updateForm"
                          value="projectend"
                        >
                          Project End
                        </option>
                        <option
                          className="form-controls updateForm"
                          value="interval"
                        >
                          Interval
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 updateForm">
                  <div className="form-group updateForm">
                    <h5>Complete Date</h5>
                    <div className="controls updateForm">
                      <input
                        type="date"
                        name="completeDate"
                        onChange={e => this.change(e)}
                        className="form-control updateForm"
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
              <div className="row updateForm">
                <div className="col-md-6 updateForm">
                  <div className="form-group updateForm">
                    <h5>Payment Rules</h5>
                    <input
                      type="text"
                      name="paymentRules"
                      onChange={e => this.change(e)}
                      className="form-control updateForm"
                      placeholder="Payment Rules"
                      value={this.state.paymentRules}
                    />
                  </div>
                  <span className="help-block updateForm">
                    {validationPaymentSchedule.paymentRules.message}
                  </span>
                </div>
              </div>
            )}
            <div className="text-xs-right updateForm">
              <button
                onClick={this.handleFormSubmit}
                type="submit"
                className="btn btn-info-sm updateForm"
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
