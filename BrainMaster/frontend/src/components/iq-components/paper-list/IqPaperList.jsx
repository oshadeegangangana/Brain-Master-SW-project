import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {api} from "../../../config/config.json";
import {ToastContainer} from "react-toastify";

class IqPaperList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iqPaperList: [],
            paper_type: "iq",
            category: "age related",
            isLoaded: false,
            redirect: null,
        };
    }

    componentDidMount() {
        fetch(api + "/iq_2", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                paper_type: this.state.paper_type,
                category: this.state.category,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    iqPaperList: json,
                });
            });
    }

    getTest(paper) {
        window.sessionStorage.setItem("selectedIqPaperID:", paper.paper_id);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {isLoaded, iqPaperList} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">IQ Papers</h4>
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
                                    <h4 className="header-title">IQ Papers</h4>

                                    <div className="row">

                                        {iqPaperList.map((paper) => (
                                            <div className="col-sm-4">
                                                <div className="card text-white bg-dark mb-3"
                                                     key={paper.paper_id}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">
                                                            {iqPaperList.indexOf(paper) + 1}. {paper.paper_name}
                                                        </h5>
                                                        <p className="card-text text-white">
                                                            - Paper Type : <span
                                                            className="text-uppercase">{paper.paper_type}</span> <br/>
                                                            - Paper Category : <span
                                                            className="text-capitalize">{paper.category}</span> <br/>
                                                            - include 5 MCQ Questions <br/>
                                                            - include 5 Structured Questions
                                                        </p>
                                                        <button
                                                            style={{
                                                                padding: 0,
                                                                border: "none",
                                                                background: "none",
                                                            }}
                                                            onClick={() => this.getTest(paper)}
                                                        ><a href="/ins_iq" className="btn btn-primary"
                                                            onClick={() => this.deleteAction(paper)}>
                                                            <i className="ti-notepad"/> Get Test </a>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
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

export default IqPaperList;