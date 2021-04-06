import React, {Component} from 'react';
import {api} from "../../../config/config.json";
import {Redirect} from "react-router-dom";
import {ToastContainer} from "react-toastify";

class AttendedExamList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_user_id: null,
            exams: [],
            isLoaded: false,
            redirect: null,
        };
    }

    viewAction(exam) {
        window.sessionStorage.setItem("selectedExamID:", exam.exam_id);
    }

    componentDidMount() {
        const activeUserId = sessionStorage.getItem("activeUserID:");
        this.setState({
            active_user_id : activeUserId
        }, () => {
            fetch(api + "/paper2/get_exams/"+ activeUserId )
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        isLoaded: true,
                        exams: json,
                    });
                });
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        let { isLoaded, exams } = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">My Exams</h4>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <div>
                        <ToastContainer />
                        <div className="row">
                            <div className="col-lg-12 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="header-title text-center">My Exams</h4>
                                        <div className="single-table">
                                            <div className="table-responsive">
                                                <table className="table table-hover text-center">
                                                    <thead className="text-uppercase bg-theme">
                                                    <tr className="text-white">
                                                        <th scope="col">Index</th>
                                                        <th scope="col">Paper Name</th>
                                                        <th scope="col">Type</th>
                                                        <th scope="col">Marks</th>
                                                        <th scope="col">Grade</th>
                                                        <th scope="col">View</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {exams.map((exam , index) => (
                                                        <tr key={exam.exam_id}>
                                                            <th scope="row">
                                                                {index + 1}
                                                            </th>
                                                            <td>{exam.paper.paper_name}</td>
                                                            <td className="text-uppercase">{exam.paper.paper_type}</td>
                                                            <td>{exam.marks}</td>
                                                            <td>{exam.grade}</td>
                                                            <td>
                                                                <button
                                                                    style={{
                                                                        padding: 0,
                                                                        border: "none",
                                                                        background: "none",
                                                                    }}
                                                                    onClick={() => this.viewAction(exam)}
                                                                >
                                                                    <a href="/view_exam_details">
                                                                        <i className="ti-eye" />
                                                                    </a>
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
                </div>
            );
        }
    }
}

export default AttendedExamList;