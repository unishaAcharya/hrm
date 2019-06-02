import React, { Component } from "react";
import FormValidator from "../../../commons/formValidator";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Configuration from "../../../commons/configuration/server";


export default class DepartmentForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "departmentName",
        method: "isEmpty",
        validWhen: false,
        message: "Department Name is required."
      },
      {
        field: "departmentName",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "departmentAddress",
        method: "isEmpty",
        validWhen: false,
        message: "Department Address is required."
      },
      {
        field: "departmentAddress",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
    ]);
    this.state = {
      departmentName: "",
      departmentAddress: "",
      branch: [],
      branchName:"263e9464-a189-4d07-a1ce-cbfa18e51ca5",
      validation: this.validator.valid()
    };
    this.submitted = false;
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onChange = e => {
    this.setState({
      branchName: e.target.value
    });
  };
  componentDidMount(){
      Axios.get(`${Configuration.domain}/hrm/getAllBranchIdAndNameOnly`)
      .then(function(response) {
        this.setState({
            branch:response.data.t
        })
        }.bind(this))
      .catch(function(response) {
        console.log(response);
      });
  }


  handleFormSubmit = async event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);

    await this.setState({ validation });
    this.submitted = true;
    var updatedata = {};

    updatedata.departmentName = this.state.departmentName;
    updatedata.branchId = this.state.branchName;
    updatedata.departmentAddress = this.state.departmentAddress;

    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerDepartment`,
        data: updatedata
      })
        .then(function(response) {
          if (response.status === 201) {
            toast.success("Success Notification !");
            this.setState({
              departmentName: "",
              departmentAddress: "",
              branchId: "2afce712-8e81-41e6-bfb3-86550a7a724d"
            });
          } else {
            toast.success("Error Notification !");
          }
        }.bind(this))
        .catch(function(response) {
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
                <label htmlFor="input_branchId">Branch Name</label>
                <div className="controls">
                  <select
                    id="input_branchId"
                    className="form-control"
                    onChange={e => this.onChange(e)}
                    name="branchName"
                    value={this.state.branchName}
                  >
                  {this.state &&
                    this.state.branch.map(branch=>(
                    <option value={branch.branchId} key={branch.branchId}>
                      {branch.branchName}
                    </option>
                  ))}

                  </select>
                </div>
              </div>
                <div className="form-group">
                  <label htmlFor="departmentName"> Department Name</label>
                  <div className="controls">
                    <input
                      name="departmentName"
                      id="departmentName"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="Department Name"
                      value={this.state.departmentName}
                    />
                  </div>
                  <span className="help-block">
                    {validation.departmentName.message}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="departmentAddress">Department Address</label>
                  <div className="controls">
                    <input
                      name="departmentAddress"
                      id="departmentAddress"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="Department Address"
                      value={this.state.departmentAddress}
                    />
                  </div>
                  <span className="help-block">
                    {validation.departmentAddress.message}
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
