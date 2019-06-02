import React, { Component } from "react";
import FormValidator from "../../../commons/formValidator";
import axios from "axios";
import { toast } from "react-toastify";
import Configuration from "../../../commons/configuration/server";
import helpers from "../../../commons/helper";
import Modal from "react-bootstrap-modal";

class UpdateWorkshift extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: "workshiftType",
        method: "isEmpty",
        validWhen: false,
        message: "Workshift name is requried."
      },
      {
        field: "workshiftType",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "workshiftStartTime",
        method: "isEmpty",
        validWhen: false,
        message: "Workshift start time is required."
      },
      {
        field: "workshiftEndTime",
        method: "isEmpty",
        validWhen: false,
        message: "Workshift end time is required."
      }
    ]);
    this.overTimeValidator = new FormValidator([
      {
        field: "overtimeMinutes",
        method: "isEmpty",
        validWhen: false,
        message: "Over time is requried"
      }
    ]);
    this.state = {
      workshiftType: "",
      workshiftStartTime: "",
      workshiftEndTime: "",
      isOvertimeApplicable: "",
      overtimeMinutes: "",
      workshiftId: "",
      displayOverTime: false,
      validation: this.validator.valid(),
      overTimeValidator: this.overTimeValidator.valid()
    };

    this.changeFields = this.changeFields.bind(this);
    this.saveWorkShift = this.saveWorkShift.bind(this);
  }

  componentWillMount() {
    this.setState({
      workshiftId: this.props.currentWorkShift.workshiftId,
      workshiftType: this.props.currentWorkShift.workshiftType,
      workshiftStartTime: helpers.convertTo24Hours(
        this.props.currentWorkShift.workshiftStartTime
      ),
      workshiftEndTime: helpers.convertTo24Hours(
        this.props.currentWorkShift.workshiftEndTime
      ),
      isOvertimeApplicable: this.props.currentWorkShift.isOvertimeApplicable,
      overtimeMinutes: this.props.currentWorkShift.overtimeMinutes
    });

    if (this.props.currentWorkShift.isOvertimeApplicable === "yes") {
      this.setState({
        displayOverTime: true
      });
    } else {
      this.setState({
        displayOverTime: false
      });
    }
  }

  changeFields = async e => {
    await this.setState({
      [e.target.name]: e.target.value
    });
    if (this.state.isOvertimeApplicable === "yes") {
      this.setState({
        displayOverTime: true
      });
    } else {
      this.setState({
        displayOverTime: false
      });
    }
  };

  saveWorkShift = async event => {
    event.preventDefault();

    var data = {};
    data.workshiftType = this.state.workshiftType;
    data.workshiftStartTime = this.state.workshiftStartTime;
    data.workshiftEndTime = this.state.workshiftEndTime;
    data.isOvertimeApplicable = this.state.isOvertimeApplicable;
    data.overtimeMinutes = this.state.overtimeMinutes;
    data.workshiftId = this.state.workshiftId;

    if (this.state.displayOverTime) {
      const validation = this.validator.validate(data);
      var overTimedata = {};
      overTimedata.overtimeMinutes = this.state.overtimeMinutes;
      const overTimeValidator = this.overTimeValidator.validate(overTimedata);
      await this.setState({ validation, overTimeValidator });
    } else {
      const validation = this.validator.validate(data);
      await this.setState({ validation });
    }

    if (this.state.validation.isValid) {
      data.workshiftStartTime = helpers.convertTo12Hours(
        this.state.workshiftStartTime
      );
      data.workshiftEndTime = helpers.convertTo12Hours(
        this.state.workshiftEndTime
      );

      axios
        .put(
          `${Configuration.domain}/hrm/updateWorkShift/${
            this.state.workshiftId
          }`,
          data
        )
        .then(response => {
          if (response.status === 200) {
            toast.success("Success Updated !");
            this.props.handleUpdates(data);
            // this.workshiftForm.reset();

            // this.setState({
            //     workshiftType: "",
            //     workshiftStartTime: "",
            //     workshiftEndTime: "",
            //     isOvertimeApplicable: "no",
            //     overtimeMinutes: "",
            //     displayOverTime: false,
            // })
          } else {
            toast.error("Something wents wrong !");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    let { validation, overTimeValidator } = this.state;

    return (
      <Modal
        show={this.props.open}
        onHide={this.props.closeModal}
        aria-labelledby="ModalHeader"
        className="updateForm"
      >
        <Modal.Header closeButton className="updateForm">
          <Modal.Title id="ModalHeader" className="updateForm">
            Update Workshift
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="updateForm">
          <form ref={el => (this.workshiftForm = el)}>
            <div className="form-group updateForm">
              <div className="controls updateForm">
                <label>Work Shift Name</label>
                <input
                  name="workshiftType"
                  onChange={e => this.changeFields(e)}
                  type="text"
                  value={this.state.workshiftType}
                  className="form-control updateForm"
                  placeholder="Work Shift Name"
                />
              </div>
              <span className="help-block updateForm">
                {validation.workshiftType.message}
              </span>
            </div>
            <div className="form-group updateForm">
              <div className="controls updateForm">
                <label>Start Time:</label>
                <input
                  name="workshiftStartTime"
                  onChange={e => this.changeFields(e)}
                  type="time"
                  value={this.state.workshiftStartTime}
                  className="form-control updateForm"
                  placeholder="Shift Start Time"
                />
              </div>
              <span className="help-block updateForm">
                {validation.workshiftStartTime.message}
              </span>
            </div>
            <div className="form-group updateForm">
              <div className="controls updateForm">
                <label>End Time</label>
                <input
                  name="workshiftEndTime"
                  onChange={e => this.changeFields(e)}
                  value={this.state.workshiftEndTime}
                  type="time"
                  className="form-control updateForm"
                  placeholder="Shift End Time"
                />
              </div>
              <span className="help-block">
                {validation.workshiftEndTime.message}
              </span>
            </div>
            <div className="form-group updateForm">
              <div className="controls updateForm">
                <label>Is Overtime available??</label>
                <select
                  className="form-control updateForm"
                  onChange={e => this.changeFields(e)}
                  name="isOvertimeApplicable"
                  value={this.state.isOvertimeApplicable}
                >
                  <option value="no"> No</option>
                  <option value="yes"> Yes</option>
                </select>
              </div>
            </div>
            {this.state.displayOverTime ? (
              <div className="form-group updateForm">
                <div className="controls updateForm">
                  <label>Overtime Duration</label>
                  <input
                    name="overtimeMinutes"
                    onChange={e => this.changeFields(e)}
                    type="text"
                    value={this.state.overtimeMinutes}
                    className="form-control updateForm"
                    placeholder="Overtime Duration (in minutes)"
                  />
                </div>
                <span className="help-block updateForm">
                  {overTimeValidator.overtimeMinutes.message}
                </span>
              </div>
            ) : (
              ""
            )}
          </form>
        </Modal.Body>
        <Modal.Footer className="updateForm">
          <Modal.Dismiss className="updateForm btn btn-primary btn-sm">
            Cancel
          </Modal.Dismiss>
          <button
            className="updateForm btn btn-warning btn-sm"
            onClick={this.saveWorkShift}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default UpdateWorkshift;
