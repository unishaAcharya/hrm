import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";

export default class BranchUpdate extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: "branchName",
        method: "isEmpty",
        validWhen: false,
        message: "Branch Name is required."
      },
      {
        field: "branchName",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Invalid name pattern"
      },
      {
        field: "branchContact",
        method: "isEmpty",
        validWhen: false,
        message: "Branch Contact is required."
      },
      {
        field: "branchEmail",
        method: "isEmpty",
        validWhen: false,
        message: "Branch Email is required."
      },
      {
        field: "branchEmail",
        method: "matches",
        args: [(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)],
        validWhen: true,
        message: "Invalid Email address."
      },
      {
        field: "branchContact",
        method: "matches",
        args: [/([+]?\d{1,3}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/g],
        validWhen: true,
        message: "Invalid phone number"
      },
      {
        field: "branchFaxNo",
        method: "isEmpty",
        validWhen: false,
        message: "Branch Fax No is required."
      },
      {
        field: "branchFaxNo",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Branch Fax No is invalid."
      }
    ]);
    this.state = {
      id: "",
      validationfield: false,
      validation: this.validator.valid()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  onChangeText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      branchId: nextProps.data.branchId,
      branchName: nextProps.data.branchName,
      branchContact: nextProps.data.branchContact,
      branchEmail: nextProps.data.branchEmail,
      branchFaxNo: nextProps.data.branchFaxNo
    });
  }
  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    var updatedata = {};
    updatedata.branchId = this.state.branchId;
    updatedata.branchName = this.state.branchName;
    updatedata.branchContact = this.state.branchContact;
    updatedata.branchEmail = this.state.branchEmail;
    updatedata.branchFaxNo = this.state.branchFaxNo;
    var that = this;
    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateBranch/${this.state.branchId}`,
        data: updatedata
      })
        .then(function(response) {
          that.props.handleUpdate(updatedata);
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  };
  render() {
    let validation =  this.state.validation;
    return (
      <Modal
        show={this.props.open}
        onHide={this.props.closeModal}
        aria-labelledby="ModalHeader"
        className="updateForm"
      >
        <Modal.Header closeButton className="updateForm">
          <Modal.Title id="ModalHeader" className="updateForm">
            Branch
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate} className="updateForm">
            <div className="row updateForm">
              <div
                className="updateForm form-group col-md-6"
              >
                <label
                  htmlFor="input_branchName"
                  className="updateForm col-form-label"
                >
                  Branch Name
                </label>
                <input
                  name="branchName"
                  id="branchName"
                  value={this.state.branchName}
                  onChange={this.onChangeText}
                  type="text"
                  className="updateForm form-control"
                  placeholder="branchName"
                />
                <span className="updateForm help-block">
                  {validation.branchName.message}
                </span>
              </div>
              <div
              className="updateForm form-group col-md-6"              >
                <label
                  htmlFor="input_branchContact"
                  className="updateForm col-form-label"
                >
                  Branch Contact
                </label>
                <input
                  name="branchContact"
                  id="branchContact"
                  value={this.state.branchContact}
                  onChange={this.onChangeText}
                  type="text"
                  className="updateForm form-control"
                  placeholder="Branch Contact"
                />
                <span className="updateForm help-block">
                  {validation.branchContact.message}
                </span>
              </div>

            </div>
            <div className="updateForm row">
            <div
            className="updateForm form-group col-md-6"
            >
              <label
                htmlFor="input_branchEmail"
                className="updateForm col-form-label"
              >
                Branch Email
              </label>
              <input
                name="branchEmail"
                id="branchEmail"
                value={this.state.branchEmail}
                onChange={this.onChangeText}
                type="text"
                className="updateForm form-control"
                placeholder="Branch Email"
              />
              <span className="updateForm help-block">
                {validation.branchEmail.message}
              </span>
            </div>
              <div
              className="updateForm form-group col-md-6"
              >
                <label
                  htmlFor="input_branchFaxNo"
                  className="updateForm col-form-label"
                >
                  Branch Fax No
                </label>
                <input
                  name="branchFaxNo"
                  id="branchFaxNo"
                  value={this.state.branchFaxNo}
                  onChange={this.onChangeText}
                  type="text"
                  className="updateForm form-control"
                  placeholder="Branch Fax No"
                />
                <span className="updateForm help-block">
                  {validation.branchFaxNo.message}
                </span>
              </div>
            </div>

            <input
              type="submit"
              className="updateForm btn btn-primary btn-block"
              value="Save Changes"
            />
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
