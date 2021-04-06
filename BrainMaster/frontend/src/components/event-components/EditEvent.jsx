import React, {Component} from 'react';
import {api} from "../../config/config.json";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";

class EditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: [],
            title: null,
            desc: null,
            date: null,
            venue: null,
            added_by: null,
            redirect: null,
        };
    }

    componentDidMount() {
        let event_id = sessionStorage.getItem("selectedEventID:");
        this.setState({added_by: sessionStorage.getItem("activeUserID:")});
        fetch(api + "/event/" + event_id)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    event: json,
                    title: json.title,
                    desc: json.desc,
                    date: json.date,
                    venue: json.venue,
                    added_by: json.added_by,
                });
            });
    }

    clickBack() {
        this.setState({
            redirect: '/admin_event_list',
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.postData().then(r => {
            setTimeout(
                function () {
                    this.setState({redirect: "/admin_event_list"});
                }.bind(this),
                2000
            );
        });
    };

    async postData() {
        try {
            await fetch(api + "/event/" + this.state.event.event_id, {
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
            }).then((res) => res.json())
                .then((json) => {
                    if (json.error) {
                        toast.error("🚫 " + json.message, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        return;
                    } else {
                        toast.info("✔️Event Updated Successfully !", {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                });


        } catch (error) {
            console.log(error.message);
        }
    }

    onChangeHandler = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value,
        });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        return (
            <div>
                <ToastContainer/>
                <div className="row">
                    <div className="col-lg-12 mt-5">
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <h4 className="header-title">Update Event</h4>
                                </div>
                                <form onSubmit={this.onSubmitHandler} autoComplete="off">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Event Title"
                                                    id="inputTitle"
                                                    name="title"
                                                    value={this.state.title}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Description</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Description"
                                                    id="inputDescription"
                                                    name="desc"
                                                    value={this.state.desc}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                />
                                            </div>



                                        </div>
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control style-input"
                                                    placeholder="Event Date"
                                                    id="inputDate"
                                                    name="date"
                                                    value={this.state.date}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">
                                                    Venue
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Venue"
                                                    id="inputVenue"
                                                    name="venue"
                                                    value={this.state.venue}
                                                    onChange={this.onChangeHandler}
                                                    required
                                                />
                                            </div>

                                            <div className="form-check text-left">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="exampleCheck1"
                                                    required
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="exampleCheck1"
                                                >
                                                    Confirmation
                                                </label>
                                            </div>

                                            <div className="fashion-buttons text-left">
                                                <button type="submit" className="btn fashion-btn ">
                                                    Update Event
                                                </button>
                                                <button onClick={(e)=>this.clickBack()} className="btn fashion-btn ">
                                                    Back to Event List
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

export default EditEvent;