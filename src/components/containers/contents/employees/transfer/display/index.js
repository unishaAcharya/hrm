import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import "react-table/react-table.css";
import TransferView from "../preview";
import TransferUpdate from "../update";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import withFixedColumns from "react-table-hoc-fixed-columns";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
class TransferTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferData: [],
      previewData: {},
      editview: {},
      open: false,
      openPreviewModal: false,
      branch:[],
      employee:[]
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllTransfer`)
      .then(response => {
        this.setState({
          transferData: response.data,
        })

      })
    .catch(function(response) {
       console.log(response);
     });
  };

  preview = data => {
    this.setState({
      previewData: data,
      openPreviewModal: true
    });
  };
  // For update
  Updateview = data => {
    Axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
    .then(function(response) {
        Axios.get(`${Configuration.domain}/hrm/getAllBranchIdAndNameOnly`)
      .then(function(res) {
        this.setState({
          editview: data,
          open: true,
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
  handleUpdate(update_transfer) {
    let data = this.state.transferData.filter(updatedata => {
      if (updatedata.transferId === update_transfer.transferId) {
        updatedata.branchId = update_transfer.branchId;
        updatedata.employeeId = update_transfer.employeeId;
        updatedata.effectiveDate = update_transfer.effectiveDate;
        updatedata.comment = update_transfer.comment;
        updatedata.departmentId = update_transfer.departmentId;
        updatedata.rankId = update_transfer.rankId;
      }
      return updatedata;
    });
    this.setState({ transferData: data, open: false });
    toast.success("Update Successfully!");
  }

  //  Delete Method
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
          url: `${Configuration.domain}/hrm/deleteTransfer/${id}`,
        }).then(async response => {
          if (response.status === 200) {
            let delet = this.state.transferData.filter(data => {
              if (id !== data.transferId) {
                return data;
              }
            });
            await this.setState({
              transferData: delet
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
        sortable: false,
        fixed: "left",
        width: 50,
        Cell: row =>row.index + 1
      },
      {
        Header: "Start Date",
        accessor: "effectiveDate",

      },
      {
        Header: "Employee Id",
        accessor: "employeeId",

      },
      {
        Header: "Branch ID",
        accessor: "branchId",

      },
      {
        Header: "Department Id",
        accessor: "departmentId",

      },
      {
        Header: "Rank id",
        accessor: "rankId",

      },
      {
        Header: "Comment",
        accessor: "comment",

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
                className="btn-remove"
                data-placement="top"
                title="Delete"
                onClick={() => {
                  this.handleDelete(post.original.transferId);
                }}
              >
                <i className="fa fa-trash" aria-hidden="true" />
              </button>
              <button
                className="btn-remove"
                data-toggle="modal"
                data-placement="top"
                title="Edit"
                data-target="#edit"
                onClick={() => this.Updateview(post.original)}
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
              </button>
              <button
                className="btn-remove"
                data-toggle="modal"
                data-target="#View"
                data-toggle="modal"
                onClick={() => this.preview(post.original)}
              >
                <i className="fa fa-eye" aria-hidden="true" />
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
      <div class="box-body">
        <ReactTableFixedColumns
          data={this.state.transferData}
          columns={columns}
          striped={true}
          pageSizeOptions={[5, 15, 20, 25]}
          defaultPageSize={5}
          className="table -striped -highlight"
        />
        <TransferView
          data={this.state.previewData}
          closeModal={previewModalClose}
          open={this.state.openPreviewModal}
        />
        <TransferUpdate
          closeModal={closeModal}
          open={this.state.open}
          data={this.state.editview}
          handleUpdate={this.handleUpdate}
          branch={this.state.branch}
          employee={this.state.employee}
        />
      </div>
    );
  }
}

export default TransferTable;
