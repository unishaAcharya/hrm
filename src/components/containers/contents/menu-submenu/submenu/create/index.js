import React, { Component } from "react";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import FormValidator from "../../../commons/formValidator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class SubMenu extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "subMenuName",
        method: "isEmpty",
        validWhen: false,
        message: "subMenuName is required."
      },
      {
        field: "redirectUrl",
        method: "isEmpty",
        validWhen: false,
        message: "redirect Url is required."
      },
      {
        field: "menuModel",
        method: "isEmpty",
        validWhen: false,
        message: "menu Model is required."
      }
    ]);
    this.state = {
      subMenuName: "",
      redirectUrl: "",
      menuModel: "",
      validation: this.validator.valid()
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
    data.subMenuName = this.state.subMenuName;
    data.redirectUrl = this.state.redirectUrl;
    data.menuModel = this.state.menuModel;

    if (validation.isValid) {
      Axios({
        method: "post",
        url: `${Configuration.domain}/hrm/insertSubMenu/${
          this.state.menuModel
        }`,
        data: data
      })
        .then(
          function(response) {
            if (response.status === 200) {
              toast.success("Success Notification !");
              this.setState({
                subMenuName: "",
                redirectUrl: "",
                menuModel: ""
              });
            } else {
              toast.error("Error Notification !");
            }
          }.bind(this)
        )
        .catch(function(response) {});
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
                  <label>Menu Model</label>
                  <div className="controls">
                    <input
                      type="text"
                      name="menuModel"
                      onChange={e => this.handleFieldChange(e)}
                      className="form-control"
                      placeholder="Menu Id"
                      value={this.state.menuModel}
                    />
                  </div>
                  <span className="help-block">
                    {validation.menuModel.message}
                  </span>
                </div>
                <div className="form-group">
                  <h5>redirectUrl</h5>
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
                <div className="form-group">
                  <h5>sub Menu Name</h5>
                  <div className="controls">
                    <input
                      name="subMenuName"
                      id="subMenuName"
                      onChange={e => this.handleFieldChange(e)}
                      type="text"
                      className="form-control"
                      placeholder="sub Menu Name"
                      value={this.state.subMenuName}
                    />
                  </div>
                  <span className="help-block">
                    {validation.subMenuName.message}
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
