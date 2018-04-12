import APIHandler from './APIHandler';


export default class FormHandler {
    static handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    static handleSubmit() {
        let checkedAnswers = [this.state.checked0, this.state.checked1, this.state.checked2, this.state.checked3];
        let isACheckboxSet = false;
        Object.keys(checkedAnswers).forEach(element => {
                isACheckboxSet = isACheckboxSet || checkedAnswers[element];
            }
        );
        if(isACheckboxSet){
            let userType = window.location.pathname.split('/')[1];
            if (userType === 'teacher') {
                this.postExerciseData(APIHandler.prepareTeacherData(this.state));
            } else {
                this.postExerciseData(APIHandler.prepareStudentData(this.state));
            }
        } else {
            alert('Keine Antwort wurde als richtig markiert!');
        }
    }
}