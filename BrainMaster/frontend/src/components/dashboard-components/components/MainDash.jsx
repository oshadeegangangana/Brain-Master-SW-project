import React, { Component } from "react";
import AdminDashBoard from "./AdminDashBoard";
import UserDashBoard from "./UserDashBoard";

class MainDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: [],
      login: false,
      user: false,
      admin: false,
    };
  }

  componentDidMount() {
    let active = JSON.parse(localStorage.getItem("login"));
    if (active && active.login) {
      this.setState({
        login: true,
      });
      if (active.user_role.localeCompare("user") == 0) {
        this.setState({
          user: true,
        });
      } else if (active.user_role.localeCompare("admin") == 0) {
        this.setState({
          admin: true,
        });
      }  else {
        alert("Invalid User - Home Dashboard");
      }
    }
  }

  render() {
    if (this.state.admin) {
      return (
        <div>
          <br />
          <AdminDashBoard />
        </div>
      );
    } else if (this.state.user) {
      return (
        <div>
          <br />
          <UserDashBoard />
        </div>
      );
    }
    return <div> Invalid User detected !</div>;
  }
}

export default MainDash;
