export default class FormHandler {
    static handleChange(event) {
        const target = event.target;
        const name = target.name;
        const regex = /(option(Answer|Checkbox))([0-3])/;
        const match = regex.exec(name);
        if (match === null) {
            this.setState({[name]: target.value});
        } else if (match[1] === 'optionAnswer') {
            let answerOptionsCopy = this.state.exercise.answers;
            answerOptionsCopy[match[3]].answers = target.value;
            this.setState({answers: answerOptionsCopy});
        } else if (match[1] === 'optionCheckbox') {
            let answerOptionsCopy = this.state.exercise.answers;
            answerOptionsCopy[match[3]].isCorrect = target.checked;
            this.setState({answers: answerOptionsCopy});
        }
    }

    static handleSubmit() {
        let isACheckboxSet = false;
        console.log(this.state.exercise);
        Object.keys(this.state.exercise.answers).forEach(element => {
                isACheckboxSet = isACheckboxSet || this.state.exercise.answers[element].isCorrect;
            }
        );
        if (isACheckboxSet) {
            fetch('http://' + window.location.hostname + ':8080/api/exercise/' + window.location.pathname, {
                method: 'POST',
                body: JSON.stringify(this.state.exercise),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()
            ).catch(err => console.error('Error:', err)
            ).then(res => console.log('Success:', res));
        } else {
            alert('Keine Antwort wurde als richtig markiert!');
        }
    }
}