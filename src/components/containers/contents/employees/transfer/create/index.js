import React, { Component } from "react";
import Validator from "../../../commons/formValidator";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

class TransferMain extends Component {
  constructor(props) {
    super(props);
    this.validator = new Validator([
      {
        field: "effectiveDate",
        method: "isEmpty",
        validWhen: false,
        message: "effectiveDate  is required."
      }
    ]);

    this.state = {
      employee:[],
      employeeId: "",
      effectiveDate: "",
      branch:[],
      branchName: "",
      department:[],
      departmentId: "",
      rankId: "",
      comment: "",
      subdepartment:[],
      subDepartmentId:"",
      rank:[],
      validation: this.validator.valid()
    };
  }
      componentWillMount(){
        Axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
        .then(function(response) {
            Axios.get(`${Configuration.domain}/hrm/getAllBranchIdAndNameOnly`)
          .then(function(res) {
            this.setState({
              employee:response.data.t,
              branch:res.data.t
            })
          }.bind(this))


          .catch(function(response) {
             console.log(response);
           });
          }.bind(this))
        .catch(function(response) {
           console.log(response);
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
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    await this.setState({ validation });
    var updatedata = {};
    updatedata.employeeId = this.state.employeeId;
    updatedata.effectiveDate = this.state.effectiveDate;
    updatedata.branchId = this.state.branchName;
    updatedata.departmentId = this.state.departmentId;
    updatedata.subDepartmentId = this.state.subDepartmentId;
    updatedata.rankId = this.state.rankId;
    updatedata.comment = this.state.comment;

    var that = this;
    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerTransfer`,
        data: updatedata
      })
        .then(function(response) {
          if (response.status === 201) {
            toast.success("Success Notification!");
            that.setState({
              employee:this.state.employee,
              employeeId: "",
              effectiveDate: "",
              branch:this.state.branch,
              branchName: "",
              department:[],
              departmentId: "",
              rankId: "",
              comment: "",
              subdepartment:[],
              subDepartmentId:"",
              rank:[],
            });
          } else {
            toast.error("Error Notification !");
          }
        }.bind(this))

        .catch(function(err) {
          console.log(err);

        });
    }
  };

  render() {
    let validation = this.state.validation;
    return (
      <div className="box-body">
        <form autoComplete="off">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="employeeId">Employee Id</label>
                <select
                  className="form-control"
                  onChange={e => this.employeeChange(e)}
                  name="employeeId"
                  value={this.state.employeeId}
                >
                <option value="">
                Select Employee Name
              </option>
                  {this.state.employee && this.state.employee.map(employee=>(
                    <option value={employee.empId} key={employee.empId}>
                    {employee.fullName}
                  </option>
                  ))
                    }
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="date">Start Date</label>
                <input
                  type="date"
                  placeholder="Start Date"
                  className="form-control"
                  onChange={e => this.handleFieldChange(e)}
                  name="effectiveDate"
                  value={this.state.effectiveDate}
                />
                <span className="help-block">
                  {validation.effectiveDate.message}
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="branchId">Branch Id</label>
                <select
                  className="form-control"
                  onChange={e => this.branchChange(e)}
                  name="branchName"
                  value={this.state.branchName}
                >
                <option value="">
                Select Branch
              </option>
                {this.state &&
                  this.state.branch.map(branch=>(
                  <option value={branch.branchId} key={branch.branchId}>
                    {branch.branchName}
                  </option>
                ))}
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="departmentId">Department Id</label>
                <select
                  className="form-control"
                  name="departmentId"
                  value={this.state.departmentId}
                  onChange={e => this.departmentChange(e)}
                >
                {this.state.department.length === 0 && <option value="">
                  Select Department
                </option>}
                {this.state && this.state.department.map(department=>(
                  <option value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
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
               { this.state.subdepartment.length === 0 && <option value="">
                 No Sub Department
                 </option>}
                 {this.state && this.state.subdepartment.map(subdept=>(
                   <option value={subdept.subDepartmentId}>
                     {subdept.subDepartmentName}
                   </option>
                 ))}
               </select>
             </div>
           </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="rankId">Rank Id</label>
                <select
                  className="form-control"
                  name="rankId"
                  value={this.state.rankId}
                  onChange={e => this.handleFieldChange(e)}
                >
                { this.state.rank.length === 0 && <option value="">
                  No Sub Department
                  </option>}
                  {this.state && this.state.rank.map(rank=>(
                    <option value={rank.rankId}>
                      {rank.rankName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
          <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <textarea
                type="textarea"
                placeholder="Comment"
                className="form-control"
                name="comment"
                value={this.state.comment}
                onChange={e => this.handleFieldChange(e)}
              />
            </div>
          </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            onClick={this.handleFormSubmit}
          >
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    );
  }
}

export default TransferMain;
