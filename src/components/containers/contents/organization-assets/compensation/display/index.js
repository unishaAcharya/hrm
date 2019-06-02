import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import CompensationView from "../preview";
import CompensationUpdate from "../update";
import BreadCrumb from "../../../commons/breadcrumb/index";
import "react-table/react-table.css";
import Configuration from "../../../commons/configuration/server";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import withFixedColumns from "react-table-hoc-fixed-columns";


const ReactTableFixedColumns = withFixedColumns(ReactTable);
export default class CompensationAllowance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowanceData: [],
      previewData: {},
      updateview: {},
      open: false,
      updateModel: false,
      allowanceType: []
    };
  }

  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllAllowanceAndCompensation`)
      .then(res => {
        this.setState({
          allowanceData:res.data
        })
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
        url: `${
          Configuration.domain
        }/hrm/deleteAllowanceAndCompensation//${id}`
      })
        .then(async res => {
          if (res.status == 200) {
            let delet = this.state.allowanceData.filter(data => {
              if (id !== data.allowanceId) {
                return data;
              }
            });
            await this.setState({
              allowanceData: delet
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
  preview = data => {
    this.setState({
      previewData: data,
      open: true
    });
  };
  allowance_type=()=>{
    Axios.get(`${Configuration.domain}/hrm/getAllAllowanceAndCompensation`)
          .then(response => {
            this.setState({
              allowanceType: response.data,

            });
          })
          .catch(err => {
            console.log(err);
          });

  }
  update_preview = data => {
    this.setState({
        updateview: data,
        updateModel: true
     });
  };
  handle_Update = update => {
    if (update.paymentType === "percentage") {
      let updatedata = this.state.allowanceData.filter(updatedata => {
        if (updatedata.allowanceId === update.allowanceId) {
          updatedata.allowanceId = update.allowanceId;
          updatedata.allowanceType = update.allowanceType;
          updatedata.paymentType = update.paymentType;
          updatedata.percentage = update.percentage;
          updatedata.paymentFrom = update.paymentFrom;
          updatedata.unit = update.unit;
          updatedata.projectId = update.projectId;
          updatedata.paymentSchedule = update.paymentSchedule;
          updatedata.completeDate = update.completeDate;
        }
        return update;
      });
      this.setState({
        allowanceData: updatedata,
        updateModel: false
      });
      toast.success("Update Successfully");
    } else if (
      update.paymentType === "percentage" &&
      update.paymentSchedule === "interval"
    ) {
      let updatedata = this.state.allowanceData.filter(updatedata => {
        if (updatedata.allowanceId === update.allowanceId) {
          updatedata.allowanceId = update.allowanceId;
          updatedata.allowanceType = update.allowanceType;
          updatedata.paymentType = update.paymentType;
          updatedata.percentage = update.percentage;
          updatedata.paymentFrom = update.paymentFrom;
          updatedata.unit = update.unit;
          updatedata.projectId = update.projectId;
          updatedata.paymentRules = ["11", "22"];
          updatedata.paymentSchedule = update.paymentSchedule;
          updatedata.completeDate = update.completeDate;
        }
        return update;
      });
      this.setState({
        allowanceData: updatedata,
        updateModel: false
      });
    } else {
      let updatedata = this.state.allowanceData.filter(cashdata => {
        if (cashdata.allowanceId === update.allowanceId) {
          cashdata.allowanceId = update.allowanceId;
          cashdata.allowanceType = update.allowanceType;
          cashdata.paymentType = update.paymentType;
          cashdata.cash = update.cash;
          cashdata.paymentFrom = update.paymentFrom;
          cashdata.unit = update.unit;
        }
        return update;
      });
      this.setState({
        allowanceData: updatedata,
        updateModel: false
      });
    }
  };

  render() {
    let closeModal = () => this.setState({ open: false });
    let update_closeModal = () => this.setState({ updateModel: false });
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
        Header: "Allowance Type",
        accessor: "allowanceType",
        fixed: "left"
      },
      {
        Header: "Cash",
        accessor: "cash"
      },
      {
        Header: "Payment From",
        accessor: "paymentFrom"
      },
      {
        Header: "Payment Schedule",
        accessor: "paymentSchedule"
      },
      {
        Header: "Payment Type",
        accessor: "paymentType"
      },
      {
        Header: "Percentage",
        accessor: "percentage"
      },
      {
        Header: "Project Id",
        accessor: "projectId"
      },
      {
        Header: "Unit",
        accessor: "unit"
      },
      {
        Header: "Complete Date",
        accessor: "completeDate"
      },
      {
        Header: "Payment Rules",
        accessor: "paymentRules",
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
                  this.handleDelete(post.original.allowanceId);
                }}
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
              className="btn btn-info"
              data-placement="top"
              title="edit"
              onClick={() => {this.update_preview(post.original);this.allowance_type()}}
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
    return (
      <div
        class="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Allowance and Compensation"
          root="Home"
          rootUrl="/"
          parent="Organization Asset"
          parentUrl="/organizationdetails"
          child="Allowance and Compensation"
        />
        <section class="content">
          <div class="row">
            <div class="col-12">
              <div class="box">
                <div class="box-body">
                  <ReactTableFixedColumns
                    data={this.state.allowanceData}
                    columns={columns}
                    striped={true}
                    pageSizeOptions={[5, 15, 20, 25]}
                    defaultPageSize={5}
                    className="table -striped -highlight"
                  />
                  <CompensationView
                    data={this.state.previewData}
                    closeModal={closeModal}
                    open={this.state.open}
                  />
                  <CompensationUpdate
                    allowanceType={this.state.allowanceType}
                    data={this.state.updateview}
                    open={this.state.updateModel}
                    closeModal={update_closeModal}
                    handleUpdate={this.handle_Update}
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
