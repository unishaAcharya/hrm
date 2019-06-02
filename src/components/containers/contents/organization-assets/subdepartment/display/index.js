import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import SubDepartmentView from "../preview/index";
import EditSubDepartment from "../update/index";
import swal from "sweetalert";
import Configuration from "../../../commons/configuration/server";
import BreadCrumb from "../../../commons/breadcrumb/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import withFixedColumns from "react-table-hoc-fixed-columns";


const ReactTableFixedColumns = withFixedColumns(ReactTable);

class SubDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subDepartmentData: [],
      previewData: {},
      editdata: {},
      open: false,
      openModal: false,
      branch:[]
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  preview = data => {
    this.setState({
      previewData: data,
      openModal: true
    });
  };
  editData = data => {
    Axios.get(`${Configuration.domain}/hrm//getAllBranchIdAndNameOnly`)
    .then(function(response) {
      if(response.data.t.length <= 0){
        this.setState({
          editdata: data,
          open: true,
          branch:response.data.t,

        })
      }else{
       this.setState({
         editdata: data,
         open: true,
         branch:response.data.t,
       })
     }
      }.bind(this))
    .catch(function(response) {
       console.log(response);
     });

  };
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllSubDepartment`)
      .then(res => {

        let data = res.data;
        this.setState({
          subDepartmentData: data
        });
      })
      .catch(err => {
        console.log(err);
      });
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
        url: `${Configuration.domain}/hrm/deleteSubDepartment/${id}`

      })
        .then(async res => {
          if (res.status === 200) {
            let delet = this.state.subDepartmentData.filter(data => {
              if (id !== data.subDepartmentId) {
                return data;
              }
            });
            await this.setState({
              subDepartmentData: delet
            });
            toast.success("Delete Successfully!");
          } else {
            toast.error("Error Notification !");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    });
  };
  handleUpdate = async update_department => {
    let data = this.state.subDepartmentData.filter(update => {
      if (update.subDepartmentId === update_department.subDepartmentId) {
        update.subDepartmentName = update_department.subDepartmentName;
        update.departmentId = update_department.departmentId;
        update.subDepartmentAddress = update_department.subDepartmentAddress;
        update.createdAt = update_department.createdAt;
        update.updatedAt = update_department.updatedAt;
        update.deleteFlag = update_department.deleteFlag;
      }
      return update;
    });
    await this.setState({
      subDepartmentData: data,
      open: false
    });
    toast.success("Update Successfully!");
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
        Header: "Sub Department Name",
        accessor: "subDepartmentName",
        fixed: "left"
      },
      {
        Header: "Sub Department Address",
        accessor: "subDepartmentAddress",

      },
      {
        Header: "Sub Department Id",
        accessor: "subDepartmentId",

      },
      {
        Header: "Action",
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
                  this.handleDelete(
                    post.original.subDepartmentId
                  );
                }}
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
                className="btn btn-info"
                data-placement="top"
                title="edit"
                onClick={() => this.editData(post.original)}
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
          title="Sub Department"
          root="Home"
          rootUrl="/"
          parent="Organization Asset"
          parentUrl="/organizationdetails"
          child="Sub Department"
        />
        <section class="content">
          <div class="row">
            <div class="col-12">
              <div class="box">
                <div class="box-body">
                  <ReactTableFixedColumns
                    data={this.state.subDepartmentData}
                    columns={columns}
                    striped={true}
                    pageSizeOptions={[5, 15, 20, 25]}
                    defaultPageSize={5}
                    className="table -striped -highlight"
                  />

                  <SubDepartmentView
                    data={this.state.previewData}
                    closeModal={previewCloseModal}
                    open={this.state.openModal}
                  />
                  <EditSubDepartment
                    data={this.state.editdata}
                    handleUpdate={this.handleUpdate}
                    closeModal={closeModal}
                    open={this.state.open}
                    branch={this.state.branch}
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
export default SubDepartment;
