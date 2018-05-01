import Cookies from 'js-cookie';
import config from '../config/config';
import APIHandler from './APIHandler';


export default {
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [target.name]: value
        });
    },

    handleExerciseSubmit() {
        let checkedAnswers = [this.state.checked0, this.state.checked1, this.state.checked2, this.state.checked3];
        let isACheckboxSet = false;
        Object.keys(checkedAnswers).forEach(element => {
                isACheckboxSet = isACheckboxSet || checkedAnswers[element];
            }
        );
        if (isACheckboxSet) {
            let userType = window.location.pathname.split('/')[1];
            if (userType === 'teacher') {
                this.postData(APIHandler.prepareTeacherData(this.state), 'exercise');
            } else {
                this.postData(APIHandler.prepareParticipantData(this.state), 'exercise');
            }
        } else {
            alert('Keine Antwort wurde als richtig markiert!');
        }
    },

    handleQuizSumbit() {
        if (this.state.selectedPositions.size !== 0 && Array.from(this.state.selectedPositions.keys())
            .every(key => this.state.selectedPositions.get(key) !== undefined)) {
            this.postData({
                name: this.state.name,
                locations: Array.from(this.state.selectedPositions.keys()).map(key => {
                    return {'exerciseID': key, 'location': this.state.selectedPositions.get(key)}
                })
            }, 'quiz');
        } else {
            alert('Keine Aufgabe ausgewählt oder eine Location für eine Aufgabe vergessen.');
        }
    },

    handleExecutionSumbit() {
        if (this.state.selectedParticipants.length !== 0 && this.state.selectedQuizId !== undefined) {
            this.postData({
                name: this.state.name,
                quizId: this.state.selectedQuizId,
                participants: this.state.selectedParticipants,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            }, 'execution');
        } else {
            alert('Kein Quiz ausgewählt oder keine Schüler der Execution zugeordnet.');
        }
    },

    handleLoginSubmit() {
        let res = this.postLoginData(this.state);
        res.then(resData => window.localStorage.setItem('HUNTeR', resData.data.tokenType + ' ' + resData.data.token));
        console.log(Cookies.get('HUNTeR'));
    },

    handleNewParticipantSubmit() {
        this.postData(this.state, 'participant');
    }
}