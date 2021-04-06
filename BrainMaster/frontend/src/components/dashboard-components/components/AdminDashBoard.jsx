import React, {Component} from 'react';
import AdsGivePermission from "../../advertisement-components/AdsGivePermission";
import GiveQuestionPermission from "../../questions-components/GiveQuestionPermission";
import ManageKnowledge from "../../knowledge-components/ManageKnowledge";

class AdminDashBoard extends Component {
    render() {
        return (
            <div>
                <h4 className="text-center">Admin Dashboard </h4>
                <br />
                <AdsGivePermission/>
                <GiveQuestionPermission/>
                <ManageKnowledge/>
            </div>
        );
    }
}

export default AdminDashBoard;