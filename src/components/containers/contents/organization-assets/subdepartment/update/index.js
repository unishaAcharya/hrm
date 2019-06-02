import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";

export default class SubDepartmentUpdate extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "subDepartmentName",
        method: "isEmpty",
        validWhen: false,
        message: "subDepartmentName is required."
      },
      {
        field: "departmentId",
        method: "isEmpty",
        validWhen: false,
        message: "departmentId is required."
      }
    ]);
    this.state = {
      branchId:"",
      department:[],
      id: "",
      data: "",
      close: "",
      validationfield: false,
      validation: this.validator.valid()
    };
  }
  onChangeText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      branch:nextProps.branch,
      subDepartmentId: nextProps.data.subDepartmentId,
      subDepartmentName: nextProps.data.subDepartmentName,
      departmentId: nextProps.data.departmentId,
      subDepartmentAddress: nextProps.data.subDepartmentAddress
    });
  }
  branchChange=e=>{
    this.setState({
      branchId:e.target.value
    })
    Axios.get(`${Configuration.domain}/hrm/getAllDepartmentIdAndNameOnly2/${e.target.value}`)
    .then(function(response) {
      if(response.data.t.length <= 0){
        this.setState({
          department:response.data.t,
          departmentId:""
        })
      }else{
       this.setState({
         department:response.data.t,
         departmentId:response.data.t[0].departmentId
       })
     }
      }.bind(this))
    .catch(function(response) {
       console.log(response);
     });
  }
  departmentChange=e=>{
    this.setState({
      departmentId:e.target.value
    })
  }
  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    var updatedata = {};
    updatedata.subDepartmentId = this.state.subDepartmentId;
    updatedata.subDepartmentName = this.state.subDepartmentName;
    updatedata.departmentId = this.state.departmentId;
    updatedata.subDepartmentAddress = this.state.subDepartmentAddress;

    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateSubDepartment/${
          this.state.subDepartmentId
        }`,
        data: updatedata
      })
        .then(
          function(response) {
            this.setState({
              data: response.data.successfulRequest
            });
            this.props.handleUpdate(updatedata);
          }.bind(this)
        )
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    }
  };
  close() {
    if (!this.state.data) {
      this.setState({
        close: true
      });
    }
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
            Sub Department Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate} className="updateForm">
          <div className="updateForm form-group ">
            <label
              htmlFor="input_departmentId"
              className="updateForm col-form-label"
            >
              Branch
            </label>
            <select
              id="input_departmentId"
              className="form-control updateForm"
              onChange={e => this.branchChange(e)}
              name="departmentId"
              value={this.state.branchId}
            >
            { this.state.branch && this.state.branch.map(branch=>(
              <option   className="form-control updateForm" value={branch.branchId} key={branch.branchId}>
                {branch.branchName}
                </option>
            )) }

            </select>

          </div>
          <div className="updateForm form-group ">
            <label
              htmlFor="input_departmentId"
              className="updateForm col-form-label"
            >
              Department
            </label>
            <select
              id="input_departmentId"
              className="form-control updateForm"
              onChange={e => this.departmentChange(e)}
              name="departmentId"
              value={this.state.departmentId}
            >
            <option   className="form-control updateForm" value="" >
                {this.state.departmentId}
            </option>
            {this.state.department && this.state.department.map(department=>(
              <option   className="form-control updateForm" value={department.departmentId} key={department.departmentId}>
                  {department.departmentName}
              </option>
            ))}
            </select>

          </div>
              <div className="updateForm form-group">
                <label
                  htmlFor="input_subDepartmentName"
                  className="updateForm col-form-label"
                >
                  Sub Department Name
                </label>
                <input
                  name="subDepartmentName"
                  id="subDepartmentName"
                  value={this.state.subDepartmentName}
                  onChange={this.onChangeText}
                  type="text"
                  className="updateForm form-control"
                  placeholder="rankName"
                />
                <span className="updateForm help-block">
                  {validation.subDepartmentName.message}
                </span>
              </div>

              <div className="updateForm form-group ">
                <label
                  htmlFor="input_subDepartmentAddress"
                  className="col-form-label"
                >
                  sub Department Address
                </label>
                <input
                  name="subDepartmentAddress"
                  id="subDepartmentAddress"
                  value={this.state.subDepartmentAddress}
                  onChange={this.onChangeText}
                  type="text"
                  className="updateForm form-control"
                  placeholder="sub Department Address"
                />
              </div>

            <input
              type="submit"
              className="updateForm btn btn-primary btn-block"
              value="Save Changes"
              onClick={() => (!this.state.data ? this.props.closeModal : "")}
            />
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
