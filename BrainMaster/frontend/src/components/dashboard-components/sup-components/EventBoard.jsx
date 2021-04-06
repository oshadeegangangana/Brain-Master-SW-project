import React, {Component} from 'react';
import {api} from "../../../config/config.json";

class EventBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events_list: [],
        };
    }

    componentDidMount() {

       fetch(api+ "/event/get_all/dashboard") 
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    events_list: json,
                });
            });

    }

    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    render() {
        let {events_list} = this.state;
        return (
            <div className="card bg-warning text-dark">
                <div className="card-header text-dark text-center"><b>Events Board</b></div>
                <div className="card-body text-dark">
                    {events_list.map((event, index) => (
                        <p className="card text-white bg-primary">
                            <div className="card-header text-capitalize">
                                {index + 1}. <b>{event.title}</b>
                            </div>
                            <p className="card-body text-white">
                                <h5 className="card-title text-capitalize">{event.desc}</h5>
                                <p className="card-text text-white">
                                    - Venue : {event.venue} <br/>
                                    - Date : {event.date} </p>
                            </p>
                        </p>
                    ))}
                </div>
            </div>
        );
    }
}

export default EventBoard;