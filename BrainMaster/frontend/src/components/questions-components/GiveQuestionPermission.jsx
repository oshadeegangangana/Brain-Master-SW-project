import React, {Component} from 'react';
import {api} from "../../config/config.json";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";

class GiveQuestionPermission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_user_id: null,
            questions_pending_list: [],
            isLoaded: false,
            redirect: null,
        };
    }

    approveAction(question) {
        fetch(api + "/question/" + question.question_id, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                status: "approved",
            }),
        }).then((result) => {
            console.log(result);
            toast.success("✔️ Question Approved !", {
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
                    this.componentDidMount(); //After 1 second
                }.bind(this),
                1000
            );
        }).catch((error) => {
            console.log(error);
        });
    }

    declineAction(question) {
        fetch(api + "/question/" + question.question_id, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                status: "declined",
            }),
        }).then((result) => {
            console.log(result);
            toast.warn("✔️ Question Declined !", {
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
                    this.componentDidMount(); //After 1 second
                }.bind(this),
                1000
            );
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.setState({
            active_user_id: sessionStorage.getItem("activeUserID:"),
        });
        fetch(api + "/question/get_pending/questions")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    questions_pending_list: json,
                    isLoaded: true,
                });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {isLoaded, questions_pending_list} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Manage Questions</h4>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <ToastContainer/>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Manage Questions - Give Permission</h4>
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            <table className="table table-hover text-center" caption="Give Permission">
                                                <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                    <th scope="col">Index</th>
                                                    <th scope="col">Question</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Approve</th>
                                                    <th scope="col">Decline</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {questions_pending_list.map((question, index) => (
                                                    <tr key={question.question_id}>
                                                        <td scope="row">
                                                            {index + 1}
                                                        </td>
                                                        <td>{question.question}</td>
                                                        <td className="text-capitalize">{question.status}</td>
                                                        <td>
                                                            <button
                                                                style={{
                                                                    padding: 0,
                                                                    border: "none",
                                                                    background: "none",
                                                                }}
                                                                onClick={() => this.approveAction(question)}
                                                            >
                                                                <i className="ti-check"/> Approve
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                style={{
                                                                    padding: 0,
                                                                    border: "none",
                                                                    background: "none",
                                                                }}
                                                                onClick={() => this.declineAction(question)}
                                                            >
                                                                <i className="ti-close"/> Decline
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
            );
        }
    }
}

export default GiveQuestionPermission;