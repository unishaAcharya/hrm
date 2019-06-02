import React, { Component } from "react";
import Axios from "axios";
import FormValidator from "../../../commons/formValidator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Configuration from "../../../commons/configuration/server";

export default class BranchForm extends Component {
  constructor(props) {
    super(props);
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
        message: "Alphabhets are required."
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
        message: "Numbers are required."
      }
    ]);
    this.state = {
      branchName: "",
      branchContact: "",
      branchEmail: "",
      branchFaxNo: "",
      validation: this.validator.valid()
    };
    this.submitted = false;
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleFormSubmit = async event => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);

    await this.setState({ validation });
    this.submitted = true;

    var updatedata = {};
    updatedata.branchId = this.state.branchId;
    updatedata.branchName = this.state.branchName;
    updatedata.branchContact = this.state.branchContact;
    updatedata.branchEmail = this.state.branchEmail;
    updatedata.branchFaxNo = this.state.branchFaxNo;

    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerBranch`,
        data: updatedata
      })
        .then(function(response) {
          if (response.status === 201) {
            toast.success("Success Notification !");
             this.setState({
              branchName: "",
              branchContact: "",
              branchEmail: "",
              branchFaxNo: ""
            });
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
  render() {
    let validation = this.state.validation;

    return (
      <div className="box">
        <div className="box-body">
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group">
                  <h5>Bank Name</h5>
                  <div className="controls">
                    <input
                      type="text"
                      name="branchName"
                      onChange={e => this.handleFieldChange(e)}
                      className="form-control"
                      placeholder="Branch Name"
                      value={this.state.branchName}
                    />
                  </div>
                  <span className="help-block">
                    {validation.branchName.message}
                  </span>
                </div>
                <div className="form-group">
                  <h5>Branch Contact</h5>
                  <div className="controls">
                    <input
                      type="text"
                      name="branchContact"
                      onChange={e => this.handleFieldChange(e)}
                      className="form-control"
                      placeholder="Branch Contact"
                      value={this.state.branchContact}
                    />
                  </div>
                  <span className="help-block">
                    {validation.branchContact.message}
                  </span>
                </div>
                <div className="form-group">
                  <h5>Branch Email</h5>
                  <div className="controls">
                    <input
                      name="branchEmail"
                      id="branchEmail"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="Branch Email"
                      value={this.state.branchEmail}
                    />
                  </div>
                  <span className="help-block">
                    {validation.branchEmail.message}
                  </span>
                </div>
                <div className="form-group">
                  <h5>Branch Fax Number</h5>
                  <div className="controls">
                    <input
                      name="branchFaxNo"
                      id="branchFaxNo"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="branchFaxNo"
                      value={this.state.branchFaxNo}
                    />
                  </div>
                  <span className="help-block">
                    {validation.branchFaxNo.message}
                  </span>
                </div>

                <div className="text-xs-right">
                  <button
                    onClick={this.handleFormSubmit}
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
