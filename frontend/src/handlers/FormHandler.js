import APIHandler from './APIHandler';


export default class FormHandler {
    static handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [target.name]: value
        });
    }

    static handleFormSubmit() {
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
                this.postData(APIHandler.prepareStudentData(this.state), 'exercise');
            }
        } else {
            alert('Keine Antwort wurde als richtig markiert!');
        }
    }

    static handleLoginSubmit() {
        this.postData(this.state, 'login');
    }

    static handleNewStudentSubmit() {
        this.postData(this.state, 'student');
    }
}