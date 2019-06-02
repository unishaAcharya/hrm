import React, { Component } from "react";
import ReactTable from "react-table";
import BreadCrumb from "../../../commons/breadcrumb/index";
import Axios from "axios";
import RankView from "../preview/index";
import RankEdit from "../update/index";
import swal from "sweetalert";
import Configuration from "../../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default class RankTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankData: [],
      previewData: {},
      editview: {},
      open: false,
      openModal: false,
      branch:[]
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllRank`)
      .then(res => {
        let data = res.data;
        this.setState({
          rankData: data
        });
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
  displayRank = data => {
    Axios.get(`${Configuration.domain}/hrm/getAllBranchIdAndNameOnly`)
    .then(function(response) {
      this.setState({
          branch:response.data.t,
          editview: data,
          open: true
      })

      }.bind(this))
    .catch(function(response) {
      console.log(response);
    });
  };
  handleUpdate = update_department => {
    let data = this.state.rankData.filter(update => {
      if (update.rankId === update_department.rankId) {
        update.rankName = update_department.rankName;
        update.departmentId = update_department.departmentId;
        update.subDepartmentId = update_department.subDepartmentId;
        update.salaryRange = update_department.salaryRange;
        update.createdAt = update_department.createdAt;
        update.updatedAt = update_department.updatedAt;
        update.deleteFlag = update_department.deleteFlag;
      }
      return update;
    });
    this.setState({
      rankData: data,
      open: false
    });
    toast.success("Update Successfully!");
  };

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
        url: `${Configuration.domain}/hrm/deleteRank/${id}`
      })
        .then(async res => {
          if (res.status === 200) {
            let delet = this.state.rankData.filter(data => {
              if (id !== data.rankId) {
                return data;
              }
            });
            await this.setState({
              rankData: delet
            });
            toast.success("Delete Successfully!");
          } else {
            toast.error("Error Notification !");
          }
        })
        .catch(function(response) {
          //handle error
          console.log(response);
        });
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
        Header: "Rank Name",
        accessor: "rankName",
        fixed: "left"
      },
      {
        Header: "Department Id",
        accessor: "departmentId",
        maxWidth: 200,
        width: 200
      },
      {
        Header: "Salary Range",
        accessor: "salaryRange",
        maxWidth: 200,
        width: 200
      },
      {
        Header: "Sub Department Id",
        accessor: "subDepartmentId",
        maxWidth: 200,
        width: 200
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
                  this.handleDelete(post.original.rankId);
                }}
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
                className="btn btn-info"
                data-placement="top"
                title="edit"
                onClick={() => this.displayRank(post.original)}
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
          title="Rank"
          root="Home"
          rootUrl="/"
          parent="Organization Asset"
          parentUrl="/organizationdetails"
          child="Rank"
        />

        <section class="content">
          <div class="row">
            <div class="col-12">
              <div class="box">
                <div class="box-body">
                  <ReactTable
                    data={this.state.rankData}
                    columns={columns}
                    striped={true}
                    pageSizeOptions={[5, 15, 20, 25]}
                    defaultPageSize={5}
                    className="table -striped -highlight"
                  />
                  <RankView
                    data={this.state.previewData}
                    closeModal={previewCloseModal}
                    open={this.state.openModal}
                  />
                  <RankEdit
                    data={this.state.editview}
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
