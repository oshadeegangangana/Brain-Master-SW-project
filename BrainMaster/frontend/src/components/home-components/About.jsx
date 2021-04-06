import React, {Component} from 'react';
import './about.css'

class About extends Component {
    render() {
        return (
            <div className="about-section paddingTB60 gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-sm-6">
                            <div className="about-title clearfix">
                                <h1>About <span>Brain Master</span></h1>
                                <h3>Where ideas born... </h3>
                                <p className="about-paddingB">Technology services are professional services designed to facilitate the use of technology by enterprises and end users. Technology services provide specialized technology-oriented solutions by combining the processes and functions of software, hardware, networks, telecommunications, and electronics.
                                     </p>
                                <p>“Whoever you are .. we have the solution you need ..’’</p>
                                <div className="about-icons">
                                    <ul>
                                        <li><a href="https://www.facebook.com/" target="_blank"><i id="social-fb" className="fa fa-facebook-square fa-3x social" /></a> </li>
                                        <li><a href="https://linkedin.com/" target="_blank"><i id="social-tw" className="fa fa-linkedin-square fa-3x social" /></a> </li>
                                        <li> <a href="https://www.youtube.com/" target="_blank"><i id="social-gp" className="fa fa-youtube-square fa-3x social" /></a> </li>
                                        <li> <a href="https://mail.google.com" target="_blank"><i id="social-em" className="fa fa-envelope-square fa-3x social" /></a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;