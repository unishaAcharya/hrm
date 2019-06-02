import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import userImage from "../../assets/images/user5-128x128.jpg";

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      activeMenu: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/hrm/MenuDetails")
      .then(response => {
        this.setState({
          menus: response.data.content
        });
        console.log();
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleActiveMenu = clickMenu => {
    this.setState({
      activeMenu: clickMenu
    });
  };

  showSubMenu = showmenu => {
    if (this.state.activeMenu === showmenu) {
      return {
        display: "block"
      };
    } else {
      return {
        display: "none"
      };
    }
  };

  render() {
    if (this.state.menus.length === 0) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <ul className="sidebar-menu" data-widget="tree">
            <li className="user-profile treeview">
              <a href="/">
                <img src={userImage} alt="user" />
                <span>Juliya Brus</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-right pull-right" />
                </span>
              </a>
            </li>
            <li className="nav-devider" />
            <li className="header nav-small-cap">PERSONAL</li>
            <li className="active">
              <Link to="/">
                <i className="fa fa-dashboard" /> <span>Dashboard</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-right pull-right" />
                </span>
              </Link>
              <Link to="/menu">
                <i className="fa fa-dashboard" /> <span>Menu</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-right pull-right" />
                </span>
              </Link>
            </li>
            {this.state.menus.map((data, key) => (
              <li className="treeview" key={key}>
                <Link
                  to={data.redirectUrl}
                  onClick={() => this.handleActiveMenu("menu" + key)}
                >
                  <i className="fa fa-th" />
                  <span>{data.menuName}</span>
                  <span className="pull-right-container">
                    <i className="fa fa-angle-right pull-right" />
                  </span>
                </Link>
                <ul
                  className="treeview-menu"
                  style={this.showSubMenu("menu" + key)}
                >
                  {data.subMenuModel.map((subMenu, k) => (
                    <li key={k}>
                      <Link to={subMenu.redirectUrl}>
                        {subMenu.subMenuName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    );
  }
}

export default LeftSidebar;
