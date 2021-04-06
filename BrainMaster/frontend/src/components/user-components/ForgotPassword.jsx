import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {api} from "../../config/config.json";
import {Redirect} from "react-router-dom";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            password2: null,
            sign_in: false,
        };
    }

    updatePw = (e) => {
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
            this.setState({
                password: "",
                password2: "",
            });


        } else {
            fetch(api + "/login/forgot_pw", {
                method: "post",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                }),
            }).then((res) => res.json())
                .then((json) => {
                    if (json.error) {
                        toast.error("🚫 " + json.error, {
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
                        });
                    } else {
                        toast.info("✔️" + json.message, {
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
                            3000
                        );
                    }
                }).catch((error) => {
                console.log(error.message);
            });
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
                    <div className="login-area">
                        <div className="container">
                            <div className="login-box ptb--100">
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.updatePw(e);
                                    }}
                                >
                                    <div className="login-form-head">
                                        <h4>Forgot Password</h4>
                                        <p>Reset your password here to use your account</p>
                                    </div>
                                    <div className="login-form-body">

                                        {/* Email */}
                                        <div className="form-gp">
                                            <input
                                                type="email"
                                                id="exampleInputEmail1"
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

                                        {/* Password */}
                                        <div className="form-gp">
                                            <input
                                                type="password"
                                                id="exampleInputPassword1"
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
                                                id="exampleInputPassword2"
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
                                                Remember your password ?
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

export default ForgotPassword;