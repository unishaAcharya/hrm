import React, { Component } from "react";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Configuration from "../../commons/configuration/server";
import FormValidator from "../../commons/formValidator";

class AllowanceTypeCreate extends Component {
  constructor() {
    super();
      this.validator = new FormValidator([
        {
          field: "allowanceType",
          method: "isEmpty",
          validWhen: false,
          message: "Allowance Type is required."
        },
        {
          field: "allowanceType",
          method: "matches",
          args: [(/^[a-zA-Z ]*$/)],
          validWhen: true,
          message: "Only Alphabetic"
        }
      ])
    this.state = {
      allowanceType: "",
      validation: this.validator.valid()
    };
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  // For Form Submit
  handleSubmit = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    var updatedata = {};
    updatedata.allowanceType = this.state.allowanceType;

    if (validation.isValid) {
    Axios({
      method: "post",
      url: `${Configuration.domain}/hrm/registerAllowanceType`,
      data: updatedata
    })
      .then(function(response) {
        if (response.status === 201) {

          this.setState({
            allowanceType: ""
          });
          toast.success("Success Notification !");
        } else {
          toast.success("Error Notification !");
        }
      }.bind(this))
      .catch(function(response) {
        console.log(response);
      });
    }
  };

  render() {
    let { validation } = this.state;
    return (
      <div className="box-body">
        <form action="">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="AllowanceType">Allowance Type</label>
                <input
                  id="AllowanceType"
                  name="allowanceType"
                  value={this.state.allowanceType}
                  onChange={e => this.handleFieldChange(e)}
                  className="form-control"
                />
                <span className="help-block">{validation.allowanceType.message}</span>
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    );
  }
}

export default AllowanceTypeCreate;
