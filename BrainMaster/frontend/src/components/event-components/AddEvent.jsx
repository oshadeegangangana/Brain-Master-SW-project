import React, { Component } from 'react';
import {api} from "../../config/config.json";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";

class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            desc: null,
            date: null,
            venue: null,
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
            redirect: "/admin_event_list"
        })
    }

    addEvent = (e) => {
        e.preventDefault();


        fetch(api + "/event/" , {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                title: this.state.title,
                desc: this.state.desc,
                date: this.state.date,
                venue: this.state.venue,
                added_by: this.state.added_by,
            }),
        }).then((res) => res.json()).then((json) => {
            console.log("Result: " + json);

            toast.info("✔️ Event Added Successfully !", {
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
                        redirect: "/admin_event_list",
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
                                    <h2 className="header-title">Add Event</h2>
                                </div>
                                <br/>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.addEvent(e);
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Event Title"
                                                    name="title"
                                                    onChange={(event) => {
                                                        this.setState({title: event.target.value});
                                                    }}
                                                    value={this.state.title}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Description</label>
                                                <textarea
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Event Description"
                                                    name="desc"
                                                    onChange={(event) => {
                                                        this.setState({desc: event.target.value});
                                                    }}
                                                    value={this.state.desc}
                                                    required
                                                />
                                                <small>please add the description of the event</small>
                                            </div>


                                        </div>
                                        <div className="col-md-6" >
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Event Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control style-input"
                                                    name="date"
                                                    onChange={(event) => {
                                                        this.setState({date: event.target.value});
                                                    }}
                                                    value={this.state.date}
                                                    required
                                                />

                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Venue</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Event Venue"
                                                    name="venue"
                                                    onChange={(event) => {
                                                        this.setState({venue: event.target.value});
                                                    }}
                                                    value={this.state.venue}
                                                    required
                                                />
                                            </div>

                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Submit
                                                </button>
                                                <button onClick={(e) => this.clickBack()} className="btn fashion-button">
                                                    Back to Manage Events
                                                </button>
                                            </div>
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

export default AddEvent;