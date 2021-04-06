import React, {Component} from 'react';
import {api} from "../../config/config.json";
import {Redirect} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Countdown from 'react-countdown-now';

class IqExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_paper: null,
            questions: [],
            mcq_questions: [],
            struct_questions: [],
            marking: [],
            marks: null,
            grade: null,
            answer01: null,
            answer02: null,
            answer03: null,
            answer04: null,
            answer05: null,
            answer06: null,
            answer07: null,
            answer08: null,
            answer09: null,
            answer10: null,

            participant_user: null,
            isLoaded: false,
            redirect: null,
        };
    }

    // Renderer callback with condition
    renderer = ({minutes, seconds, completed}) => {
        if (completed) {

            setTimeout(
                function () {
                    //Start the timer
                    this.submitExam();
                }.bind(this),
                2000
            );

            return <span>Time is Up. Your Answers will be submitted automatically</span>;

        } else {
            // Render a countdown
            return <span> Time : <b>{minutes}:{seconds}</b></span>;
        }
    };

    componentDidMount() {
        // set paper details, questions array, active user
        const selectedPaperId = sessionStorage.getItem("selectedIqPaperID:");
        const activeUserId = sessionStorage.getItem("activeUserID:");
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
                            body: JSON.stringify({}),
                        }).then((res) => res.json()).then((json) => {
                            console.log(json.result.rows);
                            this.setState({
                                isLoaded: true,
                                questions: json.result.rows,
                            }, () => {
                                let mcq = [];
                                let struct = [];
                                this.state.questions.forEach(function (question) {
                                    if (question.option_1 && question.option_2 && question.option_3 && question.option_4) {
                                        mcq.push(question);
                                    } else {
                                        struct.push(question);
                                    }
                                });
                                this.setState({
                                    mcq_questions: mcq,
                                    struct_questions: struct
                                })
                            });

                        }).catch(error => {
                            console.log(error.message);
                        })
                    }).catch(err => {
                    console.log(err.message);
                });
            }).catch(err => {
            console.log(err.message);
        });
    }

    setAnswer(event) {
        let key = event.target.name;
        switch (key) {
            case "0":
                this.setState({answer01: event.target.value});
                break;
            case "1":
                this.setState({answer02: event.target.value});
                break;
            case "2":
                this.setState({answer03: event.target.value});
                break;
            case "3":
                this.setState({answer04: event.target.value});
                break;
            case "4":
                this.setState({answer05: event.target.value});
                break;
            case "5":
                this.setState({answer06: event.target.value});
                break;
            case "6":
                this.setState({answer07: event.target.value});
                break;
            case "7":
                this.setState({answer08: event.target.value});
                break;
            case "8":
                this.setState({answer09: event.target.value});
                break;
            case "9":
                this.setState({answer10: event.target.value});
                break;
        }
        // console.log("Question: "+ event.target.name);
        // console.log("Answer Value: "+ event.target.value);
    }

    submitExamBtnClick = (e) => {
        e.preventDefault();
        this.submitExam();
    }

    submitExam() {

        let arr = this.state.questions;
        let a01 = this.state.answer01;
        let a02 = this.state.answer02;
        let a03 = this.state.answer03;
        let a04 = this.state.answer04;
        let a05 = this.state.answer05;
        let a06 = this.state.answer06;
        let a07 = this.state.answer07;
        let a08 = this.state.answer08;
        let a09 = this.state.answer09;
        let a10 = this.state.answer10;

        let marking = [];
        let marks = 0;

        arr.forEach(function (question) {

            let question_no = arr.indexOf(question);
            switch (question_no) {
                case 0:
                    if (a01) {
                        if (a01.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
                case 1:
                    if (a02) {
                        if (a02.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
                case 2:
                    if (a03) {
                        if (a03.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
                case 3:
                    if (a04) {
                        if (a04.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
                case 4:
                    if (a05) {
                        if (a05.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
                case 5:
                    if (a06) {
                        if (a06.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
                case 6:
                    if (a07) {
                        if (a07.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
                case 7:
                    if (a08) {
                        if (a08.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
                case 8:
                    if (a09) {
                        if (a09.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
                case 9:
                    if (a10) {
                        if (a10.localeCompare(question.answer) === 0) {
                            marking.push("Correct");
                            marks++;
                        } else {
                            marking.push("Incorrect");
                        }
                    } else {
                        marking.push("Not Answered");
                    }
                    break;
            }
        }, () => {

        });
        window.sessionStorage.setItem("iqExamMarking:", JSON.stringify(marking));

        // Set marking to state
        this.setState({
            marking: marking,
            marks: marks,
        }, () => {
            this.updateGrade().then(r => {
                fetch(api + "/exam", {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        paper_id: this.state.selected_paper.paper_id,
                        participant_user: this.state.participant_user.user_id,
                        marks: this.state.marks,
                        grade: this.state.grade,
                    }),
                }).then((res) => res.json()).then((json) => {
                    console.log("Result: " + json.message);

                    this.updateTotalMarks().then(r => {
                        toast.info("✔️Exam Submitted !", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        this.setState({redirect: "/iq_result"});

                    }).catch(error => {
                        console.log(error.message);
                    })


                }).catch(error => {
                    console.log(error.message);
                })
            })

        });

    };

    async updateGrade() {
        if (this.state.marks <= 3) {
            this.setState({
                grade: "D"
            })
        } else if (this.state.marks <= 6) {
            this.setState({
                grade: "C"
            })
        } else if (this.state.marks <= 8) {
            this.setState({
                grade: "B"
            })
        } else if (this.state.marks <= 10) {
            this.setState({
                grade: "A"
            })
        } else {
            this.setState({
                grade: "invalid"
            })
        }
    }

    async updateTotalMarks() {

        let new_marks = this.state.participant_user.total_marks + this.state.marks;
        let result = await fetch(api + "/user/" + this.state.participant_user.user_id, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                total_marks: new_marks,
            }),
        });

        console.log(result);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {isLoaded, mcq_questions, struct_questions, selected_paper, participant_user} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">General Knowledge Exam</h4>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <ToastContainer/>
                    <br/>
                    <h5> IQ Exam : {selected_paper.paper_name}</h5>
                    <br/>
                    <p className="card-text">
                        Participant
                        : <b>{participant_user.f_name + " " + participant_user.l_name}</b> &emsp;&emsp;&emsp;&emsp;
                        Age : <b>{participant_user.age} </b> &emsp;&emsp;&emsp;&emsp;
                        <Countdown
                            date={Date.now() + 600000}
                            renderer={this.renderer}
                        /></p>
                    <br/>

                    <form autoComplete="off"
                          onSubmit={(e) => {
                              this.submitExamBtnClick(e);
                          }}>
                        {mcq_questions.map((question) => (
                            <div className="card text-dark bg-light" key={question.question_id}
                                 onChange={this.setAnswer.bind(this)}>
                                <div className="card-header">
                                    Question {mcq_questions.indexOf(question) + 1}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{question.question}</h5>
                                    <p className="card-text">
                                        <div>

                                            <div className="form-row">

                                                {/* Option 01 */}
                                                <div className="col">
                                                    <div className="form-check">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <input type="radio"
                                                                           name={mcq_questions.indexOf(question)}
                                                                           value={question.option_1}
                                                                           id="option_1"
                                                                           aria-label="Checkbox for following text input"/>
                                                                </div>
                                                            </div>
                                                            <input type="text" className="form-control"
                                                                   value={"1. " + question.option_1}
                                                                   aria-label="Text input with checkbox" readOnly/>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Option 02 */}
                                                <div className="col">
                                                    <div className="form-check">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <input type="radio"
                                                                           name={mcq_questions.indexOf(question)}
                                                                           value={question.option_2}
                                                                           id="option_2"
                                                                           aria-label="Checkbox for following text input"/>
                                                                </div>
                                                            </div>
                                                            <input type="text" className="form-control"
                                                                   value={"2. " + question.option_2}
                                                                   aria-label="Text input with checkbox" readOnly/>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="form-row">

                                                {/* Option 03 */}
                                                <div className="col">
                                                    <div className="form-check">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <input type="radio"
                                                                           name={mcq_questions.indexOf(question)}
                                                                           value={question.option_3}
                                                                           id="option_3"
                                                                           aria-label="Checkbox for following text input"/>
                                                                </div>
                                                            </div>
                                                            <input type="text" className="form-control"
                                                                   value={"3. " + question.option_3}
                                                                   aria-label="Text input with checkbox" readOnly/>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Option 04 */}
                                                <div className="col">
                                                    <div className="form-check">
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <input type="radio"
                                                                           name={mcq_questions.indexOf(question)}
                                                                           value={question.option_4}
                                                                           id="option_4"
                                                                           aria-label="Checkbox for following text input"/>
                                                                </div>
                                                            </div>
                                                            <input type="text" className="form-control"
                                                                   value={"4. " + question.option_4}
                                                                   aria-label="Text input with checkbox" readOnly/>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </p>
                                </div>
                                <br/>
                            </div>
                        ))}

                        {struct_questions.map((question) => (
                            <div className="card text-dark bg-light" key={question.question_id}
                                 onChange={this.setAnswer.bind(this)}>
                                <div className="card-header">
                                    Question {struct_questions.indexOf(question) + 1}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{question.question}</h5>
                                    <p className="card-text">
                                        <div>

                                            <div className="form-row">

                                                {/* Answer */}
                                                <div className="col">
                                                    <div className="form-check">
                                                        <div className="input-group mb-3">
                                                            <input type="text" className="form-control"
                                                                   name={struct_questions.indexOf(question) + 5}
                                                                   value={question.option_1}
                                                                   placeholder="Enter Short Answer"
                                                                   id="answer"/>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </p>
                                </div>
                                <br/>
                            </div>

                        ))}


                        <div className="container">

                            <div className="row">
                                <div className="col"/>
                                <div className="col"/>
                                <div className="col">
                                    <div className="fashion-buttons text-left">
                                        <button type="submit" className="btn fashion-btn ">
                                            <i className="ti-arrow-circle-right"/> Submit Answers
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>
                </div>
            );
        }
    }
}

export default IqExam;