import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../config/config.json";

class AdminGkPaperList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gkPaperList: [],
            paper_type: "gk",
            isLoaded: false,
            redirect: null,
        };
    }
    componentDidMount() {
        const adminUser = sessionStorage.getItem("activeUserID:");
        fetch(api + "/iq_2/" + adminUser, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                paper_type: this.state.paper_type ,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    gkPaperList: json,
                });
            });
    }

    deleteAction(paper) {

        const API_URL = api + "/paper/" + paper.paper_id;

        try {
            let result = fetch(API_URL, { method: "delete" });
            toast.info("✔️ Paper Deleted Successfully !", {
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

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }
        let { isLoaded, gkPaperList } = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Manage Your GK Papers</h4>
                    Loading...
                </div>
            );
        } else {
            return (
                <div>
                    <ToastContainer />
                    <div className="row">
                        <div className="col-lg-12 mt-5">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Manage Your GK Papers</h4>
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            <table className="table table-hover text-center">
                                                <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                    <th scope="col">Index</th>
                                                    <th scope="col">Paper Title</th>
                                                    <th scope="col">Paper Type</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {gkPaperList.map((paper) => (
                                                    <tr key={paper.paper_id}>
                                                        <th scope="row">
                                                            {gkPaperList.indexOf(paper) + 1}
                                                        </th>
                                                        <td>{paper.paper_name}</td>
                                                        <td className="text-uppercase">{paper.paper_type}</td>
                                                        <td className="text-capitalize">{paper.category}</td>
                                                        <td>
                                                            <button
                                                                style={{
                                                                    padding: 0,
                                                                    border: "none",
                                                                    background: "none",
                                                                }}
                                                                onClick={() => this.deleteAction(paper)}
                                                            >
                                                                <i className="ti-trash" />
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

export default AdminGkPaperList;