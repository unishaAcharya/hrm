import React, { Component } from "react";
import "react-table/react-table.css";
import TransferMain from "./create";
import TransferTable from "./display";
import BreadCrumb from "../../commons/breadcrumb";

class Transfer extends Component {
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
          title="Employee Transfer "
          root="Home"
          rootUrl="/"
          parent="Employees"
          parentUrl="/employees"
          child={display_form?"View Trabsfer" :"Add Transfer"}
        />
        <div className="content">
          <div className="row">
            <div className="box">
              <div className="box-header with-border">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    this.setState({ display_form: !this.state.display_form })
                  }
                >
                  {!display_form && "Add Transfer"}
                  {display_form && "View Trabsfer"}
                </button>
              </div>
              {display_form && <TransferMain />}
              {!display_form && <TransferTable />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Transfer;
