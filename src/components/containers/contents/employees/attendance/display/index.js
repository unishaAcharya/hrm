import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import swal from "sweetalert";
import "react-table/react-table.css";
import Configuration from "../../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PreviewAttendance from "../preview";
import AttendanceUpdate from "../update";

class AttendanceTable extends Component {
  constructor() {
    super();
    this.state = {
      attendanceData: [],
      previewData: {},
      editViewData: {},
      open: false,
      openPreviewModal: false
    };
  }
  componentWillMount() {
    Axios({
      method: "get",
      url: `${Configuration.domain}/hrm/getAllAttendance`
    }).then(response => {
      this.setState({
        attendanceData: response.data
      });
    });
  }
  preview = data => {
    this.setState({
      previewData: data,
      openPreviewModal: true
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
      Axios.delete(`${Configuration.domain}/hrm/deleteAttendance/${id}`)
        .then(response => {
          if (response.status === 204) {
            let del = this.state.attendanceData.filter(data => {
              if (id !== data.attendanceId) return data;
            });
            this.setState({
              attendanceData: del
            });
            toast.success("Delete Successfully!");
          } else {
            toast.error("Error Notification !");
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  };
  UpdateView = data => {
    this.setState({
      open: true,
      editViewData: data
    });
  };
  handleUpdates = currentAttendance => {
    let attendance = this.state.attendanceData.filter(attendance => {
      if (attendance.attendanceId === currentAttendance.attendanceId) {
        attendance.employeeId = currentAttendance.employeeId;
        attendance.approvedBy = currentAttendance.approvedBy;
      }
      return attendance;
    });
    this.setState({
      attendanceData: attendance,
      open: false
    });
  };
  render() {
    const columns = [
      {
        Header: "S.N.",
        filterable: false,
        Cell: row => row.index + 1
      },
      {
        Header: "Employee Id",
        accessor: "employeeId"
      },
      {
        Header: "Approved By",
        accessor: "approvedBy"
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
                  this.handleDelete(post.original.attendanceId);
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
    let previewModalClose = () => this.setState({ openPreviewModal: false });
    return (
      <div className="box-body">
        <ReactTable
          data={this.state.attendanceData}
          columns={columns}
          striped={true}
          pageSizeOptions={[5, 15, 20, 25]}
          defaultPageSize={5}
          className="table -striped -highlight"
        />
        <PreviewAttendance
          data={this.state.previewData}
          closeModal={previewModalClose}
          open={this.state.openPreviewModal}
        />
        <AttendanceUpdate
          closeModal={closeModal}
          open={this.state.open}
          data={this.state.editViewData}
          handleUpdates={this.handleUpdates}
        />
      </div>
    );
  }
}

export default AttendanceTable;
