import React, { Component } from "react";
import axios from "axios";
import Modal from "react-bootstrap-modal";
import Configuration from "../../../commons/configuration/server";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      dateFrom: "",
      dateTo: "",
      department: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  change = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    var formData = {
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo,
      department: this.state.department
    };
    axios({
      method: "post",
      url: `${Configuration.domain}/hrm/search/employee`,
      data: formData
    })
      .then(async response => {
        console.log(response.data);

        this.props.getFilterData(response.data);
        this.setState({
          firstName: "",
          middleName: "",
          lastName: "",
          phone: "",
          email: "",
          dateFrom: "",
          dateTo: "",
          department: ""
        });
      })
      .catch(function(response) {
        console.log(response);
      });
  };

  closeModal = () => {
    this.props.hideFilterModal();
  };

  render() {
    return (
      <Modal
        show={this.props.open}
        onHide={this.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">Find Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="firstName"
                  onChange={this.change}
                  value={this.state.firstName}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input
                  name="phone"
                  className="form-control"
                  placeholder="Number"
                  onChange={this.change}
                  value={this.state.phone}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <input
                  type="text"
                  name="department"
                  className="form-control"
                  placeholder="Department"
                  onChange={this.change}
                  value={this.state.department}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input
                  type="date"
                  name="dateFrom"
                  className="form-control"
                  placeholder="Date of Work Started"
                  onChange={this.change}
                  value={this.state.dateFrom}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <input
                  type="date"
                  name="dateTo"
                  className="form-control"
                  placeholder="Date Of End"
                  onChange={this.change}
                  value={this.state.dateto}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <select
                  id="inputState"
                  className="form-control"
                  onChange={this.change}
                >
                  <option>Choose...</option>
                  <option>...</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-warning btn-sm">
            Cancel
          </Modal.Dismiss>
          <button
            className="btn btn-success btn-sm"
            onClick={this.handleSubmit}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Filter;
