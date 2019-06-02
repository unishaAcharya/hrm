import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";

export default class UpdateView extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: "salaryRange",
        method: "isEmpty",
        validWhen: false,
        message: "Salary Range is required."
      },
      {
        field: "salaryRange",
        method: "matches",
        args:[/(^[0-9]*$)/],
        validWhen: true,
        message: "Numbers are required."
      }
    ]);
    this.state = {
      id: "",
      department:[],
      subdepartment:[],
      rank:[],
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
      rankId: nextProps.data.rankId,
      rankName: nextProps.data.rankName,
      departmentId: nextProps.data.departmentId,
      subDepartmentId: nextProps.data.subDepartmentId,
      salaryRange: nextProps.data.salaryRange
    });
  }
  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    var updatedata = {};
    updatedata.rankId = this.state.rankId;
    updatedata.rankName = this.state.rankName;
    updatedata.departmentId = this.state.departmentId;
    updatedata.subDepartmentId = this.state.subDepartmentId;
    updatedata.salaryRange = this.state.salaryRange;

    var that = this;
    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateRank/${this.state.rankId}`,
        data: updatedata
      })
        .then(function(response) {
          that.props.handleUpdate(updatedata);
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    }
  };
  branchChange = e => {
    this.setState({
      branchName: e.target.value
    });
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
  };
  departmentChange = e => {
    this.setState({
      departmentId: e.target.value
    });
    Axios.get(`${Configuration.domain}/hrm/getAllSubDepartmentIdAndNameOnly2/${e.target.value}`)
    .then(function(response) {
      if(response.data.t.length <= 0){
        this.setState({
          subdepartment:response.data.t,
          subDepartmentId:""
        })
      }else{
        this.setState({
          subdepartment:response.data.t,
          subDepartmentId:response.data.t[0].subDepartmentId
        })
     }
      }.bind(this))
    .catch(function(response) {
      console.log(response);
    });
  };
  subDepartmentChange=e=>{
    this.setState({
      subDepartmentId:e.target.value
    })
    Axios.get(`${Configuration.domain}/hrm/getAllRankIdAndNameOnly3/${e.target.value}`)
  .then(function(response) {
    if(response.data.t.length <= 0){
      this.setState({
        rank:response.data.t,
        rankId:""
      })}else{
      this.setState({
          rank:response.data.t,
        rankId:response.data.t[0].rankId
      })}}.bind(this))
  .catch(function(response) {
    console.log(response);
  });
}
  rankChange=e=>{
  this.setState({
    rankName:e.target.value
  })
  }
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
            Rank Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate} className="updateForm">
          <div className="updateForm form-group ">
            <label htmlFor="input_departmentId" className="updateForm col-form-label">
              Branch
            </label>
            <div className="controls updateForm">
              <select
                id="input_departmentId"
                className="form-control updateForm"
                onChange={e => this.branchChange(e)}
                name="departmentId"
                value={this.state.branchId}
              >
                {this.state.branch && this.state.branch.map(branch=>(
                  <option className="form-control updateForm" value={branch.branchId}>
                {branch.branchName}
                </option>
                ))
                }

              </select>
            </div>
          </div>
          <div className="updateForm form-group ">
            <label htmlFor="input_departmentId" className="updateForm col-form-label">
              Department Name
            </label>
            <div className="controls updateForm">
              <select
                id="input_departmentId"
                className="form-control updateForm"
                onChange={e => this.departmentChange(e)}
                name="departmentId"
                value={this.state.departmentId}
              >
              <option className="form-control updateForm" value="">
                  {this.state.departmentId}
                </option>
                {this.state && this.state.department.map(department=>(
                  <option className="updateForm col-form-label"   value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="updateForm form-group ">
            <label
              htmlFor="input_subDepartmentId"
              className="col-form-label"
            >
              Sub Department Id
            </label>
            <div className="controls updateForm">
              <select
                id="input_subDepartmentId"
                className="form-control updateForm"
                onChange={e => this.subDepartmentChange(e)}
                name="subDepartmentId"
                value={this.state.subDepartmentId}
              >
                <option className="form-control updateForm" value="">
                  {this.state.subDepartmentId}
                </option>
                {this.state && this.state.subdepartment.map(subdept=>(
                  <option  className="updateForm col-form-label"  value={subdept.subDepartmentId}>
                    {subdept.subDepartmentName}
                  </option>
                ))}
              </select>
            </div>
          </div>
            <div className="form-group updateForm">
              <label>Rank Name</label>
              <div className="controls updateForm">
                <select
                  className="form-control updateForm"
                  onChange={e => this.rankChange(e)}
                  name="rankName"
                  value={this.state.rankName}
                >
                  <option  className="form-control updateForm" value="">
                    {this.state.rankName}
                  </option>
                  {this.state && this.state.rank.map(rank=>(
                    <option className="updateForm col-form-label"  value={rank.rankId}>
                      {rank.rankName}
                    </option>
                  ))}
                </select>
              </div>
            </div>



              <div className="updateForm form-group ">
                <label htmlFor="input_salaryRange" className="col-form-label">
                  Salary Range
                </label>
                <input
                  name="salaryRange"
                  id="salaryRange"
                  value={this.state.salaryRange}
                  onChange={this.onChangeText}
                  type="text"
                  className="updateForm form-control"
                  placeholder="Salary Range"
                />
                <span className="updateForm help-block">
                  {validation.salaryRange.message}
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
