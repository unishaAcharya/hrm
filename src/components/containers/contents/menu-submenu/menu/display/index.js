import React, { Component } from "react";
import ReactTable from "react-table";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import "react-table/react-table.css";
import swal from "sweetalert";
import DisplaySubMenu from "../../submenu/display";
import Preview from "../preview";
import UpdateMenu from "../update";
import { connect } from 'react-redux'
import { updatemenu,getMenu} from '../../../../../../actions';
import "react-table-hoc-fixed-columns/lib/styles.css";
import withFixedColumns from "react-table-hoc-fixed-columns";

const ReactTableFixedColumns = withFixedColumns(ReactTable);
 class MenuDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      showmenu: false,
      previewData: {},
      update: {},
      open: false
    };
  }
  componentWillMount() {
  //  this.props.getMenu();
    Axios.get(`${Configuration.domain}/hrm/MenuDetails`)
      .then(res => {
        let data = res.data.content;
        this.setState({
          menu: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  preview = data => {
    this.setState({
      previewData: data,
      showmenu: true
    });
  };
  updateView = data => {
    this.setState({
      update: data,
      open: true
    });
  };
  handleUpdate=(update_menu)=> {
    this.props.handleUpdate(update_menu)
   let data = this.state.menu.filter(updatedata => {
      if (updatedata.menuId === update_menu.menuId) {
        updatedata.menuName = update_menu.menuName;
        updatedata.redirectUrl = update_menu.redirectUrl;
      }
      return updatedata;
    });
    this.setState({
      menu: data,
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
        url: `${Configuration.domain}/hrm/deleteMenu/${id}`
      })
        .then(async res => {
          if (res.status == 200) {
            let delet = this.state.menu.filter(data => {
              if (id !== data.menuId) {
                return data;
              }
            });
            await this.setState({
              menu: delet
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
        Header: "Menu Id",
        accessor: "menuId",
        fixed: "left"
      },
      {
        Header: "Menu Name",
        accessor: "menuName"
      },
      {
        Header: "redirectUrl",
        accessor: "redirectUrl"
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
                  this.handleDelete(post.original.menuId, post.original);
                }}
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
              className="btn btn-info"
              data-placement="top"
              title="edit"
              onClick={() => this.updateView(post.original)}
              >
              <span className="mdi mdi-eye" />
              </button>
              <button
                className="btn btn-success"
                data-placement="top"
                title="view"
                onClick={() => this.preview(post.original)}>
                <span className="mdi mdi-eye" />
              </button>
            </div>
          );
        },
        width: 200
      }
    ];
    let closeModal = () => this.setState({ showmenu: false });
    let previewCloseModal = () => this.setState({ open: false });
    return (
      <div class="box">
      <div>
        <button
          className="btn btn-primary btn-sm"
          style={{ width: "183px" }}
          onClick={() =>
            this.setState({ showSubmenu: !this.state.showSubmenu })
          }
        >

          {this.state.showSubmenu && (
            <h6 class="box-title"> View Sub Menu Table </h6>
          )}
          {!this.state.showSubmenu && (
            <h6 class="box-title"> View Menu Table </h6>
          )}
        </button>

        </div>
        <div class="box-header with-border">
          {this.state.showSubmenu && <h6 class="box-title">Menu Table </h6>}
          {!this.state.showSubmenu && (
            <h6 class="box-title">Sub Menu Table </h6>
          )}
        </div>

        {this.state.showSubmenu && (
          <div class="box-body">
            <ReactTable
              data={this.state.menu}
              columns={columns}
              striped={true}
              pageSizeOptions={[5, 15, 20, 25]}
              defaultPageSize={5}
              className="table -striped -highlight"
            />
            <Preview
              data={this.state.previewData}
              open={this.state.showmenu}
              closeModal={closeModal}
            />
            <UpdateMenu
              menu={this.state.update}
              open={this.state.open}
              closeModal={previewCloseModal}
              handleUpdate={this.handleUpdate}
            />
          </div>
        )}
        {!this.state.showSubmenu && <DisplaySubMenu />}
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    menu:state.menu
  }

}
const mapDispatchToProps=(dispatch,ownProps)=>{
  return{
    handleUpdate:(menu)=>dispatch(updatemenu(menu))
    /*menu:(getmenu)=>dispatch(getMenu(menu))*/

  }
}
export default connect(mapStateToProps,mapDispatchToProps)( MenuDetails);
