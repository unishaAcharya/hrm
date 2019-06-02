import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import Configuration from "../../commons/configuration/server";
import "react-table/react-table.css";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AllowanceTypePreview from "./preview";
import AllowanceTypeUpdate from "./update";
import BreadCrumb from "../../commons/breadcrumb/index";
import withFixedColumns from "react-table-hoc-fixed-columns";


const ReactTableFixedColumns = withFixedColumns(ReactTable);

class DisplayAllowanceType extends Component {
  constructor() {
    super();
    this.state = {
      allowanceTypeData: [],
      previewData: {},
      editview: {},
      open: false,
      openModal: false
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllAllowanceType`)
      .then(response => {
        let data = response.data;
        this.setState({ allowanceTypeData: data });
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

  UpdateView = data => {
    this.setState({
      editview: data,
      open: true
    });
  };
  handleUpdate(update_allowance) {
    let data = this.state.allowanceTypeData.filter(updatedata => {
      if (updatedata.allowanceTypeId === update_allowance.allowanceTypeId) {
        updatedata.allowanceType = update_allowance.allowanceType;
        updatedata.allowanceTypeId = update_allowance.allowanceTypeId;
      }
      return updatedata;
    });
    this.setState({ allowanceTypeData: data, open: false });
    toast.success("Update Successfully!");
  }

  // For Delete
  handleDelete = (id, data) => {
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
          url: `${Configuration.domain}/hrm/deleteAllowanceType/${id}`,
          data: data
        }).then(response => {
          if (response.status === 200) {
            let delet = this.state.allowanceTypeData.filter(data => {
              if (id !== data.allowanceTypeId) {
                return data;
              }
            });
            this.setState({
              allowanceTypeData: delet
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
        Header: "Allowance Type",
        accessor: "allowanceType",

      },
      {
        Header: "Action",
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
                    post.original.allowanceTypeId,
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
    let previewCloseModal = () => this.setState({ openModal: false });
    return (
      <div
        className="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Allowance Type"
          root="Home"
          rootUrl="/"
          parent="Organization Asset"
          parentUrl="/organizationdetails"
          child="Allowance Type"
        />
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="box">
                <div className="box-body">
                  <ReactTableFixedColumns
                    data={this.state.allowanceTypeData}
                    columns={columns}
                    striped={true}
                    pageSizeOptions={[5, 15, 20, 25]}
                    defaultPageSize={5}
                    className="table -striped -highlight"
                  />
                  <AllowanceTypePreview
                    data={this.state.previewData}
                    closeModal={previewCloseModal}
                    open={this.state.openModal}
                  />
                  <AllowanceTypeUpdate
                    closeModal={closeModal}
                    open={this.state.open}
                    data={this.state.editview}
                    handleUpdate={this.handleUpdate}
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
export default DisplayAllowanceType;
