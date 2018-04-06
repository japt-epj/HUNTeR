import config from '../config/config';


export default class FormHandler {
    static handleChange(event) {
        const target = event.target;
        const name = target.name;
        const regex = /(option(Answer|Checkbox))([0-3])/;
        const match = regex.exec(name);
        if (match === null) {
            let exerciseCopy = this.state.exercise;
            exerciseCopy[name] = target.value;
            this.setState({exercise: exerciseCopy});
        } else if (match[1] === 'optionAnswer') {
            let exerciseCopy = this.state.exercise;
            exerciseCopy.answers[match[3]].answer = target.value;
            this.setState({exercise: exerciseCopy});
        } else if (match[1] === 'optionCheckbox') {
            let exerciseCopy = this.state.exercise;
            exerciseCopy.answers[match[3]].checked = target.checked;
            this.setState({exercise: exerciseCopy});
        } else {
            console.error('Event could not be handled: ' + event);
        }
    }

    static postData(data, exerciseID) {
        fetch(config.baseurl + 'exercise/' + exerciseID, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()
        ).catch(err => console.error('Error:', err)
        ).then(res => {
            console.log('Success:', res)
        });
    }

    static handleSubmit() {
        let isACheckboxSet = false;
        Object.keys(this.state.exercise.answers).forEach(element => {
                isACheckboxSet = isACheckboxSet || this.state.exercise.answers[element].checked;
            }
        );
        if (isACheckboxSet) {
            let userType = window.location.pathname.split('/')[1] + '/';
            if (userType === 'teacher/') {
                FormHandler.postData(this.state.exercise, this.state.exercise.exerciseID);
            } else {
                let exercise = {
                    exerciseID: this.state.exercise.exerciseID,
                    answers: this.state.exercise.answers.map(element => element.checked)
                };
                FormHandler.postData(exercise, this.state.exercise.exerciseID)
            }
        } else {
            alert('Keine Antwort wurde als richtig markiert!');
        }
    }
}