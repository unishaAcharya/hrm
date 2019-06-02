import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";

export default class DepartmentUpdate extends Component {
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
      validationfield: false,
      validation: this.validator.valid()
    };
  }
  onChangeText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onChange = e => {
    this.setState({
      branchId: e.target.value
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      departmentId: nextProps.data.departmentId,
      branchName:nextProps.branch,
      branchId:nextProps.data.branchId,
      departmentName: nextProps.data.departmentName,
      departmentAddress: nextProps.data.departmentAddress
    });
  }
  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    var data = {};
    data.departmentId = this.state.departmentId;
    data.departmentName = this.state.departmentName;
    data.branchId = this.state.branchId;
    data.departmentAddress = this.state.departmentAddress;
    var that = this;

    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateDepartment/${
          this.state.departmentId
        }`,
        data: data
      })
        .then(function(response) {
          that.props.handleUpdate(data);
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  };
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
            Department Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate} className="updateForm">

              <div
                className="updateForm form-group "
              >
                <label
                  htmlFor="input_departmentName"
                  className="updateForm col-form-label"
                >
                  Department Name
                </label>
                <input
                  name="departmentName"
                  id="departmentName"
                  value={this.state.departmentName}
                  onChange={this.onChangeText}
                  type="text"
                  className="updateForm form-control"
                  placeholder="Department Name"
                />
                <span className="updateForm help-block">
                  {validation.departmentName.message}
                </span>
              </div>
              <div className="form-group updateForm">
                <label htmlFor="input_branchId">Branch Id</label>
                <div className="controls updateForm">
                  <select
                    id="input_branchId"
                    className="form-control updateForm"
                    onChange={e => this.onChange(e)}
                    name="branchId"
                    value={this.state.branchId}
                  >
                  {this.state.branchName &&
                    this.state.branchName.map(branch=>(
                    <option className="updateForm form-group " value={branch.branchId} key={branch.branchId}>
                      {branch.branchName}
                    </option>
                  ))}

                  </select>
                </div>
              </div>
              <div
              className="updateForm form-group "
              >
                <label
                  htmlFor="input_departmentAddress"
                  className="updateForm col-form-label"
                >
                  Department Address
                </label>
                <input
                  name="departmentAddress"
                  id="departmentAddress"
                  value={this.state.departmentAddress}
                  onChange={this.onChangeText}
                  type="text"
                  className="updateForm form-control"
                  placeholder="departmentAddress"
                />
                <span className="updateForm help-block">
                  {validation.departmentAddress.message}
                </span>
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
