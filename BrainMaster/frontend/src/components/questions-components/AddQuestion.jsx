import React, {Component} from 'react';
import {api} from "../../config/config.json";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";

class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: null,
            asked_by: null,
            redirect: null,
        };
    }
    componentDidMount() {
        this.setState({
            asked_by: sessionStorage.getItem("activeUserID:"),
        });
    }
    clickBack() {
        this.setState({
            redirect: "/"
        })
    }

    addQuestion = (e) => {
        e.preventDefault();

        fetch(api + "/question" , {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                question: this.state.question,
                asked_by: this.state.asked_by,
            }),
        }).then((res) => res.json()).then((json) => {
            console.log("Result: " + json);

            toast.info("✔️ Question Posted Successfully !", {
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
                    });
                }.bind(this),
                3000
            );

        }).catch(error => {
            console.log(error.message);
        })

    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>;
        }
        return (
            <div>
                <ToastContainer/>
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h2 className="header-title">Post User Question</h2>
                                </div>
                                <br/>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.addQuestion(e);
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Question</label>
                                                <textarea
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="User Question"
                                                    name="question"
                                                    onChange={(event) => {
                                                        this.setState({question: event.target.value});
                                                    }}
                                                    value={this.state.question}
                                                    required
                                                />
                                            </div>

                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Submit
                                                </button>
                                                <button onClick={(e) => this.clickBack()} className="btn fashion-button">
                                                    Back to Home
                                                </button>
                                            </div>


                                        </div>
                                        <div className="col-md-6" >

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

export default AddQuestion;