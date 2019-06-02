import React, { Component } from "react";

export default class sEmployeeForm extends Component{

  render(){
    //console.log(this.props.subDepartmentId);
    let props = this.props
    return(
      <div className="box-body">
          <div className="row">
            <div className="col">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <div className="controls">
                        <input
                          name="firstName"
                          id="firstName"
                          onChange={props.change}
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          value={props.myvalue.firstName}
                        />
                        <span className="help-block">
                          {props.validation.firstName.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Middle Name</label>
                      <div className="controls">
                        <input
                          name="middleName"
                          id="middleName"
                          onChange={props.change}
                          type="text"
                          className="form-control"
                          placeholder="Middle Name"
                          value={props.myvalue.middleName}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <div className="controls">
                        <input
                          name="lastName"
                          id="lastName"
                          onChange={props.change}
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          value={props.myvalue.lastName}
                        />
                        <span className="help-block">
                          {props.validation.lastName.message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Gender</label>
                      <div className="controls">
                        <label className="custom-control custom-radio">
                          <input
                            type="radio"
                            value="Male"
                            className="custom-control-input"
                            value="male"
                            checked={props.myvalue.gender === "male"}
                            onChange={props.handleOptionChange}
                          />{" "}
                          <span className="custom-control-indicator" />{" "}
                          <span className="custom-control-description">Male</span>{" "}
                        </label>

                        <label className="custom-control custom-radio">
                          <input
                            type="radio"
                            value="female"
                            className="custom-control-input"
                            checked={props.myvalue.gender === "female"}
                            onChange={props.handleOptionChange}
                          />{" "}
                          <span className="custom-control-indicator" />{" "}
                          <span className="custom-control-description">Female</span>{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Blood Group</label>
                      <div className="controls">
                        <select
                          type="select"
                          id="input_bloodGroup"
                          name="bloodGroup"
                          className="form-control"
                          onChange={e => props.change(e)}
                          value={props.myvalue.bloodGroup}
                        >
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="A">A</option>
                          <option value="AB">AB</option>
                          <option value="B+">B+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>National Identity</label>
                      <div className="controls">
                        <input
                          name="nationalId"
                          id="national_id"
                          value={props.myvalue.nationalId}
                          onChange={e => props.change(e)}
                          type="text"
                          className="form-control"
                          placeholder="National Id"
                        />
                        <span className="help-block">
                          {props.validation.nationalId.message}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Nationality</label>
                    <div className="controls">
                      <select
                        id="input_nationality"
                        className="form-control"
                        onChange={e => props.change(e)}
                        name="nationality"
                        value={props.myvalue.nationality}
                      >
                        <option value="Nepali">Nepali</option>
                        <option value="Indian">Indian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="American">American</option>
                        <option value="Australian">Australian</option>
                        <option value="Korean">Korean</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Date Of Birth</label>
                    <div className="controls">
                      <input
                        name="dob"
                        type="date"
                        onChange={e => props.change(e)}
                        className="form-control"
                        id="date"
                        value={props.myvalue.dob}
                      />
                      <span className="help-block">
                        {props.validation.dob.message}
                      </span>
                    </div>
                  </div>
                </div>

                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Started Date</label>
                    <div className="controls">
                      <input
                        name="startDate"
                        type="date"
                        onChange={e => props.change(e)}
                        className="form-control"
                        id="date"
                        value={props.myvalue.startDate}
                      />
                      <span className="help-block">
                        {props.validation.startDate.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Ended Date</label>
                    <div className="controls">
                      <input
                        name="endDate"
                        type="date"
                        onChange={e => props.change(e)}
                        className="form-control"
                        id="date"
                        value={props.myvalue.endDate}
                      />
                      <span className="help-block">
                        {props.validation.endDate.message}
                      </span>
                    </div>
                  </div>
                </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Employee Group</label>
                      <div className="controls">
                        <select
                          id="input_empGroup"
                          className="form-control"
                          name="empGroup"
                          onChange={e => props.change(e)}
                          value={props.myvalue.empGroup}
                        >
                          <option value="Management">Management</option>
                          <option value="Non Management">Non Management</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Service Type</label>
                      <div className="controls">
                        <select
                          id="input_serviceType"
                          className="form-control"
                          onChange={e => props.change(e)}
                          name="serviceType"
                          value={props.myvalue.serviceType}
                        >
                          <option value="Part Time">Part Time</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Branch </label>
                    <div className="controls">
                      <select
                        name="branchId"
                        id="branchId"
                        onChange={e => props.branchchange(e)}
                        type="text"
                        className="form-control"
                        placeholder="Branch Id"
                        value={props.myvalue.branchId}
                      >
                      {props &&
                        props.branch.map(branch=>(
                        <option value={branch.branchId} key={branch.branchId}>
                          {branch.branchName}
                        </option>
                      ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Department </label>
                    <div className="controls">
                      <select
                        name="departmentId"
                        id="departmentId"
                        onChange={e => props.departmentchange(e)}
                        type="text"
                        className="form-control"
                        placeholder="Department Id"
                        value={props.myvalue.departmentId}
                      >
                      {props.department.length === 0 && <option value="">
                        Select Department
                      </option>}
                      {props && props.department.map(department=>(
                        <option value={department.departmentId}>
                          {department.departmentName}
                        </option>
                      ))}

                    </select>
                    </div>
                  </div>
                </div>

                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Sub Department</label>
                    <div className="controls">
                    <select
                      id="input_subDepartmentId"
                      className="form-control"
                      onChange={e=> props.subDepartChange(e)}
                      name="subDepart"
                      value={props.myvalue.subDepart}
                    >
                    { props.subdepartment.length === 0 && <option value="0dcaa48d-df58-41a8-809c-fec15651264d">
                      No Sub Department
                      </option>}
                      {props && props.subdepartment.map(subdept=>(
                        <option value={subdept.subDepartmentId}>
                          {subdept.subDepartmentName}
                        </option>
                      ))}
                    </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Rank </label>
                    <div className="controls">
                      <select
                        name="rankId"
                        id="rankId"
                        onChange={e => props.rankChange(e)}
                        type="text"
                        className="form-control"
                        placeholder="Rank Id"
                        value={props.myvalue.rankId}
                      >
                     {props.rank.length === 0 && <option value="0dcaa48d-df58-41a8-809c-fec15651264d">
                        No Rank
                        </option>}
                        {props && props.rank.map(rank=>(
                          <option value={rank.rankId}>
                            {rank.rankName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Report To</label>
                      <div className="controls">
                        <select
                          id="input_report_to"
                          onChange={e => props.change(e)}
                          name="reportsTo"
                          className="form-control"
                          value={props.myvalue.reportsTo}
                        >
                          <option value="Hrm Department">Hrm Department</option>
                          <option value="Marketing  Department">
                            Marketing Department
                          </option>
                          <option value="Finance Department">
                            Finance Department
                          </option>
                          <option value="Research Department">
                            Research Department
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Income Tax Status</label>
                      <div className="controls">
                        <input
                          name="incomeTaxStatus"
                          id="incomeTaxStatus"
                          onChange={e => props.change(e)}
                          type="text"
                          className="form-control"
                          placeholder="Income Tax Status"
                          value={props.myvalue.incomeTaxStatus}
                        />
                        <span className="help-block">
                          {props.validation.incomeTaxStatus.message}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Payment Mode</label>
                    <div className="controls">
                      <input
                        name="paymentMode"
                        id="paymentMode"
                        value={props.myvalue.paymentMode}
                        onChange={e => props.change(e)}
                        type="text"
                        className="form-control"
                        placeholder="Payment Mode"
                      />
                      <span className="help-block">
                        {props.validation.paymentMode.message}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Contract Period</label>
                    <div className="controls">
                      <input
                        name="contractPeriod"
                        id="contractPeriod"
                        onChange={e => props.change(e)}
                        type="text"
                        className="form-control"
                        placeholder="Contract Period"
                        value={props.myvalue.contractPeriod}
                      />
                      <span className="help-block">
                        {props.validation.contractPeriod.message}
                      </span>
                    </div>
                  </div>
                </div>
                </div>

              </form>
            </div>
          </div>
        </div>
    )
  }
}
