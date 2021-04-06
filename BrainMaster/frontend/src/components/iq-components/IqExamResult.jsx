import React, {Component} from 'react';
import {api} from "../../config/config.json";
import {Redirect} from "react-router-dom";

class IqExamResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_paper: null,
            participant_user: null,
            questions: [],
            marking: [],
            exam:[],
            isLoaded: false,
            redirect: null,
        };
    }

    componentDidMount() {
        const selectedPaperId = sessionStorage.getItem("selectedIqPaperID:");
        const marking = sessionStorage.getItem("iqExamMarking:");
        const activeUserId = sessionStorage.getItem("activeUserID:");

        fetch(api + "/exam/" + selectedPaperId + "/" + activeUserId)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    exam: json,
                });
            });

        fetch(api + "/paper/" + selectedPaperId)
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
                        fetch(api + "/paper2/" + selectedPaperId, {
                            method: "post",
                            headers: {
                                Accept: "application/json",
                                "Content-type": "application/json",
                            },
                            body: JSON.stringify({  }),
                        }).then((res) => res.json()).then((json) => {
                            console.log(json.result.rows);
                            let obj = JSON.parse(marking);
                            this.setState({
                                isLoaded: true,
                                questions: json.result.rows,
                                marking: obj
                            });
                        }).catch(error => {
                            console.log(error.message);
                        })
                    });
            });
    }

    backHome(){
        window.sessionStorage.setItem("selectedIqPaperID:", null);
        window.sessionStorage.setItem("iqExamMarking:", null);
        this.setState({
            redirect: "/",
        })

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        let {isLoaded, selected_paper, participant_user, questions, marking, exam} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">IQ Exam Result</h4>
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
                                    <h4 className="header-title text-white">IQ Exam Summery</h4>
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
                                                                        <th scope="col">Status</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {questions.map((question, index) => (
                                                                        <tr key={question.question_id}>
                                                                            <th scope="row">
                                                                                {index + 1}
                                                                            </th>
                                                                            <td>{question.question}</td>
                                                                            <td>{question.answer}</td>
                                                                            <td>{marking[index]}</td>
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
                                                                        <td>Grade</td>
                                                                        <th>{exam.grade}</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Paper Category</td>
                                                                        <th>IQ</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Paper Type</td>
                                                                        <th>MCQ & Structured</th>
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
                                            <button onClick={() => this.backHome()} className="btn fashion-btn ">
                                                <i className="ti-home"/> Back to Home
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

export default IqExamResult;