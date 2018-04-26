import APIHandler from './APIHandler';


export default{
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
                this.postData(APIHandler.prepareStudentData(this.state), 'exercise');
            }
        } else {
            alert('Keine Antwort wurde als richtig markiert!');
        }
    },

    handleQuizSumbit(){
        this.postData({
            title: this.state.title,
            quizId: this.state.selectedQuizId,
            exercises: this.state.selectedExercises,
            students: this.state.selectedStudents,
            startMoment: this.state.startMoment,
            endDate: this.state.dueMoment
        }, 'execution')
    },

    handleLoginSubmit() {
        this.postData(this.state, 'login');
    },

    handleNewStudentSubmit() {
        this.postData(this.state, 'student');
    }
}