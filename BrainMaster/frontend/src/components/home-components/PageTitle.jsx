import React, {Component} from 'react';
import ProfileOptions from "./ProfileOptions";

class PageTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
        };
    }
    render() {
        return (
            <div className="page-title-area">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <div className="breadcrumbs-area clearfix">
                            <h4 className="page-title pull-left"> <b>Brain Master</b> | where ideas born</h4>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="top-buttons">
                            <a href={"/about"}><button className="btn fashion-button">About us</button></a>
                        </div>
                    </div>


                    <div className="col-sm-1">
                        <div className="breadcrumbs-area clearfix">
                            <h4 className="page-title pull-left text-uppercase">
                                {this.props.role}
                            </h4>
                        </div>
                    </div>

                    <ProfileOptions f_name = {this.props.f_name}/>

                </div>
            </div>
        );
    }
}

export default PageTitle;