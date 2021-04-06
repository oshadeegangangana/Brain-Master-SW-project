import React, {Component} from 'react';
import GiveQuestionPermission from "./GiveQuestionPermission";
import QuestionsListAdmin from "./QuestionsListAdmin";

class ManageQuestions extends Component {
    render() {
        return (
            <div>
                <GiveQuestionPermission />
                <QuestionsListAdmin/>

            </div>
        );
    }
}

export default ManageQuestions;