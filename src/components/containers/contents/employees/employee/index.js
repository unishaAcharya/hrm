import React, { Component } from "react";
import axios from "axios";
import Configuration from "../../commons/configuration/server";
import BreadCrumb from "../../commons/breadcrumb/index";
import "react-table/react-table.css";

import CreateEmployee from "./create";
import Display from "./display";
import Filter from "./filter";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: [],
      display_form: false,
      display_filter: false,
      openFilter: false
    };
  }

  componentWillMount() {
    axios
      .get(`${Configuration.domain}/hrm/getAllEmployee`)
      .then(async res => {
        let resData = res.data;
        await this.setState({ employeeData: resData });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getFilterData = data => {
    this.setState({ employeeData: data, openFilter: false });
    console.log(this.state.employeeData);
  };

  removeEmployee = data => {
    this.setState({ employeeData: data });
  };

  hideFilterModal = () => this.setState({ openFilter: false });

  render() {
    let { display_form } = this.state;

    return (
      <div
        className="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Employee "
          root="Home"
          rootUrl="/"
          parent="Employees"
          parentUrl="/employees"
          child={!display_form?"View Employee":"Add Employee"}
        />
        <div className="row">
          <div className="col-lg-12">
            <div className="box">
              <div className="box-header with-border">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    this.setState({ display_form: !this.state.display_form })
                  }
                >
                  {!display_form && "Add Employee"}
                  {display_form && "View Employee"}
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

              {this.state.display_form && <CreateEmployee />}

              {!this.state.display_form && (
                <Display
                  posts={this.state.employeeData}
                  removeEmployee={this.removeEmployee}
                />
              )}
            </div>
          </div>
        </div>

        <Filter
          getFilterData={this.getFilterData}
          open={this.state.openFilter}
          hideFilterModal={this.hideFilterModal}
        />
      </div>
    );
  }
}

export default Main;
