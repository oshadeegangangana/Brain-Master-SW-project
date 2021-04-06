import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";
import {api} from "../../config/config.json";

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      f_name: null,
      l_name: null,
      email: null,
      mobile_no: null,
      password: null,
      password2: null,
      role: "admin",
      redirect: null,
    };
  }

  addAccount = (e) => {
    e.preventDefault();

    if (this.state.password2 !== this.state.password) {
      toast.error("🚫 Both Passwords should be matched !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      fetch(api + "/user", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.state),
      }).then((result) => {
        if(result.status == 500){
          toast.error("🚫 Email already used", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({
            email: "",
            password: "",
            password2: "",
          })
        } else {
          toast.info("✔️ Account Added Successfully !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(
              function () {
                this.setState({
                  redirect: "/user_list",
                });
              }.bind(this),
              2000
          );
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect}></Redirect>;
    }
    return (
      <div>
        <ToastContainer />
        <div className="container p-0">
          <div className="row no-gutters">
            <div className="login-box-s2 ptb--100">
              <form
                autoComplete="off"
                onSubmit={(e) => {
                  this.addAccount(e);
                }}
              >
                <div className="login-form-head">
                  <h4>Add Admin Account</h4>
                  <p>
                    Add Users to Give Access for Manage <br /> The Brain Master
                  </p>
                </div>
                <div className="login-form-body">
                  <div className="form-gp">
                    <label htmlFor="exampleInputName1">First Name</label>
                    <input
                      type="text"
                      id="inputFirstName"
                      name="f_name"
                      onChange={(event) => {
                        this.setState({ f_name: event.target.value });
                      }}
                      value={this.state.f_name}
                      required
                    />
                    <i className="ti-user" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputName1">Last Name</label>
                    <input
                        type="text"
                        id="inputLastName"
                        name="l_name"
                        onChange={(event) => {
                          this.setState({ l_name: event.target.value });
                        }}
                        value={this.state.l_name}
                        required
                    />
                    <i className="ti-user" />
                    <div className="text-danger" />
                  </div>

                  <div className="form-gp">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      id="inputEmail"
                      name="email"
                      onChange={(event) => {
                        this.setState({ email: event.target.value });
                      }}
                      value={this.state.email}
                      required
                    />
                    <i className="ti-email" />
                    <div className="text-danger" />
                  </div>

                  <div className="form-gp">
                    <label htmlFor="exampleInputContactNo1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobileNo"
                      name="mobile_no"
                      onChange={(event) => {
                        this.setState({ mobile_no: event.target.value });
                      }}
                      value={this.state.mobile_no}
                      pattern="[0-9]{10}" title="Enter 10 digits valid mobile number"
                    />
                    <i className="ti-mobile" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      id="inputPassword"
                      name="password"
                      onChange={(event) => {
                        this.setState({ password: event.target.value });
                      }}
                      value={this.state.password}
                      pattern=".{8,}" title="Eight or more characters"
                      required
                    />
                    <i className="ti-lock" />
                    <div className="text-danger" />
                  </div>
                  <div className="form-gp">
                    <label htmlFor="exampleInputPassword2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="password2"
                      onChange={(event) => {
                        this.setState({
                          password2: event.target.value,
                        });
                      }}
                      value={this.state.password2}
                      pattern=".{8,}" title="Eight or more characters"
                      required
                    />
                    <i className="ti-lock" />
                    <div className="text-danger" />
                  </div>
                  <center>
                    <div className="submit-btn-area">
                      <button id="form_submit" type="submit">
                        Submit <i className="ti-save" />
                      </button>
                    </div>
                  </center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAccount;
