import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {api} from "../../config/config.json";

class AddGkQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paper_id: null,
            question: null,
            option_1: null,
            option_2: null,
            option_3: null,
            option_4: null,
            answer: null,
            redirect: null,
            question_no: null,
        };
    }

    componentDidMount() {
        this.setState({
            paper_id: sessionStorage.getItem("added_paper_id:"),
        });
        fetch(api + "/paper2", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                paper_id: sessionStorage.getItem("added_paper_id:"),
            }),
        }).then((res) => res.json()).then((json) => {

            console.log(json.result);

            if ( json.result.count == 10 ) {
                window.sessionStorage.setItem(
                    "added_paper_id:", null
                );
                toast.warn("✔️ Paper Completed !", {
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
                            redirect: "/admin_gk_list",
                        });
                    }.bind(this),
                    2000
                );

            }
            else if ( json.result.count < 10 ) {
                let qno = parseInt(json.result.count) + 1 ;
                this.setState({
                    question_no: qno,
                })
            }

        }).catch(error => {
            console.log(error.message);
        })

    }

    onSubmit = (e) => {
        e.preventDefault();

        this.componentDidMount();
        fetch(api + "/gk", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                paper_id: this.state.paper_id,
                question: this.state.question,
                option_1: this.state.option_1,
                option_2: this.state.option_2,
                option_3: this.state.option_3,
                option_4: this.state.option_4,
                answer: this.state.answer,
            }),
        }).then((res) => res.json()).then((json) => {
            console.log(json);
            toast.info("✔️ Question "+ this.state.question_no +" Added Successfully !", {
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
                    //Start the timer
                    this.reload()
                }.bind(this),
                2000
            );

        }).catch(error => {
            console.log(error.message);
        })

    };

    reload() {
        window.location.reload(false);
    }

    render() {
        let {question_no} = this.state;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        return (
            <div>
                <ToastContainer/>
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">

                                <br/>
                                <div>
                                    <h2 className="header-title">Add Question {question_no}</h2>
                                </div>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.onSubmit(e);
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Question</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Question"
                                                    name="question"
                                                    onChange={(event) => {
                                                        this.setState({question: event.target.value});
                                                    }}
                                                    value={this.state.question}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Option 1</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Option 1"
                                                    name="option_1"
                                                    onChange={(event) => {
                                                        this.setState({option_1: event.target.value});
                                                    }}
                                                    value={this.state.option_1}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Option 3</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Option 3"
                                                    name="option_3"
                                                    onChange={(event) => {
                                                        this.setState({option_3: event.target.value});
                                                    }}
                                                    value={this.state.option_3}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Answer</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Answer"
                                                    name="answer"
                                                    onChange={(event) => {
                                                        this.setState({answer: event.target.value});
                                                    }}
                                                    value={this.state.answer}
                                                    required
                                                />
                                                <small>Please add the correct answer. Not the option number</small>
                                            </div>

                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Submit
                                                </button>
                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Option 2</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Option 2"
                                                    name="option_2"
                                                    onChange={(event) => {
                                                        this.setState({option_2: event.target.value});
                                                    }}
                                                    value={this.state.option_2}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Option 4</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Option 4"
                                                    name="option_4"
                                                    onChange={(event) => {
                                                        this.setState({option_4: event.target.value});
                                                    }}
                                                    value={this.state.option_4}
                                                    required
                                                />
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

export default AddGkQuestion;