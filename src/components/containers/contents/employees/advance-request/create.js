import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FormValidator from "../../../contents/commons/formValidator";
import Configuration from "../../commons/configuration/server";

class NewAdvanceRequest extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
    
      {
        field: "advanceRequestAmount",
        method: "isEmpty",
        validWhen: false,
        message: "Request amount is required."
      },
      {
          field: "advanceRequestAmount",
          method: "matches",
          args: [/^\$?[0-9]?((\.[0-9]+)|([0-9]+(\.[0-9]+)?))$/g],
          validWhen: true,
          message: "Invalid amount."
      }
    ]);

    this.state = {
      employees: [],
      employeeId: "",
      advanceRequestAmount: "",
      validation: this.validator.valid()
    };

    this.handleChangeFields = this.handleChangeFields.bind(this);
    this.saveRequests = this.saveRequests.bind(this);
  }

  componentWillMount(){
    axios.get(`${Configuration.domain}/hrm/getAllEmpIdAndFullNameOnly`)
    .then(function(res) {
      this.setState({
          employee:res.data.t,
      })
      }.bind(this))
    .catch(function(response) {
      console.log(response);
    });
  }

  handleChangeFields = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  employeeChange=e=>{
    this.setState({
      employeeId:e.target.value
    })
  }
  saveRequests = async e => {
    e.preventDefault();
    await this.setState({
      validation: this.validator.validate(this.state)
    });
    var data = {};
    data.employeeId = this.state.employeeId;
    data.advanceRequestAmount = this.state.advanceRequestAmount;

    if (this.state.validation.isValid) {
      axios
        .post(`${Configuration.domain}/hrm/registerAdvanceRequest`, data)
        .then(response => {
          console.log(data);
          if (response.status === 201) {
            toast.success("Success Promoted !");
            this.advanceRequestForm.reset();
            this.setState({
              employeeId: "",
              advanceRequestAmount: ""
            });
          } else {
            toast.error("Error Promotion !");
          }
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  };

  render() {
    let { validation } = this.state;
    return (
      <div className="box-body">
        <form ref={el => (this.advanceRequestForm = el)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="employeeId" className="col-form-label">
                  Employee ID
                </label>
                <select
                  type="text"
                  name="employeeId"
                  onChange={e => this.employeeChange(e)}
                  className="form-control"
                  placeholder="employeeId"
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
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label
                  htmlFor="advanceRequestAmount"
                  className="col-form-label"
                >
                  Request Amount
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="advanceRequestAmount"
                  id="advanceRequestAmount"
                  placeholder="eg: 123"
                  onChange={this.handleChangeFields}
                />
                <span className="help-block">
                  {validation.advanceRequestAmount.message}
                </span>
              </div>
            </div>

            <button
              onClick={this.saveRequests}
              type="submit"
              className="btn btn-success btn-sm"
              style={{ margin: "0 30px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewAdvanceRequest;
