import React, { Component } from "react";
import CreateLeave from "./create";
import Display from "./display";
import BreadCrumb from "../commons/breadcrumb/index";

export default class LeaveRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_form: false,
      display_filter: false
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
          title="Employee Leave Request"
          root="Home"
          rootUrl="/"
          parent="Employees"
          parentUrl="/employees"
          child={display_form?"Add Leave Request":"View Leave Table"}
        />
        <section className="content">
        
          <div className="row">
            <div className="box">
              <div className="box-header with-border">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    this.setState({ display_form: !this.state.display_form })
                  }
                >
                  {!display_form && "View Leave Table"}
                  {display_form && "Add Leave Request"}
                </button>
              </div>
              {this.state.display_form && <CreateLeave />}

              {!this.state.display_form && <Display />}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
