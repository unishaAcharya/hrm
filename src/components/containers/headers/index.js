import React, { Component } from "react";
import { Link } from "react-router-dom";

import logoLight from "../../assets/images/aries-light.png";
import logoDark from "../../assets/images/aries-dark.png";
import logoLightText from "../../assets/images/logo-light-text.png";
import logoDarkText from "../../assets/images/logo-dark-text.png";
import userImage from "../../assets/images/user5-128x128.jpg";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reset: {},
      resetProps: {},
      menus: {},
      activeMessageDropdown: false,
      activeNotificationDropdown: false,
      activeProfileDropdown: false,
      activeLeftSidebar: false,
      activeRightSidebar: false
    };
    this.showMessageDropdown = this.showMessageDropdown.bind(this);
  }

  showMessageDropdown = data => e => {
    switch (data) {
      case "message-dropdown":
        this.setState({
          activeMessageDropdown: !this.state.activeMessageDropdown,
          activeNotificationDropdown: false,
          activeProfileDropdown: false,
          activeLeftSidebar: false,
          activeRightSidebar: false
        });
        break;
      case "notification-dropdown":
        this.setState({
          activeMessageDropdown: false,
          activeNotificationDropdown: !this.state.activeNotificationDropdown,
          activeProfileDropdown: false,
          activeLeftSidebar: false,
          activeRightSidebar: false
        });
        break;
      case "profile-dropdown":
        this.setState({
          activeMessageDropdown: false,
          activeNotificationDropdown: false,
          activeProfileDropdown: !this.state.activeProfileDropdown,
          activeLeftSidebar: false,
          activeRightSidebar: false
        });
        break;
      case "left-sidebar":
        this.setState({
          activeMessageDropdown: false,
          activeNotificationDropdown: false,
          activeProfileDropdown: false,
          activeLeftSidebar: !this.state.activeLeftSidebar,
          activeRightSidebar: false
        });
        break;
      case "right-sidebar":
        this.setState({
          activeMessageDropdown: false,
          activeNotificationDropdown: false,
          activeProfileDropdown: false,
          activeLeftSidebar: false,
          activeRightSidebar: !this.state.activeRightSidebar
        });
        break;
      default:
        break;
    }
    this.setState({
      reset: e.target.className
    });
  };

  render() {
    let activeMessageDropdown = false,
      activeNotificationDropdown = false,
      activeProfileDropdown = false;

    document.body.classList.remove("sidebar-collapse", "sidebar-open");
    localStorage.setItem(
      "activeSidebar",
      "control-sidebar control-sidebar-light"
    );

    if (
      localStorage.getItem("clickContent") === this.state.reset &&
      this.state.activeMessageDropdown
    ) {
      activeMessageDropdown = true;
    } else if (
      localStorage.getItem("clickContent") === this.state.reset &&
      this.state.activeNotificationDropdown
    ) {
      activeNotificationDropdown = true;
    } else if (
      localStorage.getItem("clickContent") === this.state.reset &&
      this.state.activeProfileDropdown
    ) {
      activeProfileDropdown = true;
    } else if (
      localStorage.getItem("clickContent") === this.state.reset &&
      this.state.activeLeftSidebar
    ) {
      document.body.classList.add("sidebar-collapse", "sidebar-open");
    } else if (
      localStorage.getItem("clickContent") === this.state.reset &&
      this.state.activeRightSidebar
    ) {
      localStorage.setItem(
        "activeSidebar",
        "control-sidebar control-sidebar-light control-sidebar-open"
      );
    } else if (
      localStorage.getItem("clickContent") === this.state.reset &&
      !this.state.activeRightSidebar
    ) {
      localStorage.setItem(
        "activeSidebar",
        "control-sidebar control-sidebar-light"
      );
    }

    return (
      <header className="main-header">
        <Link to={"/"} className="logo">
          <b className="logo-mini">
            <span className="light-logo">
              <img src={logoLight} alt="logo" />
            </span>
            <span className="dark-logo">
              <img src={logoDark} alt="logo" />
            </span>
          </b>
          <span className="logo-lg">
            <img src={logoLightText} alt="logo" className="light-logo" />
            <img src={logoDarkText} alt="logo" className="dark-logo" />
          </span>
        </Link>
        <nav className="navbar navbar-static-top">
          <a
            href="#"
            onClick={this.showMessageDropdown("left-sidebar")}
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li
                className={
                  activeMessageDropdown
                    ? "dropdown messages-menu show"
                    : "dropdown messages-menu"
                }
              >
                <a
                  href="#"
                  onClick={this.showMessageDropdown("message-dropdown")}
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  aria-expanded={activeMessageDropdown}
                >
                  <i className="mdi mdi-email" />
                </a>
                <ul
                  className={
                    activeMessageDropdown
                      ? "dropdown-menu scale-up show"
                      : "dropdown-menu scale-up"
                  }
                >
                  <li className="header">You have 5 messages</li>
                  <li>
                    <ul className="menu inner-content-div">
                      <li>
                        <a href="#">
                          <div className="pull-left">
                            <img
                              src={userImage}
                              className="rounded-circle"
                              alt="User Image"
                            />
                          </div>
                          <div className="mail-contnet">
                            <h4>
                              Lorem Ipsum
                              <small>
                                <i className="fa fa-clock-o" /> 15 mins
                              </small>
                            </h4>
                            <span>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="pull-left">
                            <img
                              src={userImage}
                              className="rounded-circle"
                              alt="User Image"
                            />
                          </div>
                          <div className="mail-contnet">
                            <h4>
                              Nullam tempor
                              <small>
                                <i className="fa fa-clock-o" /> 4 hours
                              </small>
                            </h4>
                            <span>
                              Curabitur facilisis erat quis metus congue
                              viverra.
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="pull-left">
                            <img
                              src={userImage}
                              className="rounded-circle"
                              alt="User Image"
                            />
                          </div>
                          <div className="mail-contnet">
                            <h4>
                              Proin venenatis
                              <small>
                                <i className="fa fa-clock-o" /> Today
                              </small>
                            </h4>
                            <span>
                              Vestibulum nec ligula nec quam sodales rutrum sed
                              luctus.
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="pull-left">
                            <img
                              src={userImage}
                              className="rounded-circle"
                              alt="User Image"
                            />
                          </div>
                          <div className="mail-contnet">
                            <h4>
                              Praesent suscipit
                              <small>
                                <i className="fa fa-clock-o" /> Yesterday
                              </small>
                            </h4>
                            <span>
                              Curabitur quis risus aliquet, luctus arcu nec,
                              venenatis neque.
                            </span>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="pull-left">
                            <img
                              src={userImage}
                              className="rounded-circle"
                              alt="User Image"
                            />
                          </div>
                          <div className="mail-contnet">
                            <h4>
                              Donec tempor
                              <small>
                                <i className="fa fa-clock-o" /> 2 days
                              </small>
                            </h4>
                            <span>
                              Praesent vitae tellus eget nibh lacinia pretium.
                            </span>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="#">See all e-Mails</a>
                  </li>
                </ul>
              </li>
              <li
                className={
                  activeNotificationDropdown
                    ? "dropdown notifications-menu show"
                    : "dropdown notifications-menu"
                }
              >
                <a
                  href="#"
                  onClick={this.showMessageDropdown("notification-dropdown")}
                  aria-expanded={activeNotificationDropdown}
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i className="mdi mdi-bell" />
                </a>
                <ul
                  className={
                    activeNotificationDropdown
                      ? "dropdown-menu scale-up show"
                      : "dropdown-menu scale-up"
                  }
                >
                  <li className="header">You have 7 notifications</li>
                  <li>
                    <ul className="menu inner-content-div">
                      <li>
                        <a href="#">
                          <i className="fa fa-users text-aqua" /> Curabitur id
                          eros quis nunc suscipit blandit.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-warning text-yellow" /> Duis
                          malesuada justo eu sapien elementum, in semper diam
                          posuere.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-users text-red" /> Donec at nisi
                          sit amet tortor commodo porttitor pretium a erat.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-shopping-cart text-green" /> In
                          gravida mauris et nisi
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user text-red" /> Praesent eu
                          lacus in libero dictum fermentum.
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user text-red" /> Nunc fringilla
                          lorem
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-user text-red" /> Nullam euismod
                          dolor ut quam interdum, at scelerisque ipsum
                          imperdiet.
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer">
                    <a href="#">View all</a>
                  </li>
                </ul>
              </li>
              <li
                className={
                  activeProfileDropdown
                    ? "dropdown user user-menu show"
                    : "dropdown user user-menu"
                }
              >
                <a
                  href="#"
                  onClick={this.showMessageDropdown("profile-dropdown")}
                  aria-expanded={activeProfileDropdown}
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <img
                    src={userImage}
                    className="user-image rounded-circle"
                    alt="User Image"
                  />
                </a>
                <ul
                  className={
                    activeProfileDropdown
                      ? "dropdown-menu scale-up show"
                      : "dropdown-menu scale-up"
                  }
                >
                  <li className="user-header">
                    <img
                      src={userImage}
                      className="float-left rounded-circle"
                      alt="User Image"
                    />

                    <p>
                      Juliya Brus
                      <small className="mb-5">jb@gmail.com</small>
                      <a href="#" className="btn btn-danger btn-sm btn-rounded">
                        View Profile
                      </a>
                    </p>
                  </li>
                  <li className="user-body">
                    <div className="row no-gutters">
                      <div className="col-12 text-left">
                        <a href="#">
                          <i className="ion ion-person" /> My Profile
                        </a>
                      </div>
                      <div className="col-12 text-left">
                        <a href="#">
                          <i className="ion ion-email-unread" /> Inbox
                        </a>
                      </div>
                      <div className="col-12 text-left">
                        <a href="#">
                          <i className="ion ion-settings" /> Setting
                        </a>
                      </div>
                      <div role="separator" className="divider col-12" />
                      <div className="col-12 text-left">
                        <a href="#">
                          <i className="ti-settings" /> Account Setting
                        </a>
                      </div>
                      <div role="separator" className="divider col-12" />
                      <div className="col-12 text-left">
                        <a href="#">
                          <i className="fa fa-power-off" /> Logout
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  onClick={this.showMessageDropdown("right-sidebar")}
                  data-toggle="control-sidebar"
                >
                  <i className="fa fa-cog fa-spin" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
