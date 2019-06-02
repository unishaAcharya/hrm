import React, { Component } from "react";
import Axios from "axios";
import Configuration from "../../../commons/configuration/server";
import Modal from "react-bootstrap-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormValidator from "../../../commons/formValidator";

export default class SubMenuUpdate extends Component {
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
        field: "menuId",
        method: "isEmpty",
        validWhen: false,
        message: "menuId is required."
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
      subMenuId: nextProps.data.subMenuId,
      subMenuName: nextProps.data.subMenuName,
      redirectUrl: nextProps.data.redirectUrl,
      menuId: nextProps.data.menuId
    });
  }
  handleUpdate = e => {
    e.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    var data = {};
    data.subMenuId = this.state.subMenuId;
    data.subMenuName = this.state.subMenuName;
    data.redirectUrl = this.state.redirectUrl;
    data.menuId = this.state.menuId;
    
    if (validation.isValid) {
      Axios({
        method: "put",
        url: `${Configuration.domain}/hrm/updateSubMenu/${
          this.state.subMenuId
        }`,
        data: data
      })
        .then(
          function(response) {
            this.props.handleUpdate(data);
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
            Branch
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate}>
            <div className="form-group updateForm">
              <label>Sub Menu Name</label>
              <div className="controls updateForm">
                <input
                  type="text"
                  name="subMenuName"
                  onChange={e => this.handleFieldChange(e)}
                  className="form-control updateForm"
                  placeholder="subMenuName"
                  value={this.state.subMenuName}
                />
              </div>
              <span className="help-block updateForm">
                {validation.subMenuName.message}
              </span>
            </div>
            <div className="form-group">
              <h5>redirectUrl</h5>
              <div className="controls">
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
            <div className="form-group updateForm">
              <h5>subMenuId</h5>
              <div className="controls updateForm">
                <input
                  name="menuId"
                  id="menuId"
                  onChange={e => this.handleFieldChange(e)}
                  type="text"
                  className="form-control updateForm"
                  placeholder="menuId"
                  value={this.state.menuId}
                />
              </div>
              <span className="help-block updateForm">
                {validation.menuId.message}
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
