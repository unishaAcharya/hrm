import React, { Component } from "react";
import BreadCrumb from "../../commons/breadcrumb/index";
import AttendanceTable from "./display";
import CreateAttendance from "./create";

export default class Attendance extends Component {
  constructor() {
    super();
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
          title="Employee Attendance"
          root="Home"
          rootUrl="/"
          parent="Employees"
          parentUrl="/employees"
          child={display_form ? "View Attendance" : "Add Attendance"}
        />

        <section className="content">
          <div className="row">
            <div className="box">
              <div className="box-header with-border">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => this.setState({ display_form: !display_form })}
                >
                  {!display_form && "Add Attendance"}
                  {display_form && "View Attendance"}
                </button>
              </div>
              {!display_form && <AttendanceTable />}
              {display_form && <CreateAttendance />}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
