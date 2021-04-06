import React, {Component} from 'react';
import {api} from "../../config/config.json";
import {Redirect} from "react-router-dom";
import AttendedExamList from "./sub-components/AttendedExamList";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUser: [],
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
    onSubmitHandler = (e) => {
        e.preventDefault();
        this.setState({
            redirect: "/edit_profile"
        })
    };

    componentDidMount() {
        let active_user_id = sessionStorage.getItem("activeUserID:");
        fetch(api + "/user/" + active_user_id)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    activeUser: json,
                    f_name: json.f_name,
                    l_name: json.l_name,
                    email: json.email,
                    mobile_no: json.mobile_no,
                    age: json.age,
                    total_marks: json.total_marks,
                    role: json.role,
                });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}><a href="/"></a></Redirect>;
        }
        return (
            <div>
                {/*<ToastContainer />*/}
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h4 className="header-title text-center"> My Profile </h4>
                                </div>
                                <form onSubmit={this.onSubmitHandler} autoComplete="off">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Full Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="First Name"
                                                    id="inputFirstName"
                                                    name="f_name"
                                                    value={this.state.f_name + " " + this.state.l_name}
                                                    onChange={this.onChangeHandler}
                                                    readOnly
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputAge">
                                                    Age
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Age"
                                                    id="inputAge"
                                                    name="age"
                                                    value={this.state.age}
                                                    onChange={this.onChangeHandler}
                                                    readOnly
                                                />
                                            </div>



                                        </div>
                                        <div className="col-md-4">

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
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group" hidden={this.props.role != "user"}>
                                                <label htmlFor="exampleInputEmail1">Total Marks</label>
                                                <input
                                                    type="number"
                                                    className="form-control style-input"
                                                    placeholder="Total Marks"
                                                    id="inputMarks"
                                                    name="total_marks"
                                                    value={this.state.total_marks}
                                                    onChange={this.onChangeHandler}
                                                    readOnly
                                                />
                                            </div>

                                            <div className="form-group" hidden={this.props.role != "admin"}>
                                                <label htmlFor="exampleInputEmail1">Role</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Role"
                                                    id="role"
                                                    name="role"
                                                    value={this.props.role}
                                                    onChange={this.onChangeHandler}
                                                    readOnly
                                                />
                                            </div>

                                        </div>
                                        <div className="col-md-4">

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
                                                    readOnly
                                                />
                                            </div>

                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Edit Profile
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                                <div hidden={this.props.role == "admin"}>
                                    <AttendedExamList  />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;