import React, { Component } from "react";
import ShiftTable from "./display";
import ShiftForm from "./create";
import BreadCrumb from "../../commons/breadcrumb";

class ShiftAssign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_form: false
    };
  }
  render() {
    let { display_form } = this.state;
    return (
      <div
        className="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Employee Shift Assing"
          root="Home"
          rootUrl="/"
          parent="Employees"
          parentUrl="/employees"
          child="Shift Assign"
        />
        <section className="content">
          <div className="row">
            <div className="box">
              <div className="box-header with-border">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => this.setState({ display_form: !display_form })}
                >
                  {!display_form && "Add Shift Assign "}
                  {display_form && " View Shift Assign"}
                </button>
              </div>
              {!display_form && <ShiftTable />}
              {display_form && <ShiftForm />}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ShiftAssign;
