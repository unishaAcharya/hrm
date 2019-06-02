import React, { Component } from "react";
import ReactTable from "react-table";
import swal from "sweetalert";
import axios from "axios";
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table/react-table.css";
import Preview from "./preview";
import UpdateAdvanceRequest from "./update";
import Configuration from "../../commons/configuration/server";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

class AdvanceRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advanceRequests: [],
      currentRequest: {},
      open: false,
      openPreviewModal: false,
      employee:[]
    };
    this.displayRequest = this.displayRequest.bind(this);
    this.hidePreviewModal = this.hidePreviewModal.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${Configuration.domain}/hrm/getAllAdvanceRequest`)
      .then(response => {
        this.setState({
          advanceRequests: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  displayRequest = currentRequest => {
    this.setState({
      currentRequest,
      openPreviewModal: true
    });
  };

  hidePreviewModal = () => this.setState({ openPreviewModal: false });

  removeRequest = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this row",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(confirm => {
      if (confirm) {
        axios
          .delete(`${Configuration.domain}/hrm/deleteAdvanceRequest/${id}`)
          .then(async res => {
            if (res.status === 204) {
              let advanceRequests = this.state.advanceRequests.filter(
                advanceRequest => {
                  if (id !== advanceRequest.advanceRequestId) {
                    return advanceRequest;
                  }
                }
              );
              await this.setState({
                advanceRequests
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  updateRequest = currentRequest => {
    axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
    .then(function(res) {
      this.setState({
          employee:res.data.t,
          currentRequest,
          open: true
      })
      }.bind(this))
    .catch(function(response) {
      console.log(response);
    });

  };

  approveRequest = advanceRequestId => {
    console.log(advanceRequestId);
  };

  handleUpdates = currentRequest => {
    let advanceRequests = this.state.advanceRequests.filter(advanceRequest => {
      if (currentRequest.advanceRequestId === advanceRequest.advanceRequestId) {
        advanceRequest.employeeId = currentRequest.employeeId;
        advanceRequest.advanceRequestAmount =
          currentRequest.advanceRequestAmount;
      }
      return advanceRequest;
    });
    this.setState({
      advanceRequests: advanceRequests,
      open: false
    });
  };

  closeModal = () => this.setState({ open: false });

  render() {
    const columns = [
      {
        Header: "S.N.",
        fixed: "left",
        filterable: false,
        sortable: false,
        fixed: "left",
        width: 50,
        Cell: row => row.index + 1
      },
      {
        Header: "Employee ID",
        accessor: "employeeId",
        fixed: "left"
      },
      {
        Header: "Advance Request",
        accessor: "advanceRequestAmount"
      },
      {
        Header: "Requested Date",
        accessor: "requestDate"
      },
      {
        Header: "Action", // Custom header components!
        accessor: "action",
        width: 75,
        sortable: false,
        fixed: "right",
        Cell: data => {
          return (
            <div className="text-center">
              <button
                className="btn btn-warning"
                data-placement="top"
                title="Approve"
                onClick={() =>
                  this.approveRequest(data.original.advanceRequestId)
                }
              >
                <span className="mdi mdi-checkbox-marked-circle-outline" />
              </button>
              <button
                className="btn btn-danger"
                data-placement="top"
                title="Delete"
                onClick={() =>
                  this.removeRequest(data.original.advanceRequestId)
                }
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
                className="btn btn-info"
                onClick={() => this.updateRequest(data.original)}
              >
                <span className="mdi mdi-table-edit" />
              </button>
              <button
                className="btn btn-success"
                data-toggle="modal"
                data-target="#ViewModal"
                data-toggle="modal"
                onClick={() => this.displayRequest(data.original)}
              >
                <span className="mdi mdi-eye" />
              </button>
            </div>
          );
        },
        width: 200
      }
    ];

    let updateComponent = "";
    if (this.state.currentRequest) {
      updateComponent = (
        <UpdateAdvanceRequest
          currentRequest={this.state.currentRequest}
          handleUpdates={this.handleUpdates}
          closeModal={this.closeModal}
          open={this.state.open}
          saveAndClose={this.saveAndClose}
          employee={this.state.employee}
        />
      );
    }

    return (
      <div className="box-body">
        <ReactTableFixedColumns
          data={this.state.advanceRequests}
          columns={columns}
          striped={true}
          pageSizeOptions={[5, 15, 20, 25]}
          defaultPageSize={5}
          className="table -striped -highlight"
        />

        {updateComponent}

        {this.state.currentRequest && (
          <Preview
            currentRequest={this.state.currentRequest}
            open={this.state.openPreviewModal}
            hidePreviewModal={this.hidePreviewModal}
          />
        )}
      </div>
    );
  }
}

export default AdvanceRequests;
