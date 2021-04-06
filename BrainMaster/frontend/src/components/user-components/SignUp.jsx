import React, {Component} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Redirect} from "react-router-dom";
import {api} from "../../config/config.json";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            f_name: null,
            l_name: null,
            email: null,
            mobile_no: null,
            age: null,
            password: null,
            password2: null,
            role: "user",
            total_marks: 0,
            sign_in: false,
        };
    }

    register = (e) => {
        e.preventDefault();
        if (this.state.password.localeCompare(this.state.password2) != 0) {

            toast.error("🚫 Password does not Match", {
                position: "top-right",
                autoClose: 2000,
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
                    toast.info("✔️ You're Successfully Registered !", {
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
                                sign_in: true,
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

    sign_in = (e) => {
        e.preventDefault();
        this.setState({
            sign_in: true,
        });
    };

    render() {
        if (this.state.sign_in) {
            return (
                <div>
                    <Redirect to="/"/>
                </div>
            );
        }
        return (
            <div>
                <div>
                    <ToastContainer/>
                    {/* <div id="preloader">
            <div className="loader" />
          </div> */}
                    <div className="login-area">
                        <div className="container">
                            <div className="login-box ptb--100">
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.register(e);
                                    }}
                                >
                                    <div className="login-form-head">
                                        <h4>Sign up</h4>
                                        <p>Hello there, Sign up and Join with Us</p>
                                    </div>
                                    <div className="login-form-body">

                                        {/* First Name */}
                                        <div className="form-gp">
                                            <input
                                                type="text"
                                                id="InputFirstName"
                                                placeholder="First Name"
                                                onChange={(event) => {
                                                    this.setState({f_name: event.target.value});
                                                }}
                                                value={this.state.f_name}
                                                required
                                            />
                                            <i className="ti-user"/>
                                            <div className="text-danger"/>
                                        </div>

                                        {/* Last Name */}
                                        <div className="form-gp">
                                            <input
                                                type="text"
                                                id="InputLastName"
                                                placeholder="Last Name"
                                                onChange={(event) => {
                                                    this.setState({l_name: event.target.value});
                                                }}
                                                value={this.state.l_name}
                                                required
                                            />
                                            <i className="ti-user"/>
                                            <div className="text-danger"/>
                                        </div>

                                        {/* Email */}
                                        <div className="form-gp">
                                            <input
                                                type="email"
                                                id="InputEmail"
                                                placeholder="Email address"
                                                onChange={(event) => {
                                                    this.setState({email: event.target.value});
                                                }}
                                                value={this.state.email}
                                                required
                                            />
                                            <i className="ti-email"/>
                                            <div className="text-danger"/>
                                        </div>

                                        {/* Mobile No */}
                                        <div className="form-gp">
                                            <input
                                                type="text"
                                                id="InputMobile"
                                                placeholder="Mobile Number"
                                                onChange={(event) => {
                                                    this.setState({mobile_no: event.target.value});
                                                }}
                                                value={this.state.mobile_no}
                                                pattern="[0-9]{10}" title="Enter 10 digits valid mobile number"
                                            />
                                            <i className="ti-mobile"/>
                                            <div className="text-danger"/>
                                        </div>

                                        {/* Age */}
                                        <div className="form-gp">
                                            <input
                                                type="number"
                                                id="InputAge"
                                                placeholder="Age"
                                                onChange={(event) => {
                                                    this.setState({age: event.target.value});
                                                }}
                                                value={this.state.age}
                                                required
                                            />
                                            <i className="ti-calendar"/>
                                            <div className="text-danger"/>
                                        </div>

                                        {/* Password */}
                                        <div className="form-gp">
                                            <input
                                                type="password"
                                                id="InputPassword1"
                                                placeholder="Password"
                                                onChange={(event) => {
                                                    this.setState({password: event.target.value});
                                                }}
                                                value={this.state.password}
                                                pattern=".{8,}" title="Eight or more characters"
                                                required
                                            />
                                            <i className="ti-lock"/>
                                            <div className="text-danger"/>
                                        </div>

                                        {/* Password 2 */}
                                        <div className="form-gp">
                                            <input
                                                type="password"
                                                id="InputPassword2"
                                                placeholder="Confirm Password"
                                                onChange={(event) => {
                                                    this.setState({
                                                        password2: event.target.value,
                                                    });
                                                }}
                                                value={this.state.password2}
                                                pattern=".{8,}" title="Eight or more characters"
                                                required
                                            />
                                            <i className="ti-lock"/>
                                            <div className="text-danger"/>
                                        </div>

                                        <div className="submit-btn-area">
                                            <button id="form_submit" type="submit">
                                                Submit <i className="ti-arrow-right"/>
                                            </button>
                                        </div>
                                        <br/>
                                        <div className="form-footer text-center">
                                            <p className="text-muted">
                                                have an account?
                                                <a
                                                    href="/login"
                                                    onClick={(e) => {
                                                        this.sign_in(e);
                                                    }}
                                                >
                                                    Sign In
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
