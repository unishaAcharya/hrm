import React, { Component } from "react";
import Axios from "axios";
import FormValidator from "../../../commons/formValidator";
import Modal from "react-bootstrap-modal";
import Configuration from "../../../commons/configuration/server";

class EmployeeUpdate extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: "firstName",
        method: "isEmpty",
        validWhen: false,
        message: "First Name is required."
      },
      {
        field: "lastName",
        method: "isEmpty",
        validWhen: false,
        message: "Last Name is required."
      },
      {
        field: "middleName",
        method: "isEmpty",
        validWhen: false,
        message: "Middle Name is required."
      },
      {
        field: "gender",
        method: "isEmpty",
        validWhen: false,
        message: "gender is required."
      },
      {
        field: "contractPeriod",
        method: "isEmpty",
        validWhen: false,
        message: "contractPeriod is required."
      },
      {
        field: "dob",
        method: "isEmpty",
        validWhen: false,
        message: "dob is required."
      },
      {
        field: "empGroup",
        method: "isEmpty",
        validWhen: false,
        message: "empGroup is required."
      },
      {
        field: "bloodGroup",
        method: "isEmpty",
        validWhen: false,
        message: "bloodGroup is required."
      },
      {
        field: "nationalId",
        method: "isEmpty",
        validWhen: false,
        message: "nationalId is required."
      },
      {
        field: "startDate",
        method: "isEmpty",
        validWhen: false,
        message: "startDate is required."
      },

      {
        field: "endDate",
        method: "isEmpty",
        validWhen: false,
        message: "endDate is required."
      },
      {
        field: "incomeTaxStatus",
        method: "isEmpty",
        validWhen: false,
        message: "incomeTaxStatus is required."
      },
      {
        field: "reportsTo",
        method: "isEmpty",
        validWhen: false,
        message: "reportsTo is required."
      },
      {
        field: "serviceType",
        method: "isEmpty",
        validWhen: false,
        message: "serviceType is required."
      },

      {
        field: "nationality",
        method: "isEmpty",
        validWhen: false,
        message: "nationality is required."
      },
      {
        field: "paymentMode",
        method: "isEmpty",
        validWhen: false,
        message: "paymentMode is required."
      }
    ]);

    this.state = {
      id: "",
      validationfield: false,
      branch:[],
      branchId:"",
      department:[],
      departmentId:"",
      subdepartment:[],
      subDepartmentId:"",
      rank:[],
      rankId:"",
      validation: this.validator.valid()
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      branch:nextProps.branch,
      department:nextProps.department,
      subdepartment:nextProps.subdepartment,
      rank:nextProps.rank,
      branchId: nextProps.privewData.branchId,
      bloodGroup: nextProps.privewData.bloodGroup,
      contractPeriod: nextProps.privewData.contractPeriod,
      deleteFlag: nextProps.privewData.deleteFlag,
      departmentId: nextProps.privewData.departmentId,
      subDepartmentIdId: nextProps.privewData.subDepartmentId,
      dob:  nextProps.privewData.dob,
      empGroup: nextProps.privewData.empGroup,
      employeeId: nextProps.privewData.employeeId,
      endDate: nextProps.privewData.endDate,
      firstName: nextProps.privewData.firstName,
      gender: nextProps.privewData.gender,
      incomeTaxStatus: nextProps.privewData.incomeTaxStatus,
      lastName: nextProps.privewData.lastName,
      middleName: nextProps.privewData.middleName,
      nationalId: nextProps.privewData.nationalId,
      nationality: nextProps.privewData.nationalId,
      paymentMode: nextProps.privewData.paymentMode,
      rankId: nextProps.privewData.rankId,
      reportsTo: nextProps.privewData.reportsTo,
      serviceType: nextProps.privewData.serviceType,
      startDate: nextProps.privewData.startDate,
      updatedAt: nextProps.privewData.updatedAt,
      validGender: nextProps.privewData.validGender,
      workshiftId: nextProps.privewData.workshiftId
    });
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllBranchIdAndNameOnly`)
    .then(function(response) {
      console.log(response);
      if(response.data.t.length <= 0){
        this.setState({
            branch:response.data.t,
            branchId:""
          })
      }else{
        this.setState({
          branch:response.data.t,
          branchId:response.data.t[0].departmentId
        })

      }}.bind(this))
    .catch(function(response) {
       console.log(response);
     });

  }
  branchchange=e=>{
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

      }}.bind(this))
    .catch(function(response) {
       console.log(response);
     });
    }
  departmentchange=e=>{
        this.setState({
          departmentId:e.target.value
        })
        Axios.get(`${Configuration.domain}/hrm/getAllSubDepartmentIdAndNameOnly2/${e.target.value}`)
        .then(function(response) {
          //console.log(response.data.t[0].subDepartmentId);
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
            //console.log(this.state.subDepartmentId);

         }
        }.bind(this))
        .catch(function(response) {
          console.log(response);
        });
      }
  subChange=e=>{
            this.setState({
            subDepart:e.target.value
          })
          console.log(e.target.value +"new id");
            Axios.get(`${Configuration.domain}/hrm/getAllRankIdAndNameOnly3/${e.target.value}`)
          .then(function(response) {
            console.log(response);
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

  onChangeText = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    var data = {};
    data.employeeId = this.state.employeeId;
    data.bloodGroup = this.state.bloodGroup;
    data.branchId = this.state.branchId;
    data.contractPeriod = this.state.contractPeriod;
    data.createdAt = this.state.createdAt;
    data.deleteFlag = this.state.deleteFlag;
    data.departmentId = this.state.departmentId;
    data.dob = this.state.dob;
    data.empGroup = this.state.empGroup;
    data.endDate = this.state.endDate;
    data.firstName = this.state.firstName;
    data.gender = this.state.gender;
    data.incomeTaxStatus = this.state.incomeTaxStatus;
    data.lastName = this.state.lastName;
    data.middleName = this.state.middleName;
    data.nationalId = this.state.nationalId;
    data.nationality = this.state.nationality;
    data.paymentMode = this.state.paymentMode;
    data.rankId = this.state.rankId;
    data.reportsTo = this.state.reportsTo;
    data.serviceType = this.state.serviceType;
    data.startDate = this.state.startDate;
    data.updatedAt = this.state.updatedAt;
    data.validGender = this.state.validGender;
    data.workshiftId = this.state.workshiftId;

    var that = this;
    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateEmployee/${
          this.state.employeeId
        }`,
        data: data
      })
        .then(function(response) {
          that.props.handleUpdates(data);
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  };

  render() {
    console.log(this.state.branch);
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
            Employee Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <div className="row updateForm">
            <div className="updateForm form-group col-md-4" >
              <label
                htmlFor="input_last_name"
                className="updateForm col-form-label"
              >
                First Name
              </label>
              <input
                name="firstName"
                id="first_name"
                value={this.state.firstName}
                onChange={this.onChangeText}
                type="text"
                className="form-control updateForm"
                placeholder="First Name"
              />
              <span className="help-block updateForm">
                {validation.firstName.message}
              </span>
            </div>
          <div className="updateForm form-group col-md-4" >
              <label
                htmlFor="input_middle_name"
                className="updateForm col-form-label"
              >
                Middle Name
              </label>
              <input
                name="middleName"
                id="middle_name"
                value={this.state.middleName}
                onChange={this.onChangeText}
                type="text"
                className="form-control updateForm"
                placeholder="Middle Name"
              />
              <span className="help-block updateForm">
                {validation.middleName.message}
              </span>
              <div
                id="last_name_feedback"
                className="updateForm invalid-feedback"
              />
            </div>
            <div className="updateForm form-group col-md-4" >
              <label htmlFor="input_last_name" className="col-form-label">
                Last Name
              </label>
              <input
                name="lastName"
                id="last_name"
                value={this.state.lastName}
                onChange={this.onChangeText}
                type="text"
                className="updateForm form-control"
                placeholder="Last Name"
              />
              <span className="updateForm help-block">
                {validation.lastName.message}
              </span>
            </div>
          </div>
        <div className="updateForm row">
        <div className="updateForm form-group col-md-4" >
            <label
              htmlFor="input_gender"
              className="updateForm col-form-label"
            >
              Gender
            </label>
            <input
              name="gender"
              id="gender"
              value={this.state.gender}
              onChange={this.onChangeText}
              type="text"
              className="updateForm form-control"
              placeholder="Blood Group"
            />
            <span className="updateForm help-block">
              {validation.gender.message}
            </span>
          </div>
          <div className="updateForm form-group col-md-4" >
              <label
                htmlFor="input_bloodGroup"
                className="updateForm col-form-label"
              >
                Blood Group
              </label>
              <input
                name="bloodGroup"
                id="bloodGroup"
                value={this.state.bloodGroup}
                onChange={this.onChangeText}
                type="text"
                className="updateForm form-control"
                placeholder="Blood Group"
              />
              <span className="updateForm help-block">
                {validation.bloodGroup.message}
              </span>
            </div>
            <div className="updateForm form-group col-md-4" >
                <label
                  htmlFor="input_nationalId"
                  className="updateForm col-form-label"
                >
                National Identity
                </label>
                <input
                  name="nationalId"
                  id="nationalId"
                  value={this.state.nationalId}
                  onChange={this.onChangeText}
                  type="text"
                  className="updateForm form-control"
                  placeholder="nationalId"
                />
                <span className="updateForm help-block">
                  {validation.nationalId.message}
                </span>
              </div>
        </div>
        <div className="updateForm row">
          <div className="updateForm form-group col-md-4" >
            <label
              htmlFor="input_nationality"
              className="updateForm col-form-label"
            >
              Nationality
            </label>
            <input
              name="nationality"
              id="nationality"
              value={this.state.nationality}
              onChange={this.onChangeText}
              type="text"
              className="updateForm form-control"
              placeholder="nationality"
            />
            <span className="updateForm help-block">
              {validation.nationality.message}
            </span>
          </div>
          <div className="updateForm form-group col-md-4" >
            <label htmlFor="input_dob" className="updateForm col-form-label">
              Date of Birth
            </label>
            <input
              name="dob"
              id="dob"
              value={this.state.dob}
              onChange={this.onChangeText}
              type="text"
              className="updateForm form-control"
              placeholder="dob"
            />
            <span className="updateForm help-block">
              {validation.dob.message}
            </span>
          </div>
          <div className="updateForm form-group col-md-4" >
            <label htmlFor="input_startDate" className="updateForm col-form-label">
            Started Date
            </label>
            <input
              name="startDate"
              id="startDate"
              value={this.state.startDate}
              onChange={this.onChangeText}
              type="text"
              className="updateForm form-control"
              placeholder="startDate"
            />
            <span className="updateForm help-block">
              {validation.startDate.message}
            </span>
          </div>
        </div>
        <div className="updateForm row">
        <div className="updateForm form-group col-md-4" >
          <label htmlFor="input_endDate" className="updateForm col-form-label">
          End Date
          </label>
          <input
            name="endDate"
            id="endDate"
            value={this.state.endDate}
            onChange={this.onChangeText}
            type="date"
            className="updateForm form-control"
            placeholder="endDate"
          />
          <span className="updateForm help-block">
            {validation.endDate.message}
          </span>
        </div>
        <div className="updateForm form-group col-md-4" >
          <label
            htmlFor="input_bloodGroup"
            className="updateForm col-form-label"
          >
            Employee Group
          </label>
          <input
            name="empGroup"
            id="empGroup"
            value={this.state.empGroup}
            onChange={this.onChangeText}
            type="text"
            className="updateForm form-control"
            placeholder="Employee Group"
          />
          <span className="updateForm help-block">
            {validation.empGroup.message}
          </span>
        </div>
        <div className="updateForm form-group col-md-4" >
          <label
            htmlFor="input_serviceType"
            className="updateForm col-form-label"
          >
            Service Type
          </label>
          <select
            name="serviceType"
            id="serviceType"
            value={this.state.serviceType}
            onChange={this.onChangeText}
            type="text"
            className="updateForm form-control"
            placeholder="Employee Group"
          >
          <option className="updateForm form-control" value={this.state.serviceType}>{this.state.serviceType}</option>
          <option className="updateForm form-control" value="Part Time">Part Time</option>
          <option className="updateForm form-control" value="Full Time">Full Time</option>
          <option className="updateForm form-control" value="Contract">Contract</option>
          </select>
          <span className="updateForm help-block">
            {validation.serviceType.message}
          </span>
        </div>
        </div>
        <div className="updateForm row">
          <div className="updateForm form-group col-md-4" >
          <label>Branch </label>
          <div className="controls">
            <select
              name="branchId"
              id="branchId"
              onChange={e => this.branchchange(e)}
              type="text"
              className="form-control"
              placeholder="Branch Id"
              value={this.state.branchId}
            >
            {this.state.branch &&
              this.state.branch.map(branch=>(
              <option value={branch.branchId} key={branch.branchId}>
                {branch.branchName}
              </option>
            ))}
            </select>
          </div>
          </div>
          <div className="updateForm form-group col-md-4" >
          <label>Department </label>
            <select
              name="departmentId"
              id="departmentId"
              onChange={e => this.departmentchange(e)}
              type="text"
              className="form-control"
              placeholder="Department Id"
              value={this.state.departmentId}
            >
            <option className="updateForm form-control" value={this.state.departmentId}>{this.state.departmentId}</option>
            {this.state.department && this.state.department.map(department=>(
              <option value={department.departmentId}>
                {department.departmentName}
              </option>
            ))}
            </select>
          </div>
          <div className="updateForm form-group col-md-4" >
            <label>Sub Department</label>
            <select
              id="input_subDepartmentId"
              className="form-control"
              onChange={e=> this.subDepartChange(e)}
              name="subDepart"
              value={this.state.subDepartmentId}
            >
              <option className="updateForm form-control" value={this.state.subDepartmentId}>{this.state.subDepartmentId}</option>
              {this.state.subdepartment && this.state.subdepartment.map(subdept=>(
                <option className="updateForm form-control"  value={subdept.subDepartmentId}>
                  {subdept.subDepartmentName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="updateForm row">
          <div className="updateForm form-group col-md-4" >
          <label>Rank </label>
            <select
              name="rankId"
              id="rankId"
              onChange={e => this.rankChange(e)}
              type="text"
              className="form-control"
              placeholder="Rank Id"
              value={this.state.rankId}
            >
            <option className="updateForm form-control" value={this.state.rankId}>{this.state.rankId}</option>
              {this.state.rank && this.state.rank.map(rank=>(
                <option className="updateForm form-control" value={rank.rankId}>
                  {rank.rankName}
                </option>
              ))}
            </select>
          </div>
          <div className="updateForm form-group col-md-4" >
            <label
              htmlFor="input_bloodGroup"
              className="updateForm col-form-label"
            >
              Reports To
            </label>
            <input
              name="reportsTo"
              id="reportsTo"
              value={this.state.reportsTo}
              onChange={this.onChangeText}
              type="text"
              className="updateForm form-control"
              placeholder="Reports To"
            />
            <span className="updateForm help-block">
              {validation.reportsTo.message}
            </span>
          </div>
          <div className="updateForm form-group col-md-4">
          <label htmlFor="input_dob" className="updateForm col-form-label">
            Income Tax Status
          </label>
          <input
            name="incomeTaxStatus"
            id="incomeTaxStatus"
            value={this.state.incomeTaxStatus}
            onChange={this.onChangeText}
            type="text"
            className="updateForm form-control"
            placeholder="incomeTaxStatus"
          />
          <span className="updateForm help-block">
            {validation.incomeTaxStatus.message}
          </span>
          </div>
        </div>
        <div className="updateForm row">
        <div className="updateForm form-group col-md-4" >
          <label htmlFor="input_dob" className="updateForm col-form-label">
            Payment Mode
          </label>
          <input
            name="paymentMode"
            id="paymentMode"
            value={this.state.paymentMode}
            onChange={this.onChangeText}
            type="text"
            className="updateForm form-control"
            placeholder="paymentMode"
          />
          <span className="updateForm help-block">
            {validation.paymentMode.message}
          </span>
        </div>
        <div className="updateForm form-group col-md-4" >
          <label
            htmlFor="input_contractPeriod"
            className="updateForm col-form-label"
          >
            Contract Period
          </label>
          <input
            name="contractPeriod"
            id="contractPeriod"
            value={this.state.contractPeriod}
            onChange={this.onChangeText}
            type="text"
            className="updateForm form-control"
            placeholder="Contract Period"
          />
          <span className="updateForm help-block">
            {validation.contractPeriod.message}
          </span>
        </div>
        </div>
        </Modal.Body>
        <Modal.Footer className="updateForm">
          <Modal.Dismiss className="updateForm btn btn-primary btn-sm">
            Cancel
          </Modal.Dismiss>
          <button
            className="updateForm btn btn-warning btn-sm"
            onClick={this.handleUpdate}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EmployeeUpdate;
