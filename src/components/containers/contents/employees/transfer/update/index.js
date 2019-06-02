import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";

class TransferUpdate extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "effectiveDate",
        method: "isEmpty",
        validWhen: false,
        message: "effectiveDate Name is required."
      }
    ]);
    this.state = {
      effectiveDate: "",
      transferId: "",
      comment: "",
      subdepartment:[],
      subDepartmentId:"",
      rank:[],
      validation: this.validator.valid()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {

    this.setState({
      employee:nextProps.employee,
      branch:nextProps.branch,
      employeeId: nextProps.data.employeeId,
      effectiveDate: nextProps.data.effectiveDate,
      branchId: nextProps.data.branchId,
      rankId: nextProps.data.rankId,
      departmentId: nextProps.data.departmentId,
      comment: nextProps.data.comment,
      transferId: nextProps.data.transferId
    });
  }
  handleUpdate = async e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);

    await this.setState({ validation });
    this.submitted = true;
    var updatedata = {};
    updatedata.employeeId = this.state.employeeId;
    updatedata.effectiveDate = this.state.effectiveDate;
    updatedata.branchId = this.state.branchId;
    updatedata.rankId = this.state.rankId;
    updatedata.departmentId = this.state.departmentId;
    updatedata.comment = this.state.comment;
    updatedata.transferId = this.state.transferId;
    let transferId = this.state.transferId;
    let that = this;

    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateTransfer/${transferId}`,
        data: updatedata
      })
        .then(function(response) {
          that.props.handleUpdate(updatedata);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  };
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
    rankId:e.target.value
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
            Transfer Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form
            autoComplete="off"
            className="updateForm"
            onSubmit={this.handleUpdate}
          >
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label htmlFor="employee_id" className="updateForm">
                    Employee Id
                  </label>
                  <select
                    className="form-control updateForm"
                    name="employeeId"
                    value={this.state.employeeId}
                    onChange={e => this.employeeChange(e)}
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
                  <label htmlFor="date" className="updateForm">
                    Start Date
                  </label>
                  <input
                    type="date"
                    placeholder="Start Date"
                    className="form-control updateForm"
                    onChange={e => this.handleFieldChange(e)}
                    name="effectiveDate"
                    value={this.state.effectiveDate}
                  />
                  <span className="help-block updateForm">
                    {validation.effectiveDate.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label htmlFor="branch_id" className="updateForm">
                    Branch
                  </label>
                  <select
                    className="form-control updateForm"
                    name="branchId"
                    value={this.state.branchId}
                    onChange={e => this.branchChange(e)}
                  >

                    {this.state.branch && this.state.branch.map(branch=>(
                    <option value={branch.branchId} key={branch.branchId}>
                      {branch.branchName}
                    </option>
                  ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label htmlFor="department_id" className="updateForm">
                    Department Id
                  </label>
                  <select
                    className="form-control updateForm"
                    name="departmentId"
                    value={this.state.departmentId}
                    onChange={e => this.departmentChange(e)}
                  >
                  <option value="">
                    {this.state.departmentId}
                  </option>
                  {this.state.department && this.state.department.map(department=>(
                    <option value={department.departmentId}>
                      {department.departmentName}
                    </option>
                  ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row updateForm">
            <div className="col-md-6">
               <label> Sub Department Name </label>
               <div className="controls">
                 <select
                   id="input_subDepartmentId"
                   className="form-control"
                   onChange={e => this.subDepartmentChange(e)}
                   name="subDepartmentId"
                   value={this.state.subDepartmentId}
                 >
                 <option value="">
                   {this.state.subDepartmentId}
                 </option>
                   {this.state && this.state.subdepartment.map(subdept=>(
                     <option value={subdept.subDepartmentId}>
                       {subdept.subDepartmentName}
                     </option>
                   ))}
                 </select>
               </div>
             </div>
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label htmlFor="rank_id" className="updateForm">
                    Rank Id
                  </label>
                  <select
                    className="form-control updateForm"
                    name="rankId"
                    value={this.state.rankId}
                    onChange={e => this.departmentChange(e)}
                  >
                  <option value="">
                    {this.state.rankId}
                  </option>
                  {this.state.rank && this.state.rank.map(rank=>(
                    <option value={rank.rankId}>
                      {rank.rankName}
                    </option>
                  ))}
                  </select>
                </div>
              </div>

            </div>
            <div className="row">
            <div className="col-md-6 updateForm">
              <div className="form-group updateForm">
                <label className="updateForm" htmlFor="comment">
                  Comment
                </label>
                <textarea
                  type="textarea"
                  placeholder="Comment"
                  className="form-control updateForm"
                  name="comment"
                  value={this.state.comment}
                  onChange={e => this.handleFieldChange(e)}
                />
              </div>
            </div>
            </div>
            <button
              className="updateForm"
              type="submit"
              className="btn btn-primary btn-sm updateForm"
              onClick={this.handleFormSubmit}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default TransferUpdate;
