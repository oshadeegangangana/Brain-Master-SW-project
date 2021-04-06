import React, {Component} from "react";
import AdsGivePermission from "./AdsGivePermission";
import AdsListAdmin from "./AdsListAdmin";

class ManageAd extends Component {

    render() {
        return (
            <div>
                <AdsGivePermission/>
                <AdsListAdmin/>
            </div>
        );
    }
}

export default ManageAd;