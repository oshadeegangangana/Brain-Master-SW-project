import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {api} from "../../config/config.json";

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_user_id: null,
      admin_users: [],
      isLoaded: false,
      redirect: null,
    };
  }

  editAction(adminUser) {
    window.sessionStorage.setItem("selectedUserID:", adminUser.user_id);
  }

  deleteAction(adminUser) {

    if (this.state.active_user_id == adminUser.user_id) {
      toast.error("🚫 You can't do this action !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      const API_URL = api + "/user/" + adminUser.user_id;
      try {
        let result = fetch(API_URL, { method: "delete" });
        toast.info("✔️ Account Deleted Successfully !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(
          function () {
            //Start the timer
            this.componentDidMount(); //After 1 second
          }.bind(this),
          1000
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  componentDidMount() {
    let active = JSON.parse(localStorage.getItem("login"));
    this.setState({
      active_user_id : active.user_id
    })
    fetch(api + "/user")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          admin_users: json,
        });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let { isLoaded, admin_users } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <h4 className="header-title">Manage Users</h4>
          Loading...
        </div>
      );
    } else {
      return (
        <div>
          <ToastContainer />
          <div className="row">
            <div className="col-lg-12 mt-5">
              <div className="card">
                <div className="card-body">
                  <h4 className="header-title">Manage Users</h4>
                  <div className="single-table">
                    <div className="table-responsive">
                      <table className="table table-hover text-center">
                        <thead className="text-uppercase bg-theme">
                          <tr className="text-white">
                            <th scope="col">Index</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact No.</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admin_users.map((adminUser) => (
                            <tr key={adminUser.user_id}>
                              <th scope="row">
                                {admin_users.indexOf(adminUser) + 1}
                              </th>
                              <td>{adminUser.f_name}</td>
                              <td>{adminUser.l_name}</td>
                              <td>{adminUser.role}</td>
                              <td>{adminUser.email}</td>
                              <td>{adminUser.mobile_no}</td>
                              <td>
                                <button
                                  style={{
                                    padding: 0,
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={() => this.editAction(adminUser)}
                                >
                                  <a href="/edit_admin_user">
                                    <i className="ti-pencil" />
                                  </a>
                                </button>
                              </td>
                              <td>
                                <button
                                  style={{
                                    padding: 0,
                                    border: "none",
                                    background: "none",
                                  }}
                                  onClick={() => this.deleteAction(adminUser)}
                                >
                                  <i className="ti-trash" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default UserList;
