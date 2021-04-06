import React, {Component} from 'react';
import { api } from "../../config/config.json";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";

class AddNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            news_body: null,
            added_by: null,
            redirect: null,
        };
    }

    componentDidMount() {
        this.setState({
            added_by: sessionStorage.getItem("activeUserID:"),
        });
    }

    clickBack() {
        this.setState({
            redirect: "/admin_news_list"
        })
    }

    addNews = (e) => {
        e.preventDefault();


        fetch(api + "/news/" , {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title: this.state.title,
                news_body: this.state.news_body,
                added_by: this.state.added_by,
            }),
        }).then((res) => res.json()).then((json) => {
            console.log("Result: " + json);

            toast.info("✔️ News Added Successfully !", {
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
                        redirect: "/admin_news_list",
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
                                    <h2 className="header-title">Add News</h2>
                                </div>
                                <br/>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.addNews(e);
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="News Title"
                                                    name="title"
                                                    onChange={(event) => {
                                                        this.setState({title: event.target.value});
                                                    }}
                                                    value={this.state.title}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">News body</label>
                                                <textarea
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="News body"
                                                    name="news_body"
                                                    onChange={(event) => {
                                                        this.setState({news_body: event.target.value});
                                                    }}
                                                    value={this.state.news_body}
                                                    required
                                                />
                                                <small>please add the content of the news</small>
                                            </div>

                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Submit
                                                </button>
                                                <button onClick={(e) => this.clickBack()} className="btn fashion-button">
                                                    Back to Manage News
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6" />

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

export default AddNews;