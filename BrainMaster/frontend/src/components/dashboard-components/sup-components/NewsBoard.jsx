import React, {Component} from 'react';
import {api} from "../../../config/config.json";

class NewsBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news_list: [],
        };
    }

    componentDidMount() {

        fetch(api + "/news/get_all/dashboard")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    news_list: json,
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
        let {news_list} = this.state;
        return (
            <div className="card bg-warning text-dark">
                <div className="card-header text-dark text-center"><b>News Board</b></div>
                <div className="card-body text-dark">
                    {news_list.map((news, index) => (
                    <div className="card text-white bg-success">
                        <div className="card-header text-capitalize">
                            {index+1}. <b>{news.title}</b>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-capitalize">{news.news_body}</h5>
                            <p className="card-text">added date: {this.formatDate(news.createdAt)}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default NewsBoard;