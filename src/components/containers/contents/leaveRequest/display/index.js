import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import swal from "sweetalert";
import withFixedColumns from "react-table-hoc-fixed-columns";
import LeaveRequestView from "../preview";
import LeaveRequestUpdate from "../update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Configuration from "../../commons/configuration/server";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
export default class LeaveRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveRequestData: [],
      view: {},
      open: false,
      updateModel: false,
      updateview: {}
    };
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllLeaveRequest`)
      .then(res => {
        let data = res.data;
        this.setState({
          leaveRequestData: data
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
        url: `${Configuration.domain}/hrm/deleteLeaveRequest/${id}`
      })
        .then(async res => {
          if (res.status == 200) {
            let delet = this.state.leaveRequestData.filter(data => {
              if (id !== data.leaveRequestId) {
                return data;
              }
            });
            await this.setState({
              leaveRequestData: delet
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
  preview = data => {
    this.setState({
      view: data,
      open: true
    });
  };
  update_preview = data => {
    this.setState({
      updateview: data,
      updateModel: true
    });
  };
  handleUpdate = update => {
    let updatedata = this.state.leaveRequestData.filter(updatedata => {
      if (updatedata.leaveRequestId === update.leaveRequestId) {
      }
      return update;
    });
    this.setState({
      leaveRequestData: updatedata,
      updateModel: false
    });
    toast.success("Update Successfully!");
  };
  render() {
    let update_closeModal = () => this.setState({ updateModel: false });
    let closeModal = () => this.setState({ open: false });
    const columns = [
      {
        Header: "S.N.",
        fixed: "left",
        filterable: false,
        Cell: row => row.index + 1
      },
      {
        Header: "Leave Type",
        accessor: "leaveType",
        fixed: "left"
      },
      {
        Header: "leave Request Date",
        accessor: "leaveRequestDate",

      },
      {
        Header: "leave Start Date",
        accessor: "leaveStartDate",

      },
      {
        Header: "Leave End Date",
        accessor: "leaveEndDate",

      },
      {
        Header: "Pay For Extra Days",
        accessor: "payForExtraDays",

      },
      {
        Header: "Remaining Days",
        accessor: "remainingDays",

      },
      {
        Header: "Requested Leave Days",
        accessor: "requestedLeaveDays",

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
                  this.handleDelete(
                    post.original.leaveRequestId
                  );
                }}
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
                className="btn btn-info"
                data-placement="top"
                title="edit"
                onClick={() => this.update_preview(post.original)}
              >
                  <span className="mdi mdi-eye" />
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
    return (
      <div class="box-body">
        <ReactTableFixedColumns
          data={this.state.leaveRequestData}
          columns={columns}
          striped={true}
          pageSizeOptions={[5, 15, 20, 25]}
          defaultPageSize={5}
          className="table -striped -highlight"
        />
        <LeaveRequestView
          data={this.state.view}
          closeModal={closeModal}
          open={this.state.open}
        />
        <LeaveRequestUpdate
          data={this.state.updateview}
          open={this.state.updateModel}
          closeModal={update_closeModal}
          handleUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}
