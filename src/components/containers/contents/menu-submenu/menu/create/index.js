import React, { Component } from "react";
import Axios from "axios";
import FormValidator from "../../../commons/formValidator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Configuration from "../../../commons/configuration/server";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "menuName",
        method: "isEmpty",
        validWhen: false,
        message: "menu Name is required."
      },
      {
        field: "redirectUrl",
        method: "isEmpty",
        validWhen: false,
        message: "redirect Url is required."
      }
    ]);
    this.state = {
      menuName: "",
      redirectUrl: "",
      validation: this.validator.valid()
    };
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    var data = {};
    data.menuName = this.state.menuName;
    data.redirectUrl = this.state.redirectUrl;

    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/insertMainMenu`,
        data: data
      })
        .then(function(response) {
          if (response.status === 200) {
            toast.success("Success Notification !");
            this.setState({
              menuName: "",
              redirectUrl: ""
            });
          } else {
            toast.error("Error Notification !");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  };
  render() {
    let { validation } = this.state;
    return (
      <div className="box">
        <div className="box-body">
          <div className="row">
            <div className="col">
              <form>
                <div className="form-group">
                  <label>Menu Name</label>
                  <div className="controls">
                    <input
                      type="text"
                      name="menuName"
                      onChange={e => this.handleFieldChange(e)}
                      className="form-control"
                      placeholder="Menu Name"
                      value={this.state.menuName}
                    />
                  </div>
                  <span className="help-block">
                    {validation.menuName.message}
                  </span>
                </div>
                <div className="form-group">
                  <label>redirectUrl</label>
                  <div className="controls">
                    <input
                      type="text"
                      name="redirectUrl"
                      onChange={e => this.handleFieldChange(e)}
                      className="form-control"
                      placeholder="redirectUrl"
                      value={this.state.redirectUrl}
                    />
                  </div>
                  <span className="help-block">
                    {validation.redirectUrl.message}
                  </span>
                </div>

                <div className="text-xs-right">
                  <button
                    onClick={this.handleFormSubmit}
                    type="submit"
                    className="btn btn-info"
                  >
                    Submit
                  </button>
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
