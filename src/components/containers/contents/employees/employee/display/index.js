import React, { Component } from "react";
import ReactTable from "react-table";
import withFixedColumns from "react-table-hoc-fixed-columns";
import axios from "axios";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Configuration from "../../../commons/configuration/server";
import Axios from "axios";
import Preview from "./preview";
import UpdateEmployee from "../update";
import "react-table/react-table.css";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: [],
      privewData: {},
      privew: {},
      open: false,
      openPreviewModal: false,
      branch:[],
      branchId:"",
      department:[],
      departmentId:"",
      subdepartment:[],
      subDepartmentId:"",
      rank:[],
      rankId:""


    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ employeeData: nextProps.posts });
  }
  componentWillMount() {
    this.setState({ employeeData: this.props.posts });
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

  add = data => {
    this.setState({
      privewData: data,
      open: true
    });
  };

  privew = data => {
    this.setState({
      privew: data,
      openPreviewModal: true
    });
  };

  hidePreviewModal = () => this.setState({ openPreviewModal: false });

  handleUpdate(update_employee) {
    let data = this.state.employeeData.filter(update => {
      if (update.employeeId === update_employee.employeeId) {
        update.bloodGroup = update_employee.bloodGroup;
        update.branchId = update_employee.branchId;
        update.contractPeriod = update_employee.contractPeriod;
        update.createdAt = update_employee.createdAt;
        update.deleteFlag = update_employee.deleteFlag;
        update.departmentId = update_employee.departmentId;
        update.dob = update_employee.dob;
        update.empGroup = update_employee.empGroup;
        update.endDate = update_employee.endDate;
        update.firstName = update_employee.firstName;
        update.gender = update_employee.gender;
        update.incomeTaxStatus = update_employee.incomeTaxStatus;
        update.lastName = update_employee.lastName;
        update.middleName = update_employee.middleName;
        update.nationalId = update_employee.nationalId;
        update.nationality = update_employee.nationality;
        update.paymentMode = update_employee.paymentMode;
        update.rankId = update_employee.rankId;
        update.reportsTo = update_employee.reportsTo;
        update.serviceType = update_employee.serviceType;
        update.startDate = update_employee.startDate;
        update.updatedAt = update_employee.updatedAt;
        update.validGender = update_employee.validGender;
        update.workshiftId = update_employee.workshiftId;
      }
      return update;
    });

    this.setState({
      employeeData: data,
      open: false
    });
  }

  handleDelete = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this row",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(name => {
      if (!name) throw null;
      return axios
        .delete(`${Configuration.domain}/hrm/deleteEmployee/${id}`)
        .then(async res => {
          if (res.status == 200) {
            let delet = this.state.employeeData.filter(posts => {
              if (id !== posts.employeeId) {
                return posts;
              }
            });
            await this.setState({
              employeeData: delet
            });
            this.props.removeEmployee(delet);
            toast.success("Delete Successfully!");
          } else {
            toast.error("Error Notification !");
          }
        })
        .catch(err => {});
    });
  };
  render() {
    let closeModal = () => this.setState({ open: false });
    let saveAndClose = () => {
      this.setState({ open: false });
    };
    const columns = [
      {
        Header: "S.N.",
        fixed: "left",
        filterable: false,
        Cell: row => row.index + 1
      },
      {
        Header: "First Name",
        accessor: "firstName",
        fixed: "left"
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        fixed: "left"
      },
      {
        Header: "Date of Birth",
        accessor: "dob"
      },
      {
        Header: "Nationality",
        accessor: "nationality"
      },
      {
        Header: "Blood Group",
        accessor: "bloodGroup" // Custom value accessors!
      },
      {
        Header: "Contract Period",
        accessor: "contractPeriod" // Custom value accessors!
      },
      {
        Header: "Department Id",
        accessor: "departmentId" // Custom value accessors!
      },
      {
        Header: "Gender",
        accessor: "gender" // Custom value accessors!
      },
      {
        Header: "Payment Mode",
        accessor: "paymentMode" // Custom value accessors!
      },
      {
        Header: "Reports To",
        accessor: "reportsTo" // Custom value accessors!
      },
      {
        Header: "Service Type",
        accessor: "serviceType" // Custom value accessors!
      },
      {
        Header: "Start Date",
        accessor: "startDate" // Custom value accessors!
      },
      {
        Header: "Action", // Custom header components!
        accessor: "action",
        width: 75,
        sortable: false,
        fixed: "right",
        Cell: post => {
          return (
            <div className="text-center">
              <button
                className="btn btn-danger"
                data-placement="top"
                title="Delete"
                onClick={() => this.handleDelete(post.original.employeeId)}
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
                className="btn btn-info"
                data-placement="top"
                title="edit"
                onClick={() => this.add(post.original)}
              >
                <span className="mdi mdi-table-edit" />
              </button>
              <button
                className="btn btn-success"
                data-placement="top"
                title="view"
                onClick={() => this.privew(post.original)}
              >
                <span className="mdi mdi-eye" />
              </button>
              <ToastContainer />
            </div>
          );
        },
        width: 200
      }
    ];

    let editTable = "";
    if (this.state.privewData) {
      editTable = (
        <UpdateEmployee
          privewData={this.state.privewData}
          handleUpdates={this.handleUpdate}
          closeModal={closeModal}
          open={this.state.open}
          saveAndClose={saveAndClose}
          branch={this.state.branch}
          branchchange={this.branchchange}
          department={this.state.department}
          departmentchange={this.departmentchange}
          subdepartment={this.state.subdepartment}
          subChange={this.subChange}
          rank={this.state.rank}
          rankChange={this.rankChange}
        />
      );
    }

    return (
      <div className="box-body">
        <ReactTableFixedColumns
          data={this.state.employeeData}
          columns={columns}
          striped={true}
          pageSizeOptions={[5, 15, 20, 25]}
          defaultPageSize={5}
          className="table -striped -highlight"
        />
        {editTable}
        <Preview
          privewData={this.state.privew}
          open={this.state.openPreviewModal}
          hidePreviewModal={this.hidePreviewModal}
        />
      </div>
    );
  }
}

export default App;
