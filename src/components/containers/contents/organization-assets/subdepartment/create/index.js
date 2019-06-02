import React, { Component } from "react";
import FormValidator from "../../../commons/formValidator";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default class SubDepartmentForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "subDepartmentName",
        method: "isEmpty",
        validWhen: false,
        message: "Sub Department Name is required."
      },
      {
        field: "subDepartmentName",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Alphabhets are required."
      },
      {
        field: "subDepartmentAddress",
        method: "isEmpty",
        validWhen: false,
        message: "Sub Department Address is required."
      },
      {
        field: "subDepartmentAddress",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Alphabhets are required."
      },
      {
        field: "departmentId",
        method: "isEmpty",
        validWhen: false,
        message: "Department Id is required."
      }
    ]);
    this.state = {
      branch:[],
      subDepartmentName: "",
      subDepartmentAddress: "",
      department:[],
      departmentId: "",
      validation: this.validator.valid()
    };
  }

  componentWillMount(){
    Axios.get(`${Configuration.domain}/hrm/getAllBranchIdAndNameOnly`)
      .then(res => {
        this.setState({
            branch:res.data.t
        })
      }).catch(res=>{
        console.log(res);
      })
      }
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

  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  deptChange=e=>{
    this.setState({
      departmentId:e.target.value
    })
  }
  handleFormSubmit = async event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);

    await this.setState({ validation });

    var updatedata = {};
    updatedata.subDepartmentName = this.state.subDepartmentName;
    updatedata.departmentId = this.state.departmentId;
    updatedata.subDepartmentAddress = this.state.subDepartmentAddress;


    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerSubDepartment`,
        data: updatedata
      })
        .then(function(response) {
          if (response.status === 201) {

            this.setState({
             subDepartmentName: "",
             subDepartmentAddress: "",
             department:[],
             departmentId: "Select Department"
           });
            toast.success("Success Notification !");

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
                <label>Branch Name</label>
                <div className="controls">
                <select
                  id="input_branchId"
                  className="form-control"
                  onChange={e => this.branchChange(e)}
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
                <h5>Department Name</h5>
                <div className="controls">
                  <select
                    id="input_departmentId"
                    className="form-control"
                    onChange={e => this.deptChange(e)}
                    name="departmentId"
                    value={this.state.departmentId}
                  >
                  {this.state.department.length === 0 && <option value="">
                    Select Department
                  </option>}
                  {this.state && this.state.department.map(department=>(
                    <option value={department.departmentId} key={department.departmentId}>
                      {department.departmentName}
                    </option>
                  ))}
                  </select>
                </div>
              </div>
                <div className="form-group">
                  <h5>Sub Department Name</h5>
                  <div className="controls">
                    <input
                      name="subDepartmentName"
                      id="subDepartmentName"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="subDepartmentName"
                      value={this.state.subDepartmentName}
                    />
                  </div>
                  <span className="help-block">
                    {validation.subDepartmentName.message}
                  </span>
                </div>
                <div className="form-group">
                  <h5>Sub Department Address</h5>
                  <div className="controls">
                    <input
                      name="subDepartmentAddress"
                      id="subDepartmentAddress"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="Sub Department Address"
                      value={this.state.subDepartmentAddress}
                    />
                  </div>
                  <span className="help-block">
                    {validation.subDepartmentAddress.message}
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
