import React, { Component } from "react";
import ReactTable from "react-table";
import withFixedColumns from "react-table-hoc-fixed-columns";
import swal from "sweetalert";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Configuration from "../../../commons/configuration/server";
import WorkshiftPreview from "../preview";
import UpdateWorkshift from "../update";
import BreadCrumb from "../../../commons/breadcrumb/index";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

export default class PromotionLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshifts: [],
      currentWorkShift: {},
      open: false,
      openPreviewModal: false
    };
    this.displayWorkshift = this.displayWorkshift.bind(this);
    this.hidePreviewModal = this.hidePreviewModal.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${Configuration.domain}/hrm/getAllWorkShift`)
      .then(response => {
        this.setState({
          workshifts: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  displayWorkshift = data => {
    this.setState({
      currentWorkShift: data,
      openPreviewModal: true
    });
  };

  hidePreviewModal = () => this.setState({ openPreviewModal: false });

  removeWorkshift = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this row",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(confirm => {
      if (confirm) {
        axios
          .delete(`${Configuration.domain}/hrm/deleteWorkShift/${id}`)
          .then(async res => {
            if (res.status === 200) {
              let workshift = this.state.workshifts.filter(workshift => {
                if (id !== workshift.workshiftId) {
                  return workshift;
                }
              });

              await this.setState({
                workshifts: workshift
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  updateWorkshift = currentWorkShift => {
    this.setState({
      currentWorkShift,
      open: true
    });
  };

  handleUpdates = currentWorkShift => {
    let workShift = this.state.workshifts.filter(workShift => {
      if (workShift.workshiftId === currentWorkShift.workshiftId) {
        workShift.workshiftId = currentWorkShift.workshiftId;
        workShift.workshiftType = currentWorkShift.workshiftType;
        workShift.workshiftStartTime = currentWorkShift.workshiftStartTime;
        workShift.workshiftEndTime = currentWorkShift.workshiftEndTime;
        workShift.isOvertimeApplicable = currentWorkShift.isOvertimeApplicable;
        workShift.overtimeMinutes = currentWorkShift.overtimeMinutes;
      }
      return workShift;
    });
    this.setState({
      workshifts: workShift,
      open: false
    });
  };

  closeModal = () => {
    this.setState({ open: false });
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
        Cell: row => row.index + 1
      },
      {
        Header: "Start Time",
        accessor: "workshiftStartTime"
      },
      {
        Header: "End Time",
        accessor: "workshiftEndTime"
      },
      {
        Header: "Working Duration",
        accessor: "workingMinutes"
      },
      {
        Header: "Is Over Working?",
        accessor: "isOvertimeApplicable"
      },
      {
        Header: "Over Time",
        accessor: "overtimeMinutes"
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
              className="btn btn-danger"
                data-placement="top"
                title="Delete"
                onClick={() => this.removeWorkshift(data.original.workshiftId)}
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
                className="btn btn-info"
                data-placement="top"
                title="edit"
                onClick={() => this.updateWorkshift(data.original)}
              >
                <span className="mdi mdi-table-edit" />
              </button>
              <button
                className="btn btn-success"
                data-placement="top"
                title="view"
                onClick={() => this.displayWorkshift(data.original)}
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
    if (this.state.open) {
      updateComponent = (
        <UpdateWorkshift
          currentWorkShift={this.state.currentWorkShift}
          handleUpdates={this.handleUpdates}
          open={this.state.open}
          closeModal={this.closeModal}
          saveAndClose={this.saveAndClose}
        />
      );
    }

    return (
      <div
        className="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Workshift"
          root="Home"
          rootUrl="/"
          parent="Organization Asset"
          parentUrl="/organizationdetails"
          child="Workshift"
        />
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="box-header with-border">
                  <h3 className="box-title">Workshift data </h3>
                </div>

                <div className="box-body">
                  <ReactTableFixedColumns
                    data={this.state.workshifts}
                    columns={columns}
                    striped={true}
                    pageSizeOptions={[5, 15, 20, 25]}
                    defaultPageSize={5}
                    className="table -striped -highlight"
                  />

                  <WorkshiftPreview
                    data={this.state.currentWorkShift}
                    open={this.state.openPreviewModal}
                    hidePreviewModal={this.hidePreviewModal}
                  />
                  {updateComponent}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    );
  }
}
