import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import FormValidator from "../../../contents/commons/formValidator";
import Configuration from "../../commons/configuration/server";

class NewPromotion extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: "employeeId",
        method: "isEmpty",
        validWhen: false,
        message: "Employee ID is required."
      },
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
      employee:[],
      rank:[],
      employeeId: "",
      effectiveDate: "",
      newPromotionRank: "",
      comment: "",
      validation: this.validator.valid()
    };

    this.handleChangeFields = this.handleChangeFields.bind(this);
    this.savePromotion = this.savePromotion.bind(this);
  }

  componentWillMount(){
    axios.get(`${Configuration.domain}/hrm//getAllRankIdAndNameOnly`)
    .then(res=>{
      axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
        .then(response => {
          console.log(response);
          console.log(res);
          this.setState({
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
    console.log(data);

    data.employeeId = this.state.employeeId;
    data.newPromotionRank = this.state.newPromotionRank;
    data.effectiveDate = this.state.effectiveDate;
    data.comment = this.state.comment;

    if (this.state.validation.isValid) {
      axios
        .post(`${Configuration.domain}/hrm/registerPromotion`, data)
        .then(response => {
          console.log(response);

          if (response.status === 201) {
            toast.success("Success Promoted !");
            this.promotionForm.reset();
            this.setState({
              employeeId: "",
              effectiveDate: "",
              newPromotionRank: "",
              comment: ""
            });
          } else {
            toast.error("Error Promotion !");
          }
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
      <div className="box-body">
        <form ref={el => (this.promotionForm = el)}>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="employeeId" className="col-form-label">
                  Employee ID
                </label>
                <select
                  type="text"
                  placeholder="Employee Id"
                  className="form-control"
                  onChange={e => this.employeeChange(e)}
                  name="employeeId"
                  value={this.state.employeeId}
                >
                {this.state.employee && this.state.employee.map(employee=>(
                  <option value={employee.empId} key={employee.empId}>
                  {employee.fullName}
                </option>
                ))
                  }
              </select>
              </div>
              <div className="form-group">
                <label htmlFor="implDate" className="col-form-label">
                  Implementation Date
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="effectiveDate"
                  id="implDate"
                  placeholder="Implementation Date"
                  onChange={this.handleChangeFields}
                />
                <span className="help-block">
                  {validation.effectiveDate.message}
                </span>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="newRank" className="col-form-label">
                  New Promotion Rank ID
                </label>
                <select
                  type="text"
                  placeholder="New Promotion Rank"
                  className="form-control"
                  onChange={e => this.rankChange(e)}
                  name="newPromotionRank"
                  value={this.state.newPromotionRank}
                >
                {this.state.rank && this.state.rank.map(rank=>(
                  <option value={rank.rankId} key={rank.rankId}>
                  {rank.rankName}
                </option>
                ))
                  }
              </select>
              </div>
              <div className="form-group">
                <label htmlFor="comment" className="col-form-label">
                  Comment
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="comment"
                  onChange={this.handleChangeFields}
                  placeholder="More descriptions ..."
                />
              </div>
            </div>
            <button
              onClick={this.savePromotion}
              type="submit"
              className="btn btn-success btn-sm"
              style={{ margin: "0 30px" }}
            >
              Submit
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    );
  }
}

export default NewPromotion;
