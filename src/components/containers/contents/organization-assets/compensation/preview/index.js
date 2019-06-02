import React, { Component } from "react";
import Modal from "react-bootstrap-modal";

export default class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowanceId: "",
      allowanceType: "",
      allowance: "",
      paymentType: "",
      percentage: "",
      cash: "",
      paymentFrom: "",
      unit: "",
      projectId: "",
      paymentRules: "",
      paymentSchedule: "",
      completeDate: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      allowanceId: nextProps.data.allowanceId,
      allowanceType: nextProps.allowanceType,
      allowance: nextProps.data.allowanceType,
      paymentType: nextProps.data.paymentType,
      percentage: nextProps.data.percentage,
      cash: nextProps.data.cash,
      paymentFrom: nextProps.data.paymentFrom,
      unit: nextProps.data.unit,
      projectId: nextProps.data.projectId,
      paymentRules: nextProps.data.paymentRules,
      paymentSchedule: nextProps.data.paymentSchedule,
      completeDate: nextProps.data.completeDate
    });
    if (nextProps.data.paymentType === "percentage") {
      this.setState({
        activepercentage: false,
        activeinterval: true
      });
    } else {
      this.setState({
        activepercentage: true,
        activeinterval: false
      });
    }
    if (nextProps.data.paymentType === "cash") {
      
      this.setState({
        activepercentage: true,
        activeinterval: false
      });
    } else {
      this.setState({
        activepercentage: false,
        activeinterval: true
      });
    }
  }
  render() {
    let props = this.props;
    return (
      <Modal
        show={props.open}
        onHide={props.closeModal}
        aria-labelledby="ModalHeader"
      >
        <Modal.Header closeButton>
          <Modal.Title id="ModalHeader">
            Compensation Allowance Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row ">
              <div className="col-md-6 ">
                <div className="form-group ">
                  <label>Allowance Type:</label>&nbsp;&nbsp;
                  <h6 style={{ display: "inline" }}>{this.state.allowance}</h6>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group ">
                  <label>Payment Type:</label>&nbsp;&nbsp;
                  <h6 style={{ display: "inline" }}>
                    {this.state.paymentType}
                  </h6>
                </div>
              </div>
              {!this.state.activepercentage && (
                <div className="col-md-6 ">
                  <div className="form-group">
                    <label>Percentage:</label>&nbsp;&nbsp;
                    <div className="controls ">
                      <h6 style={{ display: "inline" }}>
                        {this.state.percentage}
                      </h6>
                    </div>
                  </div>
                </div>
              )}
              {this.state.activepercentage && (
                <div className="col-md-6 ">
                  <div className="form-group ">
                    <label>Cash:</label>&nbsp;&nbsp;
                    <div className="controls ">
                      <h6 style={{ display: "inline" }}>{this.state.cash}</h6>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-6 ">
                <div className="form-group ">
                  <label>Payment From</label>
                  <div className="controls">
                    <h6 style={{ display: "inline" }}>
                      {this.state.paymentFrom}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="form-group ">
                  <label>Unit:</label>&nbsp;&nbsp;
                  <div className="controls">
                    <h6 style={{ display: "inline" }}>{this.state.unit}</h6>
                  </div>
                </div>
              </div>
              {!this.state.activepercentage && (
                <div className="col-md-6">
                  <div className="form-group ">
                    <label>Project Id:</label>&nbsp;&nbsp;
                    <div className="controls ">
                      <h6 style={{ display: "inline" }}>
                        {this.state.projectId}{" "}
                      </h6>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!this.state.activepercentage && (
              <div className="row ">
                <div className="col-md-6 ">
                  <div className="form-group ">
                    <label>Payment Schedule</label>
                    <div className="controls ">
                      <h6 style={{ display: "inline" }}>
                        {this.state.paymentSchedule}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="form-group ">
                    <label>Complete Date</label>
                    <div className="controls ">
                      <h6 style={{ display: "inline" }}>
                        {this.state.completeDate}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.state.activeinterval && (
              <div className="row ">
                <div className="col-md-6 ">
                  <div className="form-group ">
                    <label>Payment Rules</label>
                    <h6 style={{ display: "inline" }}>
                      {this.state.paymentRules}
                    </h6>
                  </div>
                </div>
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className="btn btn-info btn-sm">Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    );
  }
}
