import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {api, knowledgeAPI} from "../../config/config.json";

class KnowledgeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            knowledge_list: [],
            isLoaded: false,
            redirect: null,
        };
    }

    componentDidMount() {
        fetch(api + "/knowledge")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    knowledge_list: json,
                    isLoaded: true,
                });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {isLoaded, knowledge_list} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Knowledge List</h4>
                    Loading...
                </div>
            );
        } else {
            return (
                <div className="card bg-dark text-light">
                    <ToastContainer/>
                    <div className="card-header text-light text-center"><b>Knowledge</b></div>
                    <div className="card-body text-light">

                        <div className="single-table">
                            <div className="table-responsive">
                                <table className="table table-hover text-center" caption="Give Permission">
                                    <thead className="text-uppercase bg-light">
                                    <tr className="text-dark">
                                        <th scope="col">Description</th>
                                        <th scope="col">Download</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {knowledge_list.map((knowledge, index) => (
                                        <tr key={knowledge.knowledge_id}>
                                            <td>{knowledge.desc}</td>
                                            <td className="text-capitalize"><a target="_blank"
                                                                               href={knowledgeAPI + knowledge.file}><i
                                                className="ti-import"/></a></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
    }
}

export default KnowledgeList;