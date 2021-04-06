import React, {Component} from 'react';
import {adsAPI, api} from "../../config/config.json";
import {Redirect} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

class QuestionsListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_user_id: null,
            questions_list: [],
            isLoaded: false,
            redirect: null,
        };
    }

    componentDidMount() {
        this.setState({
            active_user_id: sessionStorage.getItem("activeUserID:"),
        });
        fetch(api + "/question/get_permission/accept_decline/questions")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    questions_list: json,
                    isLoaded: true,
                });
            });
    }

    deleteAction(question) {

        const API_URL = api + "/question/" + question.question_id;
        fetch(API_URL, {method: "delete"}).then((result) => {
            toast.info("✔️ Question Deleted Successfully !", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(result);
            setTimeout(
                function () {
                    //Start the timer
                    this.componentDidMount(); //After 1 second
                }.bind(this),
                1000
            );
        }).catch(error => {
            console.log(error);
        });


    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {isLoaded, questions_list} = this.state;
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
                                    <h4 className="header-title">Manage Questions - Remove</h4>
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            <table className="table table-hover text-center" caption="Give Permission">
                                                <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                    <th scope="col">Index</th>
                                                    <th scope="col">Question</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {questions_list.map((question, index) => (
                                                    <tr key={questions_list.question_id}>
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
                                                                onClick={() => this.deleteAction(question)}
                                                            >
                                                                <i className="ti-trash"/>
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

export default QuestionsListAdmin;