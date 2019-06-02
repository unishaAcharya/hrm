import React, { Component } from "react";
import axios from "axios";
import Modal from "react-bootstrap-modal";
import FormValidator from "../../../contents/commons/formValidator";
import Configuration from "../../commons/configuration/server";

class UpdatePromotion extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: "effectiveDate",
        method: "isEmpty",
        validWhen: false,
        message: "Implementation Date is required."
      },
      {
        field: "newPromotionRank",
        method: "isEmpty",
        validWhen: false,
        message: "Rank is required."
      }
    ]);

    this.state = {
      employeeId: "",
      effectiveDate: "",
      newPromotionRank: "",
      comment: "",
      promotionId: "",
      validation: this.validator.valid()
    };

    this.handleChangeFields = this.handleChangeFields.bind(this);
    this.savePromotion = this.savePromotion.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      employee:nextProps.employee,
      rank:nextProps.rank,
      employeeId: nextProps.currentPromotion.employeeId,
      effectiveDate: nextProps.currentPromotion.effectiveDate,
      newPromotionRank: nextProps.currentPromotion.newPromotionRank,
      comment: nextProps.currentPromotion.comment,
      promotionId: nextProps.currentPromotion.promotionId
    });
  }

  handleChangeFields = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  savePromotion = async e => {
    e.preventDefault();
    await this.setState({
      validation: this.validator.validate(this.state)
    });
    var data = {};
    data.employeeId = this.state.employeeId;
    data.newPromotionRank = this.state.newPromotionRank;
    data.effectiveDate = this.state.effectiveDate;
    data.comment = this.state.comment;
    data.promotionId = this.state.promotionId;

    let id = this.state.promotionId;
    if (this.state.validation.isValid) {
      axios
        .put(`${Configuration.domain}/hrm/updatePromotion/${id}`, data)
        .then(response => {
          this.props.handleUpdates(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  rankChange=e=>{
    this.setState({
      newPromotionRank:e.target.value
    })
  }
  employeeChange=e=>{
    this.setState({
      employeeId:e.target.value
    })
  }

  render() {
    let { validation } = this.state;

    return (
      <Modal
        show={this.props.open}
        onHide={this.props.closeModal}
        aria-labelledby="ModalHeader"
        className="updateForm"
      >
        <Modal.Header closeButton className="updateForm">
          <Modal.Title id="ModalHeader" className="updateForm">
            Update Promotion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form  className="updateForm">
            <div className="row updateForm">
              <div className="col-md-6 col-12 updateForm">
                <div className="form-group updateForm">
                  <label
                    htmlFor="employeeId"
                    className="updateForm col-form-label"
                  >
                    Employee ID
                  </label>
                  <select
                    type="text"
                    placeholder="Employee Id"
                    className="form-control updateForm"
                    onChange={e => this.employeeChange(e)}
                    name="employeeId"
                    value={this.state.employeeId}
                  >
                  {this.state.employee && this.state.employee.map(employee=>(
                    <option className="form-control updateForm" value={employee.empId} key={employee.empId}>
                    {employee.fullName}
                  </option>
                  ))
                    }
                </select>
                </div>
                <div className="updateForm form-group">
                  <label
                    htmlFor="implDate"
                    className="updateForm col-form-label"
                  >
                    Implementation Date
                  </label>
                  <input
                    className="updateForm form-control"
                    value={this.state.effectiveDate}
                    type="date"
                    name="effectiveDate"
                    id="implDate"
                    placeholder="Implementation Date"
                    onChange={this.handleChangeFields}
                  />
                  <span className="updateForm help-block">
                    {validation.effectiveDate.message}
                  </span>
                </div>
              </div>
              <div className="updateForm col-md-6 col-12">
                <div className="updateForm form-group">
                  <label
                    htmlFor="newRank"
                    className="updateForm col-form-label"
                  >
                    New Promotion Rank ID
                  </label>
                  <select
                    type="text"
                    placeholder="New Promotion Rank"
                    className="form-control updateForm"
                    onChange={e => this.rankChange(e)}
                    name="newPromotionRank"
                    value={this.state.newPromotionRank}
                  >
                  {this.state.rank && this.state.rank.map(rank=>(
                    <option  className="form-control updateForm"  value={rank.rankId} key={rank.rankId}>
                    {rank.rankName}
                  </option>
                  ))
                    }
                </select>
                </div>
                <div className="updateForm form-group">
                  <label
                    htmlFor="comment"
                    className="updateForm col-form-label"
                  >
                    Comment
                  </label>
                  <textarea
                    className="updateForm form-control"
                    rows="3"
                    value={this.state.comment}
                    name="comment"
                    onChange={this.handleChangeFields}
                    placeholder="More descriptions ..."
                  />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="updateForm">
          <Modal.Dismiss className="updateForm btn btn-primary btn-sm">
            Cancel
          </Modal.Dismiss>
          <button
            className="updateForm btn btn-warning btn-sm"
            onClick={this.savePromotion}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UpdatePromotion;
