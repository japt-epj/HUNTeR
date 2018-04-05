import axios from 'axios';


export default class FormHandler {
    static handleChange(event) {
        const target = event.target;
        const name = target.name;
        const regex = /(option(Answer|Checkbox))([0-3])/;
        const match = regex.exec(name);
        if (match === null) {
            this.setState({[name]: target.value});
        } else if (match[1] === 'optionAnswer') {
            let answerOptionsCopy = this.state.exercise.answerOptions;
            answerOptionsCopy[match[3]].answer = target.value;
            this.setState({answerOptions: answerOptionsCopy});
        } else if (match[1] === 'optionCheckbox') {
            let answerOptionsCopy = this.state.exercise.answerOptions;
            answerOptionsCopy[match[3]].isCorrect = target.checked;
            this.setState({answerOptions: answerOptionsCopy});
        }
    }

    static handleSubmit() {
        let isACheckboxSet = false;
        console.log(this.state.exercise);
        Object.keys(this.state.exercise.answerOptions).forEach(element => {
                isACheckboxSet = isACheckboxSet || this.state.exercise.answerOptions[element].isCorrect;
            }
        );
        if (isACheckboxSet) {
            axios.post(this.state.url, JSON.stringify(this.state.exercise))
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } else {
            alert('Keine Antwort wurde als richtig markiert!');
        }
    }
}