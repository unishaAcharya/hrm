import React, { Component } from "react";
import Menu from "./menu/create";
import SubMenu from "./submenu/create";
import DisplayMenu from "./menu/display";
import BreadCrumb from "../commons/breadcrumb/index";

export default class MenuForm extends Component {
  constructor() {
    super();
    this.state = {
      activeMenu: false,
      activeSubMenu: true,
      activeTable: false
    };
    this.handleActive = this.handleActive.bind(this);
  }

  handleActive = active => {
    switch (active) {
      case "menu":
        this.setState({
          activeMenu: true,
          activeSubMenu: false,
          activetable:false
        });
        break;
      case "submenu":
        this.setState({
          activeMenu: false,
          activeSubMenu: true,
          activetable:false
        });
        break;
        case "viewtable":
        this.setState({
          activeMenu: false,
          activeSubMenu: false,
          activetable:true
        });
        break;
      default:
        break;
    }
  };
  render() {
    let { activeMenu, activeSubMenu,activetable } = this.state;
    return (
      <div
        className="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Menu"
          root="Home"
          rootUrl="/"
          parent="menu"
          parentUrl="/menu"
          child="Menu"
        />
        <section className="content">
        <button
          className="btn btn-primary btn-sm"
          onClick={() =>
            this.setState({ activeTable: !this.state.activeTable })
          }
          style={{ marginLeft: "719px" }}
        >
          view table
        </button>

          {this.state.activeTable && (
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="nav-tabs-custom">
                  <ul className="nav nav-tabs">
                    <li>
                      <a
                        className={activeMenu ? "active" : ""}
                        onClick={() => this.handleActive("menu")}
                      >
                        Menu Form
                      </a>
                    </li>
                    <li>
                      <a
                        className={activeSubMenu ? "active" : ""}
                        onClick={() => this.handleActive("submenu")}
                      >
                        Sub Menu Form
                      </a>
                    </li>
                    <li>
                      <a
                        className={activetable ? "active" : ""}
                        onClick={() => {this.handleActive("tableView");this.setState({ activeTable: !this.state.activeTable })}}
                      >
                        View Table
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div
                      className={activeMenu ? "tab-pane active" : "tab-pane"}
                    >
                      <Menu />
                    </div>
                    <div
                      className={activeSubMenu ? "tab-pane active" : "tab-pane"}
                    >
                      <SubMenu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!this.state.activeTable && <DisplayMenu />}
        </section>
      </div>
    );
  }
}
