import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import LeaveView from "../preview/index";
import LeaveUpdate from "../update/index";
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
      leaveData: [],
      previewData: {},
      open: false,
      updateView: {},
      updateopen: false,
      leavedynamic:[]
    };
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllLeave`)
      .then(res => {
        let data = res.data;
        this.setState({
          leaveData: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handlePreview = data => {
    this.setState({
      previewData: data,
      open: true
    });
  };
  update = data => {
    Axios.get(`${Configuration.domain}/hrm/getAllLeaveIdAndTypeOnly`)
      .then(res => {
        this.setState({
          leavedynamic:res.data.t,
          updateView: data,
          updateopen: true
        })
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleDelete = id => {
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
        url: `${Configuration.domain}/hrm/deleteLeave/${id}`
      })
        .then(async res => {
          if (res.status == 200) {
            let delet = this.state.leaveData.filter(data => {
              if (id !== data.leaveId) {
                return data;
              }
            });
            await this.setState({
              leaveData: delet
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
  handleUpdate = update_leave => {
    let data = this.state.leaveData.filter(update => {
      if (update.leaveId === update_leave.leaveId) {
        update.leaveType = update_leave.leaveType;
        update.totalLeaveDays = update_leave.totalLeaveDays;
      }
      return update;
    });

    this.setState({
      leaveData: data,
      updateopen: false
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
        Header: "Leave Type",
        accessor: "leaveType",
        fixed: "left",
      },
      {
        Header: "Total Leave Days",
        accessor: "totalLeaveDays",

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
                  this.handleDelete(post.original.leaveId);
                }}
              >
              <span className="mdi mdi-delete" />
              </button>
              <button
                  className="btn btn-info"
                  data-placement="top"
                  title="edit"
                  onClick={() => this.update(post.original)}>
                <span className="mdi mdi-table-edit" />
              </button>
              <button
                className="btn btn-success"
                data-placement="top"
                title="view"
               onClick={() => this.handlePreview(post.original)}>
                <span className="mdi mdi-eye" />              </button>
              <ToastContainer />
            </div>
          );
        },
        width: 200
      }
    ];
    let closeModal = () => this.setState({ open: false });
    let updatecloseModal = () => this.setState({ updateopen: false });
    return (
      <div
        class="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Leave"
          root="Home"
          rootUrl="/"
          parent="Organization Asset"
          parentUrl="/organizationdetails"
          child="Leave"
        />
        <section class="content">
          <div class="row">
            <div class="col-12">
              <div class="box">
                <div class="box-body">
                  <ReactTableFixedColumns
                    data={this.state.leaveData}
                    columns={columns}
                    striped={true}
                    pageSizeOptions={[5, 15, 20, 25]}
                    defaultPageSize={5}
                    className="table -striped -highlight"
                  />
                  <LeaveView
                    data={this.state.previewData}
                    open={this.state.open}
                    closeModal={closeModal}
                  />
                  <LeaveUpdate
                    data={this.state.updateView}
                    open={this.state.updateopen}
                    closeModal={updatecloseModal}
                    handleUpdate={this.handleUpdate}
                    leavedynamic={this.state.leavedynamic}
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
