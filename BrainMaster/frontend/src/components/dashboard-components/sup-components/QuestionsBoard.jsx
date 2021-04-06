import React, {Component} from 'react';
import {api} from "../../../config/config.json";
import {toast} from "react-toastify";

class QuestionsBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions_list: [],
            answer: null,
            answerValue: null,
            answered_by: null,
        };
    }

    componentDidMount() {
        this.setState({
            answered_by: sessionStorage.getItem("activeUserID:"),
        });

        fetch(api + "/question")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    questions_list: json,
                });
            });

    }

    submitAnswer(e, question){
        e.preventDefault();
        fetch(api + "/answer" , {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                answer: this.state.answer,
                answered_by: this.state.answered_by,
                question_id: question.question_id,
            }),
        }).then((res) => res.json()).then((json) => {
            if(json.error){
                toast.error(json.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else{
                toast.info("✔️ Your Answer Submitted !", {
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
                        this.setState(
                            {answerValue: ""}
                            , () => {
                                this.componentDidMount();
                        });
                    }.bind(this),
                    1000
                );
            }

        }).catch(error => {
            console.log(error.message);
        })

    }

    render() {
        let {questions_list} = this.state;
        return (
            <div className="card text-white bg-primary">
                <div className="card-header text-center"><b>User's asked Questions </b></div>
                <div className="card-body text-dark">
                    {
                        questions_list.map((question, index) => {
                            return (
                                <div className="card text-dark bg-light">
                                    <div className="card-header text-capitalize">
                                        {index + 1}. <b>{question.question}</b>
                                    </div>
                                    <div className="container">

                                        {question.answers.map((answer) => {
                                            return (
                                                <div className="card text-white bg-dark">
                                                    <div className="card-header">
                                                        Answer: <b className="text-capitalize">{answer.answer}</b>
                                                    </div>
                                                    <div className="card-footer text-light text-center">
                                                        by: {answer.user.f_name} {answer.user.l_name}
                                                    </div>
                                                </div>

                                            );
                                        })}

                                        <form
                                            autoComplete="off"
                                            onSubmit={(e) => {
                                                this.submitAnswer(e, question);
                                            }}
                                        >
                                            <div className="form-group mt-3">
                                                <label htmlFor="exampleInputEmail1">Your Answer</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Enter your answer"
                                                    name="answer"
                                                    onChange={(event) => {
                                                        this.setState({answer: event.target.value});
                                                    }}
                                                    value={this.state.answerValue}
                                                />
                                                <div className="fashion-buttons text-left">
                                                    <button type="submit" className="btn fashion-btn ">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default QuestionsBoard;