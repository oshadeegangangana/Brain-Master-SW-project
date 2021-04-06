import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import { api } from "../../config/config.json";

class AddIqPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paper_name: null,
            paper_type: "iq",
            category: null,
            added_by: null,
            redirect: null,
        };
    }
    componentDidMount() {
        this.setState({
            added_by: sessionStorage.getItem("activeUserID:"),
        });
    }
    addPaper = (e) => {
        e.preventDefault();

        fetch(api + "/paper", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                paper_name: this.state.paper_name,
                paper_type: this.state.paper_type,
                category: this.state.category,
                added_by: this.state.added_by,
            }),
        }).then((res) => res.json()).then((json) => {
            if(json.error){
                toast.error("🚫 "+ json.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.setState({
                    paper_name: ""
                });
            }
            else {
                fetch(api + "/paper2/" + this.state.paper_name)
                    .then((res) => res.json())
                    .then((json) => {
                        window.sessionStorage.setItem(
                            "added_paper_id:",
                            json.paper_id
                        );
                        toast.info("✔️ Paper Added Successfully !", {
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
                                    redirect: "/add_iq_q",
                                });
                            }.bind(this),
                            2000
                        );

                    });
            }

        }).catch(error => {
            console.log(error.message);
        })

    };
    render() {
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
                                <div>
                                    <h2 className="header-title">Add IQ Paper</h2>
                                </div>
                                <br/>
                                <div>
                                    <h2 className="header-title">Add Paper Details</h2>
                                    <small> Add Questions according to 10 minutes of time limit </small>
                                    <br />
                                    <br />
                                </div>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.addPaper(e);
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Paper Name/Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Paper Name"
                                                    name="paper_name"
                                                    onChange={(event) => {
                                                        this.setState({paper_name: event.target.value});
                                                    }}
                                                    value={this.state.paper_name}
                                                    required
                                                />
                                                <small id="paperHelp" className="form-text text-muted">
                                                    Enter Paper Title. This must be unique name to identify.
                                                </small>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">
                                                    Category
                                                </label>
                                                <select
                                                    className="custom-select style-input select-style"
                                                    name="category"
                                                    id="category"
                                                    value={this.state.category}
                                                    onChange={(event) => {
                                                        this.setState({category: event.target.value});
                                                    }}
                                                    required
                                                >
                                                    <option value="" selected="selected"> Select Category</option>
                                                    <option value="age related" > Age Related</option>
                                                    <option value="number sequence" > Number Sequence</option>
                                                    <option value="speed related" > Speed Related</option>
                                                    <option value="time related" > Time related</option>
                                                    <option value="logical" > Logical</option>
                                                </select>
                                            </div>

                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Submit
                                                </button>
                                            </div>

                                        </div>

                                        <div className="col-md-6">

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

export default AddIqPaper;