import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-bootstrap-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormValidator from "../../../commons/formValidator";
import Configuration from "../../../commons/configuration/server";


export default class SubmenuUpdate extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "menuId",
        method: "isEmpty",
        validWhen: false,
        message: "Menu id is required."
      },
      {
        field: "menuName",
        method: "isEmpty",
        validWhen: false,
        message: "Menu Name is required."
      },
      {
        field: "redirectUrl",
        method: "isEmpty",
        validWhen: false,
        message: "redirect Url is required."
      }
    ]);
    this.state = {
      validation: this.validator.valid()
    };
  }
  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      menuId: nextProps.menu.menuId,
      menuName: nextProps.menu.menuName,
      redirectUrl: nextProps.menu.redirectUrl
    });
  }
  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    var updatedata = {};
    updatedata.menuId = this.state.menuId;
    updatedata.menuName = this.state.menuName;
    updatedata.redirectUrl = this.state.redirectUrl;

    if (validation.isValid) {
      Axios({
        method: "put",
        url: ` ${Configuration.domain}/hrm/updateMenu/${this.state.menuId}`,
        data: updatedata
      })
        .then(
          function(response) {
            this.props.handleUpdate(updatedata);
          }.bind(this)
        )
        .catch(function(response) {
          console.log(response);
        });
    }
  };

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
            Menu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate}>
            <div className="form-group updateForm">
              <label>Menu Id</label>
              <div className="controls updateForm">
                <input
                  type="text"
                  name="menuId"
                  onChange={e => this.handleFieldChange(e)}
                  className="form-control updateForm"
                  placeholder="menuId"
                  value={this.state.menuId}
                />
              </div>
              <span className="help-block updateForm">
                {validation.menuId.message}
              </span>
            </div>
            <div className="form-group updateForm">
              <label>Menu Name</label>
              <div className="controls updateForm">
                <input
                  type="text"
                  name="menuName"
                  onChange={e => this.handleFieldChange(e)}
                  className="form-control updateForm"
                  placeholder="Menu Name"
                  value={this.state.menuName}
                />
              </div>
              <span className="help-block updateForm">
                {validation.menuName.message}
              </span>
            </div>
            <div className="form-group updateForm">
              <h5>redirectUrl</h5>
              <div className="controls updateForm">
                <input
                  type="text"
                  name="redirectUrl"
                  onChange={e => this.handleFieldChange(e)}
                  className="form-control updateForm"
                  placeholder="redirectUrl"
                  value={this.state.redirectUrl}
                />
              </div>
              <span className="help-block updateForm">
                {validation.redirectUrl.message}
              </span>
            </div>
            <div className="text-xs-right updateForm">
              <button
                onClick={this.handleFormSubmit}
                type="submit"
                className="btn btn-info updateForm"
              >
                Submit
              </button>
            </div>
            <ToastContainer />
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}
