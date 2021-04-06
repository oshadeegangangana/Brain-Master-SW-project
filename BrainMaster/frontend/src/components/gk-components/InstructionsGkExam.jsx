import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {api} from "../../config/config.json";
import {toast} from "react-toastify";

class InstructionsGkExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_paper: null,
            added_by: null,
            isLoaded: false,
            redirect: null,
            exam_count: null,
        };
    }

    componentDidMount() {
        const selectedPaperId = sessionStorage.getItem("selectedGkPaperID:");
        const activeUserId = sessionStorage.getItem("activeUserID:");
        fetch(api + "/exam/" + selectedPaperId+ "/"+ activeUserId , {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({}),
        })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    exam_count: json.result.count,
                },() => {
                    if (this.state.exam_count != 0) {
                        toast.warn("✔️already got your attempt for this paper!", {
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
                                    redirect: "/",
                                })
                            }.bind(this),
                            2000
                        );
                    } else {
                        fetch(api + "/paper/" + selectedPaperId)
                            .then((res) => res.json())
                            .then((json) => {
                                this.setState({
                                    selected_paper: json,
                                });
                                fetch(api + "/user/" + this.state.selected_paper.added_by)
                                    .then((res) => res.json())
                                    .then((json) => {
                                        this.setState({
                                            isLoaded: true,
                                            added_by: json,
                                        });
                                    });
                            });
                    }
                });
            });
    }

    startExam() {
        this.setState({
            redirect: "/gk_exam"
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        let { isLoaded, selected_paper, added_by } = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">General Knowledge Paper Instructions</h4>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>

                    <br />
                    <div className="card text-center text-white bg-dark">
                        <div className="card-header">
                            Welcome to Online Exam for General Knowledge test.
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-6">
                                    <div className="card bg-danger">
                                        <div className="card-body">
                                            <h5 className="card-title">General Knowledge Paper Instructions</h5>
                                            <p className="card-text text-white" >
                                                <div style={{ textAlign: "left"}}>
                                                    - The Exam has 10 multiple-choice questions (MCQ). <br/>
                                                    - Exam Duration: 10 minutes. <br/>
                                                    - Exam will be automatically submitted after exam duration finished. <br />
                                                    - Only one attempt is possible.
                                                    - Paper Title : {selected_paper.paper_name} <br/>
                                                    - Paper Type : <span className="text-uppercase">{selected_paper.paper_type}</span> - MCQ<br/>
                                                </div>
                                            </p>
                                            <button
                                                style={{
                                                    padding: 0,
                                                    border: "none",
                                                    background: "none",
                                                }}
                                                onClick={() => this.startExam()}
                                            >
                                                <a href="/gk_exam" className="btn btn-primary">
                                                <i className="ti-timer" /> Start Exam </a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3"></div>
                            </div>

                        </div>
                        <div className="card-footer text-white">
                            Paper added by : {added_by.f_name} {added_by.l_name}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default InstructionsGkExam;