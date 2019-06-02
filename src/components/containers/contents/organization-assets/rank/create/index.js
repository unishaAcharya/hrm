import React, { Component } from "react";
import FormValidator from "../../../commons/formValidator";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default class RankForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "rank",
        method: "isEmpty",
        validWhen: false,
        message: "Rank is required."
      },
      {
        field: "rank",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
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
      rank:"",
      branch:[],
      branchName:"",
      salaryRange: "",
      department:[],
      subdepartment:[],
      departmentId: "",
      subDepartmentId: "",
      validation: this.validator.valid()
    };
    this.submitted = false;
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
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
  branchChange = e => {
    this.setState({
      branchName: e.target.value
    });
    Axios.get(`${Configuration.domain}/hrm/getAllDepartmentIdAndNameOnly2/${e.target.value}`)
    .then(function(response) {
       this.setState({
         department:response.data.t
       })
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
  }
  handleFormSubmit = async event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);

    await this.setState({ validation });
    this.submitted = true;

    var updatedata = {};
    updatedata.rankName = this.state.rank;
    updatedata.departmentId = this.state.departmentId;
    updatedata.subDepartmentId = this.state.subDepartmentId;
    updatedata.salaryRange = this.state.salaryRange;
    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/registerRank`,
        data: updatedata
      })
        .then(function(response) {
          if (response.status === 201) {
            toast.success("Success Notification !");
            this.setState({
              rank:"",
              branchName:"",
              salaryRange: "",
              departmentId: "",
              subDepartmentId: "",
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
                <label>Department Name</label>
                <div className="controls">
                  <select
                    className="form-control"
                    onChange={e => this.departmentChange(e)}
                    name="departmentId"
                    value={this.state.departmentId}
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
             <div className="form-group">
                <label> Sub Department Name </label>
                <div className="controls">
                  <select
                    id="input_subDepartmentId"
                    className="form-control"
                    onChange={e => this.subDepartmentChange(e)}
                    name="subDepartmentId"
                    value={this.state.subDepartmentId}
                  >
                  { this.state.subdepartment.length === 0 && <option value="0dcaa48d-df58-41a8-809c-fec15651264d">
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
                <div className="form-group">
                  <label>Rank Name</label>
                  <div className="controls">
                    <input
                      className="form-control"
                      onChange={e => this.handleFieldChange(e)}
                      name="rank"
                      value={this.state.rank}
                      placeholder="Rank Name"
                    />
                  </div>
                  <span className="help-block">
                    {validation.rank.message}
                  </span>
                </div>
                <div className="form-group">
                  <label>Salary Range</label>
                  <div className="controls">
                    <input
                      name="salaryRange"
                      id="salaryRange"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="Salary Range"
                      value={this.state.salaryRange}
                    />
                  </div>
                  <span className="help-block">
                    {validation.salaryRange.message}
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
