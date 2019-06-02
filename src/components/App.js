import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./containers/headers";
import LeftSidebar from "./containers/sidebars/leftSidebar";
import RightSidebar from "./containers/sidebars/rightSidebar";
import Footer from "./containers/footers";

import Dashboard from "./containers/contents/dashboard";
import Employee from "./containers/contents/employees/employee/index";
import Transfer from "./containers/contents/employees/transfer";
import ShiftAssign from "./containers/contents/employees/shift-assign";
import OrganizationAssets from "./containers/contents/organization-assets";
import Branch from "./containers/contents/organization-assets/branch/display";
import Department from "./containers/contents/organization-assets/department/display";
import Rank from "./containers/contents/organization-assets/rank/display/index";
import SubDepartment from "./containers/contents/organization-assets/subdepartment/display";
import Promotion from "./containers/contents/employees/promotion";
import WorkShift from "./containers/contents/organization-assets/workshift/display";
import Compensation from "./containers/contents/organization-assets/compensation/display";
import LeaveRequest from "./containers/contents/leaveRequest/index";
import Leave from "./containers/contents/organization-assets/leave/display/index";
import Test from "./Test";
import DisplayAllowanceType from "./containers/contents/organization-assets/Allowance-Type/display";
import AdvanceRequest from "./containers/contents/employees/advance-request";
import LoginForm from "./containers/contents/login/login";
import MenuForm from "./containers/contents/menu-submenu";
import AdvancePayment from "./containers/contents/employees/advance-payment";
import Attendence from "./containers/contents/employees/attendance";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickContent: false
    };
  }

  resetShowContent = e => {
    if (!e.target.className.includes("updateForm"))
      this.setState({
        clickContent: !this.state.clickContent
      });
    localStorage.setItem("clickContent", e.target.className);
  };

  render() {
    return (
      <BrowserRouter>
        <div className="wrapper" onClick={this.resetShowContent}>
          <Header />
          <LeftSidebar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/employees" render={() => <Employee />} />
            <Route path="/organizationdetails" component={OrganizationAssets} />
            <Route path="/menu" component={MenuForm} />
            <Route path="/branch" component={Branch} />
            <Route path="/department" component={Department} />
            <Route path="/rank" component={Rank} />
            <Route path="/subdepartment" component={SubDepartment} />
            <Route path="/test" component={Test} />
            <Route path="/promotion" component={Promotion} />
            <Route path="/workshift" component={WorkShift} />
            <Route path="/compensation" component={Compensation} />
            <Route path="/leave" component={Leave} />
            <Route path="/leaveRequest" component={LeaveRequest} />
            <Route path="/transfer" component={Transfer} />
            <Route path="/shiftassign" component={ShiftAssign} />
            <Route path="/allowanceType" component={DisplayAllowanceType} />
            <Route path="/advanceRequest" component={AdvanceRequest} />
            <Route path="/login" component={LoginForm} />
            <Route path="/advancePayment" component={AdvancePayment} />
            <Route path="/attendence" component={Attendence}/>
          </Switch>
          <Footer />
          <RightSidebar />
          <div className="control-sidebar-bg" />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
