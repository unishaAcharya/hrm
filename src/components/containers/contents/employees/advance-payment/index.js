import React, { Component } from "react";
import AdvancePaymentTable from "./display";
import AdvancePaymentForm from "./create";
import BreadCrumb from "../../commons/breadcrumb/index";

class AdvancePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_form: false,
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
          title="Employee Advance Payment"
          root="Home"
          rootUrl="/"
          parent="Employees"
          parentUrl="/employees"
          child={display_form ? "Add Advance Payment" :"View Advance Payment"}
        />

        <section className="content">
          <div className="row">
            <div className="box">
              <div className="box-header with-border">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => this.setState({ display_form: !display_form })}
                >
                  {!display_form && "Add Advance Payment "}
                  {display_form && " View Advance Payment"}
                </button>
              </div>
              {!display_form && <AdvancePaymentTable />}
              {display_form && <AdvancePaymentForm />}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AdvancePayment;
