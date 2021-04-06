import React, {Component} from 'react';
import { Fade } from "react-slideshow-image";
import "./ad_styles.css";
import {api, adsAPI} from "../../../config/config.json";

const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: false,
};

class Advertisements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ads_list: [],
            isLoaded: false,
            redirect: null,
        };
    }

    componentDidMount() {
        fetch(api + "/ad/approved/dash/ads_panel/get_all")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    ads_list: json,
                    isLoaded: true,
                });
            });
    }

    render() {
        let {isLoaded, ads_list} = this.state;
        if (!isLoaded) {
            return (
                <div>
                    <div className="card-header text-light text-center"><b>Advertisements</b></div>
                    Loading...
                </div>
            );
        } else {
            return (
                <div className="card bg-dark text-light">
                    <div className="card-header text-light text-center"><b>Advertisements</b></div>
                    <div className="card-body text-light">

                        <div className="slide-container">
                            <Fade {...fadeProperties}>
                                {ads_list.map((ad) => (
                                    <div className="each-fade">
                                        <div className="image-container">
                                            <img src={adsAPI+ad.ad_img} alt="Slide 1" />
                                        </div>
                                        <h2>1</h2>
                                    </div>
                                ))}
                            </Fade>
                        </div>


                    </div>
                </div>
            );
        }
    }
}

export default Advertisements;