import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewAdvanceRequest from "./create";
import ShowAdvanceRequest from "./display";
import BreadCrumb from "../../commons/breadcrumb";

class AdvanceRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display_form: false,
      display_filter: false,
      openFilter: false
    };
  }

  render() {
    let { display_form } = this.state;
    var child=display_form
    if (!display_form){
      child="Add Request"
    }else{
      child="View Request"
    }

    return (
      <div
        className="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Employee Advance Request"
          root="Home"
          rootUrl="/"
          parent="Employees"
          parentUrl="/employees"
          child={child}
        />

        <section className="content">
          <div className="box">
            <div className="box-header with-border">
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  this.setState({ display_form: !this.state.display_form })
                }
              >
                {!display_form && "New Request"}
                {display_form && "View Requests"}
              </button>
              {!display_form && (
                <button
                  className="btn btn-info btn-sm"
                  style={{ margin: "0 30px" }}
                  onClick={e => this.setState({ openFilter: true })}
                >
                  Filter
                </button>
              )}
            </div>
            {this.state.display_form && <NewAdvanceRequest />}

            {!this.state.display_form && <ShowAdvanceRequest />}
          </div>
        </section>
        <ToastContainer />
      </div>
    );
  }
}

export default AdvanceRequest;
