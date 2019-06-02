import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import DepartmentView from "../preview/index";
import UpdateDepartment from "../update/index";
import swal from "sweetalert";
import BreadCrumb from "../../../commons/breadcrumb/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import withFixedColumns from "react-table-hoc-fixed-columns";


const ReactTableFixedColumns = withFixedColumns(ReactTable);

export default class DepartmentTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentData: [],
      branch:[],
      previewData: {},
      editview: {},
      open: false,
      openModal: false
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this row",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(name => {
      if (!name) throw null;
      Axios({
        method: "delete",
        url: `${Configuration.domain}/hrm/deleteDepartment/${id}`
      })
        .then(async res => {
          if (res.status === 200) {
            let delet = this.state.departmentData.filter(data => {
              if (id !== data.departmentId) {
                return data;
              }
            });
            await this.setState({
              departmentData: delet
            });
            toast.success("Delete Successfully!");
          } else {
            toast.success("Error Notification !");
          }
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    });
  };
  handleUpdate = update_department => {
    let data = this.state.departmentData.filter(update => {
      if (update.departmentId === update_department.departmentId) {
        update.departmentName = update_department.departmentName;
        update.branchId = update_department.branchId;
        update.departmentAddress = update_department.departmentAddress;
        update.createdAt = update_department.createdAt;
        update.updatedAt = update_department.updatedAt;
        update.deleteFlag = update_department.deleteFlag;
      }
      return update;
    });
    this.setState({
      departmentData: data,
      open: false
    });
    toast.success("Update Successfully!");
  };
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllDepartment`)
      .then(res => {
        this.setState({
            departmentData: res.data,
          })
      })
      .catch(err => {
        console.log(err);
      });
  }
  preview = data => {
    this.setState({
      previewData: data,
      openModal: true
    });
  };
  UpdateView = data => {
    Axios.get(`${Configuration.domain}/hrm/getAllBranchIdAndNameOnly`)
    .then(function(response) {
      this.setState({
          editview: data,
          open: true,
          branch:response.data.t
      })
      }.bind(this))
    .catch(function(response) {
      console.log(response);
    });
  };
  render() {
    const columns = [
      {
        Header: "S.N.",
        fixed: "left",
        filterable: false,
        sortable: false,
        fixed: "left",
        width: 50,
        Cell: row =>row.index + 1
      },
      {
        Header: "Department Name",
        accessor: "departmentName",
        fixed: "left"
      },
      {
        Header: "Branch Id",
        accessor: "branchId",
      },
      {
        Header: "Department Address",
        accessor: "departmentAddress",
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
                onClick={() => {
                  this.handleDelete(post.original.departmentId);
                }}
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
                  className="btn btn-info"
                  data-placement="top"
                  title="edit"
                  onClick={() => this.UpdateView(post.original)}
              >
                <span className="mdi mdi-table-edit" />
              </button>
              <button
                className="btn btn-success"
                data-placement="top"
                title="view"
                onClick={() => this.preview(post.original)}
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
    let closeModal = () => this.setState({ open: false });
    let previewCloseModal = () => this.setState({ openModal: false });
    return (
      <div
        class="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Department"
          root="Home"
          rootUrl="/"
          parent="Organization Asset"
          parentUrl="/organizationdetails"
          child="Department"
        />
        <section class="content">
          <div class="row">
            <div class="col-12">
              <div class="box">
                <div class="box-body">
                  <ReactTableFixedColumns
                    data={this.state.departmentData}
                    columns={columns}
                    striped={true}
                    pageSizeOptions={[5, 15, 20, 25]}
                    defaultPageSize={5}
                    className="table -striped -highlight"
                  />

                  <DepartmentView
                    data={this.state.previewData}
                    open={this.state.openModal}
                    closeModal={previewCloseModal}
                  />
                  <UpdateDepartment
                    branch={this.state.branch}
                    data={this.state.editview}
                    handleUpdate={this.handleUpdate}
                    closeModal={closeModal}
                    open={this.state.open}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
