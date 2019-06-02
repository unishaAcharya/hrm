import React, { Component } from "react";
import BreadCrumb from "../commons/breadcrumb/index";
import Branch from "./branch/create";
import Department from "./department/create";
import SubDepartment from "./subdepartment/create";
import Rank from "./rank/create";
import WorkShift from "./workshift/create";
import CompensationAllowance from "./compensation/create/index";
import Leave from "./leave/create";
import AllowanceTypeCreate from "./Allowance-Type/create";

export default class PageContent extends Component {
  constructor() {
    super();
    this.state = {
      activeRank: false,
      activeBranch: true,
      activeDepartment: false,
      activeSubDepartment: false,
      activeWorkShift: false,
      activeCompensation: false,
      activeLeave: false,
      activeAllowanceType: false,
      activeAllowanceType: false
    };
    this.handleActive = this.handleActive.bind(this);
  }

  handleActive = active => {
    switch (active) {
      case "branch":
        this.setState({
          activeRank: false,
          activeBranch: true,
          activeDepartment: false,
          activeSubDepartment: false,
          activeWorkShift: false,
          activeCompensation: false,
          activeLeave: false,
          activeAllowanceType: false
        });
        break;
      case "department":
        this.setState({
          activeRank: false,
          activeBranch: false,
          activeDepartment: true,
          activeSubDepartment: false,
          activeWorkShift: false,
          activeCompensation: false,
          activeLeave: false,
          activeAllowanceType: false
        });
        break;
      case "rank":
        this.setState({
          activeRank: true,
          activeBranch: false,
          activeDepartment: false,
          activeSubDepartment: false,
          activeWorkShift: false,
          activeCompensation: false,
          activeLeave: false,
          activeAllowanceType: false
        });
        break;
      case "subDepartment":
        this.setState({
          activeRank: false,
          activeBranch: false,
          activeDepartment: false,
          activeSubDepartment: true,
          activeWorkShift: false,
          activeCompensation: false,
          activeLeave: false,
          activeAllowanceType: false
        });
        break;
      case "workshift":
        this.setState({
          activeRank: false,
          activeBranch: false,
          activeDepartment: false,
          activeSubDepartment: false,
          activeWorkShift: true,
          activeCompensation: false,
          activeLeave: false,
          activeAllowanceType: false
        });
        break;
      case "compensation":
        this.setState({
          activeRank: false,
          activeBranch: false,
          activeDepartment: false,
          activeSubDepartment: false,
          activeWorkShift: false,
          activeCompensation: true,
          activeLeave: false,
          activeAllowanceType: false
        });
        break;
      case "leave":
        this.setState({
          activeRank: false,
          activeBranch: false,
          activeDepartment: false,
          activeSubDepartment: false,
          activeWorkShift: false,
          activeCompensation: false,
          activeAllowanceType: false,
          activeLeave: true
        });
        break;
      case "AllowanceType":
        this.setState({
          activeRank: false,
          activeBranch: false,
          activeDepartment: false,
          activeSubDepartment: false,
          activeWorkShift: false,
          activeCompensation: false,
          activeLeave: false,
          activeAllowanceType: true
        });
      default:
        break;
    }
  };

  render() {
    let {
      activeBranch,
      activeDepartment,
      activeRank,
      activeSubDepartment,
      activeWorkShift,
      activeCompensation,
      activeLeave,
      activeAllowanceType
    } = this.state;

    return (
      <div
        className="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Organization Details"
          root="Home"
          rootUrl="/"
          parent="Organization Asset"
          parentUrl="/organizationdetails"
          child="Organization Details"
        />
        <section className="content">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs">
                  <li>
                    <a
                      className={activeBranch ? "active" : ""}
                      onClick={() => this.handleActive("branch")}
                    >
                      Branch 
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeDepartment ? "active" : ""}
                      onClick={() => this.handleActive("department")}
                    >
                      Department
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeRank ? "active" : ""}
                      onClick={() => this.handleActive("rank")}
                    >
                      Rank
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeSubDepartment ? "active" : ""}
                      onClick={() => this.handleActive("subDepartment")}
                    >
                      Sub Department
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeWorkShift ? "active" : ""}
                      onClick={() => this.handleActive("workshift")}
                    >
                      Work Shift
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeCompensation ? "active" : ""}
                      onClick={() => this.handleActive("compensation")}
                    >
                      CompensationAllowance
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeLeave ? "active" : ""}
                      onClick={() => this.handleActive("leave")}
                    >
                      Leave
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeAllowanceType ? "active" : ""}
                      onClick={() => this.handleActive("AllowanceType")}
                    >
                      AllowanceType
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className={activeRank ? "tab-pane active" : "tab-pane"}>
                    <Rank />
                  </div>
                  <div
                    className={activeBranch ? "tab-pane active" : "tab-pane"}
                  >
                    <Branch />
                  </div>
                  <div
                    className={
                      activeDepartment ? "tab-pane active" : "tab-pane"
                    }
                  >
                    <Department />
                  </div>
                  <div
                    className={
                      activeSubDepartment ? "tab-pane active" : "tab-pane"
                    }
                  >
                    <SubDepartment />
                  </div>
                  <div
                    className={activeWorkShift ? "tab-pane active" : "tab-pane"}
                  >
                    <WorkShift />
                  </div>
                  <div
                    className={
                      activeCompensation ? "tab-pane active" : "tab-pane"
                    }
                  >
                    <CompensationAllowance />
                  </div>
                  <div className={activeLeave ? "tab-pane active" : "tab-pane"}>
                    <Leave />
                  </div>
                  <div
                    className={
                      activeAllowanceType ? "tab-pane active" : "tab-pane"
                    }
                  >
                    <AllowanceTypeCreate />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
