import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import NewPromotion from "./create";
import PromotionShow from "./display";
import BreadCrumb from "../../commons/breadcrumb";
import Configuration from "../../commons/configuration/server";

class Promotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      promotions: [],
      display_form: false,
      display_filter: false,
      openFilter: false
    };
  }

  componentDidMount() {
    axios
      .get(`${Configuration.domain}/hrm/getAllPromotion`)
      .then(response => {
        this.setState({
          promotions: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  removePromotion = promotions => {
    this.setState({
      promotions
    });
  };

  render() {
    let { display_form } = this.state;

    return (
      <div
        className="content-wrapper"
        style={{ minHeight: window.innerHeight - 111 + "px" }}
      >
        <BreadCrumb
          title="Employee Promotion"
          root="Home"
          rootUrl="/"
          parent="Employees"
          parentUrl="/employees"
          child={display_form ? "New Promotion":"View Promotions"}
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
                {!display_form && "New Promotion"}
                {display_form && "View Promotions"}
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
            {this.state.display_form && <NewPromotion />}

            {!this.state.display_form && (
              <PromotionShow
                promotions={this.state.promotions}
                removePromotion={this.removePromotion}
              />
            )}
          </div>
        </section>
        <ToastContainer />
      </div>
    );
  }
}

export default Promotion;
