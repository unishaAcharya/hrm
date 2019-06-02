import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import "react-table/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import ShiftAssignView from "../preview";
import ShiftUpdate from "../update";
import swal from "sweetalert";
import Configuration from "../../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class ShiftTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shiftAssignData: [],
      previewData: {},
      editview: {},
      open: false,
      openPreviewModal: false,
      employee:[],
      workshift:[]

    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllWorkShiftAssign`)
      .then(response => {
        let data = response.data.t;
        this.setState({ shiftAssignData: data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  preview = data => {
    this.setState({
      previewData: data,
      openPreviewModal: true
    });
  };
  Updateview = data => {
    Axios.get(`${Configuration.domain}/hrm/getAllWorkShiftIdAndTypeOnly`)
    .then(res=>{
      Axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
        .then(response => {

          this.setState({
            editview: data,
            open: true,
            employee:response.data.t,
            workshift:res.data.t
          })
        })
        .catch(err => {
          console.log(err);
        });
    }).catch(err=>{
      console.log(err);
    })
  };

  handleUpdate(update_shift) {
    let data = this.state.shiftAssignData.filter(updatedata => {
      if (updatedata.workShiftAssignId === update_shift.workShiftAssignId) {
        updatedata.employeeId = update_shift.employeeId;
        updatedata.shiftStartDate = update_shift.shiftStartDate;
        updatedata.shiftEndDate = update_shift.shiftEndDate;
        updatedata.shiftAssignedDate = update_shift.shiftAssignedDate;
        updatedata.workShiftId = update_shift.workShiftId;
        updatedata.shiftAssignedBy = update_shift.shiftAssignedBy;
      }

      return updatedata;
    });
    this.setState({ shiftAssignData: data, open: false });
    toast.success("Update Successfully!");
  }

  // For Delete
  handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this row",
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
      .then(name => {
        if (!name) throw null;
        Axios({
          method: "delete",
          url: `${Configuration.domain}/hrm/deleteWorkShiftAssign/${id}`,
        }).then(response => {
          if (response.status === 200) {
            let delet = this.state.shiftAssignData.filter(data => {
              if (id !== data.workShiftAssignId) {
                return data;
              }
            });
            this.setState({
              shiftAssignData: delet
            });
            toast.success("Delete Successfully!");
          } else {
            toast.error("Error Notification !");
          }
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {
    const columns = [
      {
        Header: "S.N.",
        fixed: "left",
        filterable: false,
        Cell: row => row.index + 1
      },
      {
        Header: "Shift Assign By",
        accessor: "shiftAssignedBy",
        fixed: "left"

      },
      {
        Header: "Shift Start Date",
        accessor: "shiftStartDate",

      },
      {
        Header: "Shift End Date",
        accessor: "shiftEndDate",

      },

      {
        Header: "Employee Id",
        accessor: "employeeId",

      },
      {
        Header: "Workshift Id",
        accessor: "workShiftId",

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
                    post.original.workShiftAssignId,
                    post.original
                  );
                }}
              >
              <span className="mdi mdi-delete" />
              </button>

              <button
              className="btn btn-info"
              data-placement="top"
              title="edit"
                onClick={() => this.Updateview(post.original)}
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
        <ReactTableFixedColumns
          data={this.state.shiftAssignData}
          columns={columns}
          striped={true}
          pageSizeOptions={[5, 15, 20, 25]}
          defaultPageSize={5}
          className="table -striped -highlight"
        />
        <ShiftAssignView
          data={this.state.previewData}
          closeModal={previewModalClose}
          open={this.state.openPreviewModal}
        />
        <ShiftUpdate
          closeModal={closeModal}
          open={this.state.open}
          data={this.state.editview}
          handleUpdate={this.handleUpdate}
          employee={this.state.employee}
          workshift={this.state.workshift}
        />
      </div>
    );
  }
}

export default ShiftTable;
