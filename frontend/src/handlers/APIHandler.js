import config from "../config/config";

export default class APIHandler {
    static getExerciseData(exerciseID) {
        return fetch(config.baseurl + 'exercise/' + exerciseID, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json()
        ).catch(err => console.warn(err));
    }

    static getExerciseQRCode(exerciseID) {
        return fetch(config.baseurl + 'QRCode/' + exerciseID, {
                method: 'GET',
                headers: {
                    "Accept": "image/jpeg",
                    'Content-Type': 'image/jpeg'
                }
            }
        ).then(res => res.json()
        ).catch(err => console.warn(err));
    }

    static getExercises() {
        return fetch(config.baseurl + 'exercise/', {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json()
        ).catch(err => console.warn(err));
    }

    static postData(data, path) {
        fetch(config.baseurl + path + '/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()
        ).catch(err => console.error('Error:', err)
        ).then(res => {
            console.log('Success:' + res);
            this.setState({fireRedirect: true});
        });
    }

    static prepareTeacherData(data) {
        return {
            exerciseID: data.exercise,
            title: data.title,
            question: data.question,
            answers: [
                {text: data.answer0, checked: data.checked0},
                {text: data.answer1, checked: data.checked1},
                {text: data.answer2, checked: data.checked2},
                {text: data.answer3, checked: data.checked3}]
        }
    }

    static prepareStudentData(data) {
        return {
            exerciseID: data.exerciseID,
            answers: [data.checked0, data.checked1, data.checked2, data.checked3]
        }
    }
}