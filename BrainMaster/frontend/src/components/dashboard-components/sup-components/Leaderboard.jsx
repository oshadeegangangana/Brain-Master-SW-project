import React, {Component} from 'react';
import {api} from "../../../config/config.json";

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranked_users: [],
        };
    }
    componentDidMount() {

        fetch(api + "/user/rank/leaderboard")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    ranked_users: json,
                });
            });

    }

    render() {
        let {ranked_users} = this.state;
        return (
            <div>
                <div className="card bg-danger text-dark">
                    <div className="card-header text-light text-center"><b>Leaderboard</b></div>
                    <div className="card-body">
                        <div className="single-table">
                            <div className="table-responsive">
                                <table className="table text-center">
                                    <thead className="text-uppercase bg-dark">
                                    <tr className="text-white">
                                        <th scope="col">Rank</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Marks</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-white">
                                    {ranked_users.map((user, index) => (
                                        <tr key={user.user_id}>
                                            <th scope="row">
                                                {index + 1}
                                            </th>
                                            <td className="text-left">{user.f_name} {user.l_name}</td>
                                            <td>{user.total_marks}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Leaderboard;