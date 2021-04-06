import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {api} from "../../config/config.json";
import {Redirect} from "react-router-dom";

class NewsListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            isLoaded: false,
            redirect: null,
        };
    }

    editAction(news) {
        window.sessionStorage.setItem("selectedNewsID:", news.news_id);
    }

    deleteAction(news) {

        const API_URL = api + "/news/" + news.news_id;
        try {
            let result = fetch(API_URL, {method: "delete"});
            toast.info("✔️ News Deleted Successfully !", {
                position: "top-right",
                autoClose: 3000,
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
        } catch (error) {
            console.log(error.message);
        }

    }

    clickAddNews() {
        this.setState({
            redirect: "/add_news"
        });
    }

    componentDidMount() {
        fetch(api + "/news")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    newsList: json,
                });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {isLoaded, newsList} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Manage News</h4>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <ToastContainer/>
                    <div className="row">
                        <div className="col-lg-12 mt-5">
                            <div className="card">
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="header-title">Manage News</div>
                                        </div>
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-3">
                                            <div className="top-buttons">
                                                <button onClick={(e) => this.clickAddNews()} className="btn fashion-button">
                                                    Add new News
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            <table className="table table-hover text-center">
                                                <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                    <th scope="col">Index</th>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {newsList.map((news, index) => (
                                                    <tr key={news.news_id}>
                                                        <td scope="row">
                                                            {index + 1}
                                                        </td>
                                                        <td>{news.title}</td>
                                                        <td>
                                                            <button
                                                                style={{
                                                                    padding: 0,
                                                                    border: "none",
                                                                    background: "none",
                                                                }}
                                                                onClick={() => this.editAction(news)}
                                                            >
                                                                <a href="/edit_news">
                                                                    <i className="ti-pencil"/>
                                                                </a>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                style={{
                                                                    padding: 0,
                                                                    border: "none",
                                                                    background: "none",
                                                                }}
                                                                onClick={() => this.deleteAction(news)}
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

export default NewsListAdmin;