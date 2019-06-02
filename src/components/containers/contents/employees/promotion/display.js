import React, { Component } from "react";
import ReactTable from "react-table";
import swal from "sweetalert";
import axios from "axios";
import withFixedColumns from "react-table-hoc-fixed-columns";
import Preview from "./preview";
import UpdatePromotion from "./update";
import Configuration from "../../commons/configuration/server";
import { ToastContainer, toast } from "react-toastify";
import "react-table/react-table.css";
import "react-table-hoc-fixed-columns/lib/styles.css";
import "react-toastify/dist/ReactToastify.min.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

export default class PromotionLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: [],
      currentPromotion: {},
      open: false,
      openPreviewModal: false,
      employee:[],
      rank:[]
    };
    this.displayPromotion = this.displayPromotion.bind(this);
    this.hidePreviewModal = this.hidePreviewModal.bind(this);
  }

  displayPromotion = data => {
    this.setState({
      currentPromotion: data,
      openPreviewModal: true
    });
  };

  componentWillMount() {
    axios
      .get(`${Configuration.domain}/hrm/getAllPromotion`)
      .then(response => {
        let data = response.data;
        this.setState({ promotions: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  hidePreviewModal = () => this.setState({ openPreviewModal: false });

  removePromotion = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this row",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(confirm => {
      if (confirm) {
        axios
          .delete(`${Configuration.domain}/hrm/deletePromotion/${id}`)
          .then(async res => {
            if (res.status === 200) {
              let promotion = this.state.promotions.filter(promotion => {
                if (id !== promotion.promotionId) {
                  return promotion;
                }
              });
              this.setState({
                promotions: promotion
              });
              this.props.removePromotion(this.state.promotions);
              toast.success("Delete Successfully!");
            } else {
              toast.error("Error Notification !");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  updatePromotion = currentPromotion => {
    axios.get(`${Configuration.domain}/hrm/getAllRankIdAndNameOnly`)
    .then(res=>{
      axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
        .then(response => {
          this.setState({
            currentPromotion,
            open: true,
            employee:response.data.t,
            rank:res.data.t
          })
        })
        .catch(err => {
          console.log(err);
        });
    }).catch(err=>{
      console.log(err);
    })
  };

  handleUpdates = currentPromotion => {
    let promotion = this.state.promotions.filter(promotion => {
      if (currentPromotion.promotionId === promotion.promotionId) {
        promotion.employeeId = currentPromotion.employeeId;
        promotion.newPromotionRank = currentPromotion.newPromotionRank;
        promotion.effectiveDate = currentPromotion.effectiveDate;
        promotion.comment = currentPromotion.comment;
      }
      return promotion;
    });
    this.setState({
      promotions: promotion,
      open: false
    });
    this.props.removePromotion(this.state.promotions);
    toast.success("Update  Successfully!");
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
        Header: "Promotion Rank",
        accessor: "newPromotionRank"
      },
      {
        Header: "Implementation Date",
        accessor: "effectiveDate"
      },
      {
        Header: "Comment",
        accessor: "comment"
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
                onClick={() => this.removePromotion(data.original.promotionId)}
              >
                <span className="mdi mdi-delete" />
              </button>
              <button
              className="btn btn-info"
              data-placement="top"
              title="edit"
              onClick={() => this.updatePromotion(data.original)}>
                <span className="mdi mdi-table-edit" />
              </button>
              <button
                className="btn btn-success"
                data-placement="top"
                title="view"
                onClick={() => this.displayPromotion(data.original)}
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

    let updateComponent = "";
    if (this.state.currentPromotion) {
      updateComponent = (
        <UpdatePromotion
          currentPromotion={this.state.currentPromotion}
          handleUpdates={this.handleUpdates}
          closeModal={this.closeModal}
          open={this.state.open}
          saveAndClose={this.saveAndClose}
          employee={this.state.employee}
          rank={this.state.rank}
        />
      );
    }

    return (
      <div className="box-body">
        <ReactTableFixedColumns
          data={this.state.promotions}
          columns={columns}
          striped={true}
          pageSizeOptions={[5, 15, 20, 25]}
          defaultPageSize={5}
          className="table -striped -highlight"
        />
        {updateComponent}
        <Preview
          currentPromotion={this.state.currentPromotion}
          open={this.state.openPreviewModal}
          hidePreviewModal={this.hidePreviewModal}
        />
      </div>
    );
  }
}
