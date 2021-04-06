import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Redirect } from "react-router-dom";
import {api} from "../../config/config.json";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editUser: [],
      f_name: null,
      l_name: null,
      email: null,
      mobile_no: null,
      age: null,
      role: null,
      password: null,
      new_password: null,
      redirect: null,
    };
  }
  componentDidMount() {
    let selected_user_id = sessionStorage.getItem("selectedUserID:");
    fetch(api + "/user/" + selected_user_id)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            editUser: json,
            f_name: json.f_name,
            l_name: json.l_name,
            email: json.email,
            mobile_no: json.mobile_no,
            age: json.age,
            password: json.password,
            role: json.role,
          });
        });
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(this.state));
    this.postData();

  };

  async postData() {
    try {
      let result;
      let edit_user_id = this.state.editUser.user_id;
      if (this.state.new_password) {
        result = await fetch(api + "/user/" + edit_user_id, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            email: this.state.email,
            mobile_no: this.state.mobile_no,
            age: this.state.age,
            password: this.state.new_password,
          }),
        });
        console.log(result);
      } else {
        result = await fetch(api + "/user/" + edit_user_id, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            email: this.state.email,
            mobile_no: this.state.mobile_no,
            age: this.state.age,
            password: this.state.password,
          }),
        });
        console.log(result);
      }

      toast.info("✔️Account Updated Successfully !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.sessionStorage.setItem("selectedUserID:", "");
      setTimeout(
          function () {
            //Start the timer
            this.setState({ redirect: "/user_list" });
            this.reload()
          }.bind(this),
          2000
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  reload() {
    window.location.reload(false);
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
        <div>
          <ToastContainer />
          <div className="row">
            <div className="col-lg-12 mt-5">
              <div className="card">
                <div className="card-body">
                  <div>
                    <h4 className="header-title">Update User Account</h4>
                  </div>
                  <form onSubmit={this.onSubmitHandler} autoComplete="off">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">First Name</label>
                          <input
                              type="text"
                              className="form-control style-input"
                              placeholder="First Name"
                              id="inputFirstName"
                              name="f_name"
                              value={this.state.f_name}
                              onChange={this.onChangeHandler}
                              required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Last Name</label>
                          <input
                              type="text"
                              className="form-control style-input"
                              placeholder="Last Name"
                              id="inputLastName"
                              name="l_name"
                              value={this.state.l_name}
                              onChange={this.onChangeHandler}
                              required
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email</label>
                          <input
                              type="email"
                              className="form-control style-input"
                              placeholder="Email"
                              id="inputEmail"
                              name="email"
                              value={this.state.email}
                              onChange={this.onChangeHandler}
                              required
                              readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Mobile Number
                          </label>
                          <input
                              type="text"
                              className="form-control style-input"
                              placeholder="Mobile Number"
                              id="inputMobileNo"
                              name="mobile_no"
                              value={this.state.mobile_no}
                              onChange={this.onChangeHandler}
                              pattern="[0-9]{10}" title="Enter 10 digits valid mobile number"
                          />
                        </div>

                      </div>
                      <div className="col-md-6">

                        <div className="form-group">
                          <label htmlFor="exampleInputAge">
                            Age
                          </label>
                          <input
                              type="number"
                              className="form-control style-input"
                              placeholder="Age"
                              id="inputAge"
                              name="age"
                              value={this.state.age}
                              onChange={this.onChangeHandler}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Current Password
                          </label>
                          <input
                              type="password"
                              className="form-control style-input"
                              placeholder="Current Password"
                              id="inputCurrentPassword"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChangeHandler}
                              required
                              readOnly
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">New Password</label>
                          <input
                              type="password"
                              className="form-control style-input"
                              placeholder="New Password"
                              id="inputNewPassword"
                              name="new_password"
                              value={this.state.new_password}
                              onChange={this.onChangeHandler}
                              pattern=".{8,}" title="Eight or more characters"
                          />
                          <small id="emailHelp" className="form-text text-muted">
                            Enter New Password if you want to Update the Password.
                          </small>
                        </div>

                        <div className="form-check text-left">
                          <input
                              type="checkbox"
                              className="form-check-input"
                              id="exampleCheck1"
                              required
                          />
                          <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                          >
                            Confirmation
                          </label>
                        </div>

                        <div className="fashion-buttons text-left">
                          <button type="submit" className="btn fashion-btn ">
                            Update Profile
                          </button>
                        </div>


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

export default EditUser;
