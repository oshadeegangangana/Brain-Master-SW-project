import React, {Component} from 'react';
import {api} from "../../config/config.json";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";

class AddKnowledge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: "",
            file: null,
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
            redirect: "/"
        })
    }

    fup(ev){
        this.setState({
            file: ev.target.files[0],
        })
    }

    addKnowledge = (e) => {
        e.preventDefault();

        console.log(this.state.file)

        let formData = new FormData();
        formData.append("desc", this.state.desc);
        formData.append("file", this.state.file);
        formData.append("added_by", this.state.added_by);

        fetch(api + "/knowledge/" , {
            method: "post",
            body: formData,
        }).then((res) => res.json()).then((json) => {
            console.log("Result: " + json);

            toast.info("✔️ Knowledge Added Successfully !", {
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
                                    <h2 className="header-title">Upload Knowledge Documents</h2>
                                </div>
                                <br/>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.addKnowledge(e);
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Description</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Knowledge Description"
                                                    name="desc"
                                                    onChange={(event) => {
                                                        this.setState({desc: event.target.value});
                                                    }}
                                                    value={this.state.desc}
                                                    required
                                                />
                                                <small>add the description of the Knowledge</small>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Knowledge File</label>
                                                <input
                                                    type="file"
                                                    className="form-control style-input"
                                                    name="file"
                                                    onChange={this.fup.bind(this)}
                                                    accept=".pdf,.docx"
                                                    required
                                                />
                                                <small>add the File of the Knowledge (pdf, docx)</small>
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

export default AddKnowledge;