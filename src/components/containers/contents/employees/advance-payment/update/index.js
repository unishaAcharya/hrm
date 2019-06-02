import React, { Component } from "react";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";

class ShiftUpdate extends Component {
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
      validation: this.validator.valid()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      RequestId:nextProps.RequestId,
      advancePaymentId: nextProps.data.advancePaymentId,
      title: nextProps.data.title,
      deductionDate: nextProps.data.deductionDate,
      paidAmount: nextProps.data.paidAmount,
      employeeId: nextProps.data.employeeId,
      advanceRequestId: nextProps.data.advanceRequestId
    });
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdate = async e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    await this.setState({ validation });
    this.submitted = true;
    var updatedata = {};
    updatedata.advancePaymentId = this.state.advancePaymentId;
    updatedata.title = this.state.title;
    updatedata.deductionDate = this.state.deductionDate;
    updatedata.paidAmount = this.state.paidAmount;
    updatedata.advanceRequestId = this.state.advanceRequestId;
    let id = this.state.advancePaymentId;

    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateAdvancePayment/${id}`,
        data: updatedata
      })
        .then(
          function(response) {
            this.props.handleUpdate(updatedata);
          }.bind(this)
        )
        .catch(
          function(err) {
            console.log(err);
          }.bind(this)
        );
    }
  };
  RequestIdChange=e=>{
    this.setState({
      advanceRequestId:e.target.value
    })
  }
  employeeChange=e=>{
    this.setState({
      employeeId:e.target.value
    })
  }
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
            Advance Payment Update Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form>
            <div className="form-group updateForm">
              <label>Title</label>
              <div className="controls updateForm">
                <input
                  type="text"
                  name="title"
                  onChange={e => this.handleFieldChange(e)}
                  className="form-control updateForm"
                  placeholder="Title"
                  value={this.state.title}
                />
              </div>
              <span className="help-block updateForm">
                {validation.title.message}
              </span>
            </div>
            <div className="form-group updateForm">
              <label>Deduction Date</label>
              <div className="controls updateForm">
                <input
                  type="date"
                  name="deductionDate"
                  onChange={e => this.handleFieldChange(e)}
                  className="form-control updateForm"
                  placeholder="deductionDate"
                  value={this.state.deductionDate}
                />
              </div>
              <span className="help-block updateForm">
                {validation.deductionDate.message}
              </span>
            </div>
            <div className="form-group updateForm">
              <label>Paid Amount</label>
              <div className="controls updateForm">
                <input
                  name="paidAmount"
                  id="paidAmount"
                  onChange={e => this.handleFieldChange(e)}
                  type="text"
                  className="form-control updateForm"
                  placeholder="Paid Amount"
                  value={this.state.paidAmount}
                />
              </div>
              <span className="help-block updateForm">
                {validation.paidAmount.message}
              </span>
            </div>
            <div className="form-group updateForm">
              <label>Advance Request</label>
              <div className="controls">
                <select
                  name="advanceRequestId"
                  id="advanceRequestId"
                  onChange={e => this.RequestIdChange(e)}
                  type="text"
                  className="form-control updateForm"
                  placeholder="advance Request Id"
                  value={this.state.advanceRequestId}
                >
                {this.state.RequestId && this.state.RequestId.map(id=>(
                  <option className="form-group updateForm" value={id.advanceRequestId} key={id.advanceRequestId}>
                  {id.advanceRequestId}
                  </option>
                ))}
              </select>
              </div>

            </div>

            <div className="text-xs-right updateForm">
              <button
                onClick={this.handleUpdate}
                type="submit"
                className="btn btn-info updateForm"
              >
                Submit
              </button>
            </div>
            <ToastContainer />
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default ShiftUpdate;
