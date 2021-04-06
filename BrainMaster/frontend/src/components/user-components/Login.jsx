import React, {Component} from "react";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Redirect} from "react-router-dom";
import {api} from "../../config/config.json";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            login: false,
            active: null,
            redirect: null,
            sign_up: false,
            forgot_pw: false,
        };
    }

    login = (e) => {
        e.preventDefault();
        fetch(api + "/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then((response) => {
            response.json().then((result) => {
                console.log("result", result);
                if (result.message) {
                    toast.error("🚫 email/Password does not Match", {
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
                    })
                }
                console.log(result.role);
                if (result && result.user_id) {
                    localStorage.setItem(
                        "login",
                        JSON.stringify({
                            login: true,
                            email: result.email,
                            user_id: result.user_id,
                            user_role: result.role,
                        })
                    );
                    let userFirstName = result.f_name;
                    let userSecondName = result.l_name

                    toast.info(
                        "✔️ Welcome " + userFirstName + " " + userSecondName + " !",
                        {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    );
                }

                setTimeout(
                    function () {
                        //Start the timer
                        this.storeCollector(); //After 2 second
                    }.bind(this),
                    2000
                );
            });
        });
    };

    sign_up = (e) => {
        e.preventDefault();
        this.setState({
            sign_up: true
        });
    };

    forgotPassword = (e) => {
        e.preventDefault();
        this.setState({
            forgot_pw: true
        });
    }

    componentDidMount() {
        this.storeCollector();
    }

    storeCollector() {
        let active = JSON.parse(localStorage.getItem("login"));
        if (active && active.login) {
            this.setState({
                login: true,
                active: active,
                redirect: "/",
            });
            return;
        }
    }

    reload() {
        window.location.reload(false);
    }

    render() {
        if (this.state.forgot_pw) {
            return (
                <div>
                    <Redirect to="/forgot_pw"/>
                </div>
            );
        }
        if (this.state.sign_up) {
            return (
                <div>
                    <Redirect to="/sign_up"/>
                </div>
            );
        }
        if (this.state.login) {
            return (
                <div>
                    <Redirect to="/"/>
                    <a href="/" onClick={this.reload()}> </a>
                </div>
            );
        }
        return (
            <div>
                <ToastContainer/>
                <div className="login-area">
                    <div className="container">
                        <div className="login-box ptb--100">
                            <form
                                autoComplete="off"
                                onSubmit={(e) => {
                                    this.login(e);
                                }}
                            >
                                <div className="login-form-head">
                                    <h4>Sign In</h4>
                                    <p>Hello there, Sign in and start Using Brain Master</p>
                                </div>
                                <div className="login-form-body">
                                    <div className="form-gp">
                                        <label htmlFor="exampleInputEmail1">E-mail</label>
                                        <input
                                            type="email"
                                            id="exampleInputEmail1"
                                            onChange={(event) => {
                                                this.setState({email: event.target.value});
                                            }}
                                            value={this.state.email}
                                            required
                                        />
                                        <i className="ti-email"/>
                                        <div className="text-danger"/>
                                    </div>
                                    <div className="form-gp">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input
                                            type="password"
                                            id="exampleInputPassword1"
                                            onChange={(event) => {
                                                this.setState({password: event.target.value});
                                            }}
                                            value={this.state.password}
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
                                            <a href="/forgot_pw"
                                               onClick={(e) => {
                                                   this.forgotPassword(e);
                                               }}
                                            >
                                                Forgot Password ?
                                            </a>
                                        </p>
                                    </div>
                                    <br/>
                                    <div className="form-footer text-center">
                                        <p className="text-muted">
                                            Don't have an account?{" "}
                                            <a href="/sign_up"
                                               onClick={(e) => {
                                                   this.sign_up(e);
                                               }}
                                            >
                                                Sign up
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* login area end */}
            </div>
        );
    }
}

export default Login;
