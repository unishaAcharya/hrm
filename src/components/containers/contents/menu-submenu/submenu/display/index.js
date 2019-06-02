import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import "react-table/react-table.css";
import swal from "sweetalert";
import Preview from "../preview";
import UpdateSubmenu from "../update";
import withFixedColumns from "react-table-hoc-fixed-columns";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
export default class BranchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submenu: [],
      previewData: {},
      editview: {},
      openModalPreview: false,
      open: false
    };
  }
  componentWillMount() {
    Axios.get(`${Configuration.domain}/hrm/getAllSubMenu`)
      .then(res => {
        let data = res.data.t;
        console.log(data);
        this.setState({
          submenu: data
        });
      })
      .catch(err => {
        console.log(err +"11");
      });
  }
  preview = data => {
    this.setState({
      previewData: data,
      openModalPreview: true
    });
  };
  UpdateView = data => {
    this.setState({
      editview: data,
      open: true
    });
  };
  handleUpdate(update_submenu) {
    let data = this.state.submenu.filter(updatedata => {
      if (updatedata.subMenuId === update_submenu.subMenuId) {
        updatedata.subMenuName = update_submenu.subMenuName;
        updatedata.redirectUrl = update_submenu.redirectUrl;
      }
      return updatedata;
    });
    this.setState({
      submenu: data,
      open: false
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
        url: `${Configuration.domain}/hrm/deleteSubMenu/${id}`
      })
        .then(async res => {
          if (res.status == 200) {
            let delet = this.state.submenu.filter(data => {
              if (id !== data.subMenuId) {
                return data;
              }
            });
            await this.setState({
              submenu: delet
            });
          }
        })
        .catch(function(response) {
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
        Cell: row => row.index + 1

      },
      {
        Header: "subMenuId",
        accessor: "subMenuId",
        fixed: "left"
      },
      {
        Header: "subMenuName",
        accessor: "subMenuName",
        fixed: "left"
      },
      {
        Header: "redirectUrl",
        accessor: "redirectUrl"
      },
      {
        Header: "menuId",
        accessor: "menuId"
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
                  this.handleDelete(post.original.subMenuId, post.original);
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
            </div>
          );
        },
        width: 200
      }
    ];
    let closeModal = () => this.setState({ open: false });
    let closeModalPreview = () => this.setState({ openModalPreview: false });

    return (
      <div class="box-body">
        <ReactTable
          data={this.state.submenu}
          columns={columns}
          striped={true}
          pageSizeOptions={[5, 15, 20, 25]}
          defaultPageSize={5}
          className="table -striped -highlight"
        />
        <Preview
          data={this.state.previewData}
          open={this.state.openModalPreview}
          closeModal={closeModalPreview}
        />
        <UpdateSubmenu
          data={this.state.editview}
          open={this.state.open}
          closeModal={closeModal}
          handleUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}
