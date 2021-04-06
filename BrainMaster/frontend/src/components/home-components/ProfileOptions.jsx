import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class ProfileOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            hiddenUser: true,
            hiddenAdmin: true,
        };
    }

    logoutAction = () => {
        this.state.activeUser = [];
        window.localStorage.clear();
        window.sessionStorage.clear();
        this.setState({ redirect: "/" });

        toast.info("✔️ You're Successfully Logged Out", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        setTimeout(
            function () {
                //Start the timer
                this.reload(); //After 3 second
            }.bind(this),
            1000
        );
    };

    reload() {
        window.location.reload(false);
    }

    render() {
        return (
            <div className="col-sm-3 clearfix">
                <ToastContainer />
                <div className="user-profile pull-right">
                    <img
                        className="avatar user-thumb"
                        src="assets/images/author/avatar.png"
                        alt="avatar"
                    />
                    <h4
                        className="user-name dropdown-toggle"
                        data-toggle="dropdown"
                    >
                        {this.props.f_name}{" "}
                        <i className="fa fa-angle-down" />
                    </h4>
                    <div className="dropdown-menu">
                        <a className="dropdown-item">
                            <Link to="/profile">My Profile</Link>
                        </a>
                        <a className="dropdown-item">
                            <Link to="/edit_profile">Update Profile</Link>
                        </a>
                        <a
                            className="dropdown-item"
                            onClick={() => this.logoutAction()}
                        >
                            <Link>Log Out</Link>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileOptions;