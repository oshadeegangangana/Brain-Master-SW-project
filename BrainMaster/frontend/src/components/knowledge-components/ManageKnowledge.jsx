import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {api, knowledgeAPI} from "../../config/config.json";

class ManageKnowledge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            knowledge_list: [],
            isLoaded: false,
            redirect: null,
        };
    }

    deleteAction(knowledge) {

        const API_URL = api + "/knowledge/" + knowledge.knowledge_id;
        fetch(API_URL, {method: "delete"}).then((result) => {
            toast.info("✔️ Knowledge Deleted Successfully !", {
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
        }).catch(error => {
            console.log(error);
        });
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
                    <h4 className="header-title">Manage Knowledge</h4>
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
                                    <h4 className="header-title">Manage Knowledge</h4>
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            <table className="table table-hover text-center" caption="Give Permission">
                                                <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                    <th scope="col">Index</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">File Name</th>
                                                    <th scope="col">Download</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {knowledge_list.map((knowledge, index) => (
                                                    <tr key={knowledge.knowledge_id}>
                                                        <td scope="row">
                                                            {index + 1}
                                                        </td>
                                                        <td>{knowledge.desc}</td>
                                                        <td>{knowledge.file}</td>
                                                        <td className="text-capitalize"><a target="_blank"
                                                                                           href={knowledgeAPI + knowledge.file}><i
                                                            className="ti-import"/></a></td>
                                                        <td>
                                                            <button
                                                                style={{
                                                                    padding: 0,
                                                                    border: "none",
                                                                    background: "none",
                                                                }}
                                                                onClick={() => this.deleteAction(knowledge)}
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

export default ManageKnowledge;