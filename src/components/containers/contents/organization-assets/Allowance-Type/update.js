import React, { Component } from "react";
import Modal from "react-bootstrap-modal";
import Axios from "axios";
import Configuration from "../../commons/configuration/server";
import FormValidator from "../../commons/formValidator";

class AllowanceTypeUpdate extends Component {
  constructor(props) {
    super(props);
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
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      allowanceType: nextProps.data.allowanceType,
      allowanceTypeId: nextProps.data.allowanceTypeId
    });
  }

  handleFieldChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleUpdate = async e => {
    e.preventDefault();

    var updatedata = {};
    updatedata.allowanceType = this.state.allowanceType;
    updatedata.allowanceTypeId = this.state.allowanceTypeId;

    let id = this.state.allowanceTypeId;
    Axios({
      method: "put",
      url: `${Configuration.domain}/hrm/updateAllowanceType/${id}`,
      data: updatedata
    })
      .then(function(response) {
        this.props.handleUpdate(updatedata);
      }.bind(this))
      .catch(function(err) {
        console.log(err);
      });
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
            Allowance Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form onSubmit={this.handleUpdate} className="updateForm">
            <div className="row updateForm">
              <div className="col-md-6 updateForm">
                <div className="form-group updateForm">
                  <label htmlFor="Allowance Type" className="updateForm">
                    Allowance Type
                  </label>
                  <input
                    name="allowanceType"
                    value={this.state.allowanceType}
                    onChange={e => this.handleFieldChange(e)}
                    className="form-control updateForm"
                  />
                  <span className="help-block">{validation.allowanceType.message}</span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary btn-sm updateForm">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AllowanceTypeUpdate;
