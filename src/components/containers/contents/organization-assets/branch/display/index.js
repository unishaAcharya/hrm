import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import "react-table/react-table.css";
import BranchView from "../preview/index";
import BranchUpdate from "../update/index";
import swal from "sweetalert";
import BreadCrumb from "../../../commons/breadcrumb/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import withFixedColumns from "react-table-hoc-fixed-columns";


const ReactTableFixedColumns = withFixedColumns(ReactTable);

export default class BranchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branchData: [],
      previewData: {},
      editview: {},
      open: false,
      openModal: false
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllBranch`)
      .then(res => {
        let data = res.data;
        this.setState({
          branchData: data
        });
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
  handleUpdate(update_department) {
    let data = this.state.branchData.filter(updatedata => {
      if (updatedata.branchId === update_department.branchId) {
        updatedata.branchName = update_department.branchName;
        updatedata.branchContact = update_department.branchContact;
        updatedata.branchEmail = update_department.branchEmail;
        updatedata.branchFaxNo = update_department.branchFaxNo;
        updatedata.createdAt = update_department.createdAt;
        updatedata.updatedAt = update_department.updatedAt;
        updatedata.deleteFlag = update_department.deleteFlag;
      }
      return updatedata;
    });

    this.setState({
      branchData: data,
      open: false
    });
    toast.success("Update Successfully!");
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
        url: `${Configuration.domain}/hrm/deleteBranch/${id}`

      })
        .then(async res => {
          if (res.status === 200) {
            let delet = this.state.branchData.filter(data => {
              if (id !== data.branchId) {
                return data;
              }
            });
            await this.setState({
              branchData: delet
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
        Header: "Branch Name",
        accessor: "branchName",
        fixed: "left"
      },
      {
        Header: "Branch Contact",
        accessor: "branchContact",
      },
      {
        Header: "Branch Email",
        accessor: "branchemail",

      },
      {
        Header: "Branch Fax Number",
        accessor: "branchfaxNo",
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
                  this.handleDelete(post.original.branchId);
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
        class="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Branch"
          root="Home"
          rootUrl="/"
          parent="Organization Asset"
          parentUrl="/organizationdetails"
          child="Branch"
        />
        <section class="content">
          <div class="row">
            <div class="col-12">
              <div class="box">
                <div class="box-body">
                  <ReactTableFixedColumns
                    data={this.state.branchData}
                    columns={columns}
                    striped={true}
                    pageSizeOptions={[5, 15, 20, 25]}
                    defaultPageSize={5}
                    className="table -striped -highlight"
                  />
                  <BranchView
                    data={this.state.previewData}
                    closeModal={previewCloseModal}
                    open={this.state.openModal}
                  />
                  <BranchUpdate
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
