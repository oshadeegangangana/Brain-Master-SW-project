import React, {Component} from 'react';
import {api} from "../../config/config.json";
import {toast, ToastContainer} from "react-toastify";
import {Redirect} from "react-router-dom";

class AddAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: "",
            ad_img: null,
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
            ad_img: ev.target.files[0],
        })
    }

    addAd = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("desc", this.state.desc);
        formData.append("ad_img", this.state.ad_img);
        formData.append("added_by", this.state.added_by);
        console.log(this.state.ad_img)

        fetch(api + "/ad/" , {
            method: "post",
            body: formData,
        }).then((res) => res.json()).then((json) => {
            console.log("Result: " + json);

            toast.info("✔️ Advertisement Added Successfully !", {
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
                                    <h2 className="header-title">Publish Advertisement</h2>
                                </div>
                                <br/>
                                <form
                                    autoComplete="off"
                                    onSubmit={(e) => {
                                        this.addAd(e);
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-md-6">

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Description</label>
                                                <input
                                                    type="text"
                                                    className="form-control style-input"
                                                    placeholder="Advertisement Description"
                                                    name="desc"
                                                    onChange={(event) => {
                                                        this.setState({desc: event.target.value});
                                                    }}
                                                    value={this.state.desc}
                                                    required
                                                />
                                                <small>add the description of the advertisement</small>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Advertisement Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control style-input"
                                                    name="ad_img"
                                                    onChange={this.fup.bind(this)}
                                                    accept=".jpg,.jpeg,.png"
                                                    required
                                                />
                                                <small>add the Image of the advertisement (jpg, jpeg, png). Height & Width ratio should be 2:3</small>
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

export default AddAd;