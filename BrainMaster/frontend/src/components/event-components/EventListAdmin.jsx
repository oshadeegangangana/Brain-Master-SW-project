import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {api} from "../../config/config.json";
import {Redirect} from "react-router-dom";

class EventListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            isLoaded: false,
            redirect: null,
        };
    }

    editAction(event) {
        window.sessionStorage.setItem("selectedEventID:", event.event_id);
    }

    deleteAction(event) {

        const API_URL = api + "/event/" + event.event_id;
        try {
            let result = fetch(API_URL, {method: "delete"});
            toast.info("✔️ Event Deleted Successfully !", {
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

    clickAddEvent() {
        this.setState({
            redirect: "/add_event"
        });
    }

    componentDidMount() {
        fetch(api + "/event")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    isLoaded: true,
                    eventList: json,
                });
            });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {isLoaded, eventList} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Manage Events</h4>
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
                                            <div className="header-title">Manage Events</div>
                                        </div>
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-3">
                                            <div className="top-buttons">
                                                <button onClick={(e) => this.clickAddEvent()} className="btn fashion-button">
                                                    Add new Event
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
                                                {eventList.map((event, index) => (
                                                    <tr key={event.event_id}>
                                                        <td scope="row">
                                                            {index + 1}
                                                        </td>
                                                        <td>{event.title}</td>
                                                        <td>
                                                            <button
                                                                style={{
                                                                    padding: 0,
                                                                    border: "none",
                                                                    background: "none",
                                                                }}
                                                                onClick={() => this.editAction(event)}
                                                            >
                                                                <a href="/edit_event">
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
                                                                onClick={() => this.deleteAction(event)}
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

export default EventListAdmin;