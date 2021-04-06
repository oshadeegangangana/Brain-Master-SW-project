import React, {Component} from 'react';
import {api} from "../../../config/config.json";
import {Redirect} from "react-router-dom";

class ViewExamDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_paper: null,
            participant_user: null,
            questions: [],
            exam: null,
            isLoaded: false,
            redirect: null,
        };
    }
    componentDidMount() {
        const selectedExamId = sessionStorage.getItem("selectedExamID:");
        const activeUserId = sessionStorage.getItem("activeUserID:");

        fetch(api + "/exam/" + selectedExamId)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    exam: json,
                }, () => {
                    fetch(api + "/paper/" + this.state.exam.paper_id)
                        .then((res) => res.json())
                        .then((json) => {
                            this.setState({
                                selected_paper: json,
                            });
                            fetch(api + "/user/" + activeUserId)
                                .then((res) => res.json())
                                .then((json) => {
                                    this.setState({
                                        participant_user: json,
                                    });
                                    if (this.state.selected_paper.paper_type == "gk"){
                                        fetch(api + "/paper2", {
                                            method: "post",
                                            headers: {
                                                Accept: "application/json",
                                                "Content-type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                paper_id: this.state.exam.paper_id,
                                            }),
                                        }).then((res) => res.json()).then((json) => {
                                            console.log(json.result.rows);
                                            this.setState({
                                                isLoaded: true,
                                                questions: json.result.rows,
                                            });
                                        }).catch(error => {
                                            console.log(error.message);
                                        })
                                    } else if (this.state.selected_paper.paper_type == "iq"){
                                        fetch(api + "/paper2/"+ this.state.exam.paper_id, {
                                            method: "post",
                                            headers: {
                                                Accept: "application/json",
                                                "Content-type": "application/json",
                                            },
                                            body: JSON.stringify({  }),
                                        }).then((res) => res.json()).then((json) => {
                                            console.log(json.result.rows);
                                            this.setState({
                                                isLoaded: true,
                                                questions: json.result.rows,
                                            });
                                        }).catch(error => {
                                            console.log(error.message);
                                        })
                                    }
                                    else {
                                        alert("invalid paper type")
                                    }

                                });
                        });

                });
            });
    }

    backProfile() {
        window.sessionStorage.setItem("selectedExamID:", null);
        this.setState({
            redirect: "/profile",
        })

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {isLoaded, selected_paper, participant_user, questions, exam} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">General Knowledge Exam Result</h4>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div className="card text-center text-white bg-dark">
                                <div className="card-body">
                                    <h4 className="header-title text-white">Exam Details</h4>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-7">
                                                <div className="card bg-light text-dark">
                                                    <div className="card-body">
                                                        <div className="single-table">
                                                            <div className="table-responsive">
                                                                <table className="table text-center">
                                                                    <thead className="text-uppercase bg-theme">
                                                                    <tr className="text-white">
                                                                        <th scope="col">Number</th>
                                                                        <th scope="col">Question</th>
                                                                        <th scope="col">Correct Answer</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {questions.map((question, index) => (
                                                                        <tr key={question.question_id}>
                                                                            <td scope="row">
                                                                                {index + 1}
                                                                            </td>
                                                                            <td>{question.question}</td>
                                                                            <td>{question.answer}</td>
                                                                        </tr>
                                                                    ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-5">
                                                <div className="card bg-success text-white">
                                                    <div className="card-body">
                                                        <div className="single-table">
                                                            <div className="table-responsive">
                                                                <table className="table text-left">
                                                                    <tbody>
                                                                    <b><i>Paper Information</i></b>
                                                                    <tr>
                                                                        <td>Paper Title</td>
                                                                        <th>{selected_paper.paper_name}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Marks</td>
                                                                        <th>{exam.marks}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Marks</td>
                                                                        <th>{exam.grade}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Paper Category</td>
                                                                        <th className="text-uppercase">{selected_paper.paper_type}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Duration</td>
                                                                        <th>10 minutes</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td></td>
                                                                        <th></th>
                                                                    </tr>
                                                                    <b><i>Participant Information</i></b>
                                                                    <tr>
                                                                        <td>Full Name</td>
                                                                        <th>{participant_user.f_name} {participant_user.l_name}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Email</td>
                                                                        <th>{participant_user.email}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Age</td>
                                                                        <th>{participant_user.age}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Total Marks</td>
                                                                        <th>{participant_user.total_marks}</th>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-footer text-white">
                                        Exam Report for {participant_user.f_name} {participant_user.l_name}
                                        <div className="fashion-buttons text-center">
                                            <button onClick={() => this.backProfile()} className="btn fashion-btn ">
                                                <i className="ti-user"/> Back to Profile
                                            </button>
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

export default ViewExamDetails;