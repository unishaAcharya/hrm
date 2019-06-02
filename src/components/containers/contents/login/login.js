import React, { Component } from "react";

class LoginForm extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <div className="box">
              <body class="hold-transition login-page">
                <div className="login-box">
                  <div className="login-box-body">
                    <p class="login-box-msg">Sign in to start your session</p>
                    <form class="form-element">
                      <div class="form-group has-feedback">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email"
                        />
                        <span class="ion ion-email form-control-feedback" />
                      </div>
                      <div class="form-group has-feedback">
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Password"
                        />
                        <span class="ion ion-locked form-control-feedback" />
                      </div>
                      <div class="row">
                        <div class="col-6">
                          <div class="checkbox">
                            <input type="checkbox" id="basic_checkbox_1" />
                            <label for="basic_checkbox_1">Remember Me</label>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="fog-pwd">
                            <a href="javascript:void(0)">
                              <i class="ion ion-locked" /> Forgot pwd?
                            </a>
                            <br />
                          </div>
                        </div>

                        <div class="col-12 text-center">
                          <button
                            type="submit"
                            class="btn btn-info btn-block margin-top-10"
                          >
                            SIGN IN
                          </button>
                        </div>
                      </div>
                    </form>
                    <div class="social-auth-links text-center">
                      <p>- OR -</p>
                      <a
                        href="#"
                        class="btn btn-social-icon btn-circle btn-facebook"
                      >
                        <i class="fa fa-facebook" />
                      </a>
                      <a
                        href="#"
                        class="btn btn-social-icon btn-circle btn-google"
                      >
                        <i class="fa fa-google-plus" />
                      </a>
                    </div>
                    <div class="margin-top-30 text-center">
                      <p>
                        Don't have an account?
                        <a href="/" class="text-info m-l-5">
                          Sign Up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </body>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
