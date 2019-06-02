import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import "react-table/react-table.css";
import AdvancePaymentView from "../preview";
import AdvancePaymentUpdate from "../update";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import withFixedColumns from "react-table-hoc-fixed-columns";


const ReactTableFixedColumns = withFixedColumns(ReactTable);
class ShiftTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advancePayment: [],
      previewData: [],
      openPreviewModal: false,
      editview: [],
      open: false,
      RequestId:[]
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllAdvancePayment`)
      .then(response => {
        let data = response.data;
        this.setState({ advancePayment: data });
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
    Axios.get(`${Configuration.domain}/hrm/getAllAdvanceRequestIdOnly`)
    .then(function(response) {
      this.setState({
          RequestId:response.data.t,
          editview: data,
          open: true
      })
      }.bind(this))
    .catch(function(response) {
      console.log(response);
    });
  };

  handleUpdate(update_payment) {
    let data = this.state.advancePayment.filter(updatedata => {
      if (updatedata.advancePaymentId === update_payment.advancePaymentId) {
        updatedata.title = update_payment.title;
        updatedata.deductionDate = update_payment.deductionDate;
        updatedata.paidAmount = update_payment.paidAmount;
        updatedata.dueAmount = update_payment.dueAmount;
        updatedata.advanceRequestId = update_payment.advanceRequestId;
      }
      return updatedata;
    });
    this.setState({
      advancePayment: data,
      open: false
    });
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
          url: `http://localhost:8080/hrm/deleteAdvancePayment/${id}`,
        }).then(response => {
          if (response.status === 204) {
            let delet = this.state.advancePayment.filter(data => {
              if (id !== data.advancePaymentId) {
                return data;
              }
            });
            this.setState({
              advancePayment: delet
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
        Header: "advanceRequestId",
        accessor: "advanceRequestId",
        fixed: "left",
      },
      {
        Header: "deductionDate",
        accessor: "deductionDate",

      },
      {
        Header: "Employee",
        accessor: "employeeId",

      },
      {
        Header: "paidAmount",
        accessor: "paidAmount",

      },
      {
        Header: "title",
        accessor: "title",

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
                    post.original.advancePaymentId
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
    let closePreviewModal = () => this.setState({ openPreviewModal: false });
    return (
      <div class="box-body">
        <ReactTable
          data={this.state.advancePayment}
          columns={columns}
          striped={true}
          pageSizeOptions={[5, 15, 20, 25]}
          defaultPageSize={5}
          className="table -striped -highlight"
        />
        <AdvancePaymentView
          data={this.state.previewData}
          open={this.state.openPreviewModal}
          closeModal={closePreviewModal}
        />

        <AdvancePaymentUpdate
          data={this.state.editview}
          open={this.state.open}
          closeModal={closeModal}
          handleUpdate={this.handleUpdate}
          RequestId={this.state.RequestId}
        />
      </div>
    );
  }
}

export default ShiftTable;
