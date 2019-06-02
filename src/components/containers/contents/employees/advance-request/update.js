import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../contents/commons/formValidator";
import Configuration from "../../commons/configuration/server";

class UpdatePromotion extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: "advanceRequestAmount",
        method: "isEmpty",
        validWhen: false,
        message: "Request amount is required."
      },
      {
        field: "advanceRequestAmount",
        method: "matches",
        args: [/^\$?[0-9]?((\.[0-9]+)|([0-9]+(\.[0-9]+)?))$/g],
        validWhen: true,
        message: "Invalid amount."
      }
    ]);

    this.state = {
      advanceRequestId: "",
      employees: [],
      employeeId: "",
      advanceRequestAmount: "",
      validation: this.validator.valid()
    };

    this.handleChangeFields = this.handleChangeFields.bind(this);
    this.saveAdvanceRequest = this.saveAdvanceRequest.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      employee:nextProps.employee,
      employeeId: nextProps.currentRequest.employeeId,
      advanceRequestAmount: nextProps.currentRequest.advanceRequestAmount,
      advanceRequestId: nextProps.currentRequest.advanceRequestId
    });
  }

  handleChangeFields = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  employeeChange=e=>{
    this.setState({
      employeeId:e.target.value
    })
  }

  saveAdvanceRequest = async e => {
    e.preventDefault();
    await this.setState({
      validation: this.validator.validate(this.state)
    });
    var data = {};
    data.employeeId = this.state.employeeId;
    data.advanceRequestAmount = this.state.advanceRequestAmount;
    data.advanceRequestId = this.state.advanceRequestId;

    if (this.state.validation.isValid) {
      axios
        .put(
          `${Configuration.domain}/hrm/updateAdvanceRequest/${
            this.state.advanceRequestId
          }`,
          data
        )
        .then(response => {
          if (response.status === 200) {
            toast.success("Success Updated !");
            this.props.handleUpdates(data);
          } else {
            toast.error("Error !");
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  };

  render() {
    let { validation } = this.state;

    return (
      <Modal
        show={this.props.open}
        onHide={this.props.closeModal}
        aria-labelledby="ModalHeader"
        className="updateForm"
      >
        <Modal.Header closeButton className="updateForm">
          <Modal.Title id="ModalHeader" className="updateForm">
            Update Promotion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form ref={el => (this.promotionForm = el)} className="updateForm">
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label
                    htmlFor="employeeId"
                    className="col-form-label updateForm"
                  >
                    Employee ID
                  </label>
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
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label
                    htmlFor="advanceRequestAmount"
                    className="col-form-label updateForm"
                  >
                    Request Amount
                  </label>
                  <input
                    className="form-control updateForm"
                    type="text"
                    value={this.state.advanceRequestAmount}
                    name="advanceRequestAmount"
                    id="advanceRequestAmount"
                    placeholder="eg: 123"
                    onChange={this.handleChangeFields}
                  />
                  <span className="help-block updateForm">
                    {validation.advanceRequestAmount.message}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="updateForm">
          <Modal.Dismiss className="updateForm btn btn-primary btn-sm">
            Cancel
          </Modal.Dismiss>
          <button
            className="updateForm btn btn-warning btn-sm"
            onClick={this.saveAdvanceRequest}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UpdatePromotion;
