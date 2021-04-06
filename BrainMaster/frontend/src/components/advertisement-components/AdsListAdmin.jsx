import React, {Component} from 'react';
import {adsAPI, api} from "../../config/config.json";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";

class AdsListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active_user_id: null,
            ads_list: [],
            isLoaded: false,
            redirect: null,
        };
    }

    deleteAction(ad) {

        const API_URL = api + "/ad/" + ad.ad_id;
        fetch(API_URL, {method: "delete"}).then((result) => {
            toast.info("✔️ Advertisement Deleted Successfully !", {
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
        this.setState({
            active_user_id: sessionStorage.getItem("activeUserID:"),
        });
        fetch(api + "/ad")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    ads_list: json,
                    isLoaded: true,
                });
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {isLoaded, ads_pending_list, ads_list} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <h4 className="header-title">Manage Advertisements</h4>
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
                                    <h4 className="header-title">Manage Advertisements - Remove</h4>
                                    <div className="single-table">
                                        <div className="table-responsive">
                                            <table className="table table-hover text-center" caption="Give Permission">
                                                <thead className="text-uppercase bg-theme">
                                                <tr className="text-white">
                                                    <th scope="col">Index</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">File name</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">View</th>
                                                    <th scope="col">Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {ads_list.map((ad, index) => (
                                                    <tr key={ad.user_id}>
                                                        <td scope="row">
                                                            {index + 1}
                                                        </td>
                                                        <td>{ad.desc}</td>
                                                        <td><img width={100} height={100}
                                                                 src={adsAPI + ad.ad_img}
                                                                 alt={ad.ad_img}/></td>
                                                        <td className="text-capitalize">{ad.status}</td>
                                                        <td className="text-capitalize"><a target="_blank"
                                                                                           href={adsAPI + ad.ad_img}><i
                                                            className="ti-eye"/></a></td>

                                                        <td>
                                                            <button
                                                                style={{
                                                                    padding: 0,
                                                                    border: "none",
                                                                    background: "none",
                                                                }}
                                                                onClick={() => this.deleteAction(ad)}
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

export default AdsListAdmin;