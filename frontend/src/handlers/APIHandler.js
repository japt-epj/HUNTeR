import axios from 'axios';
import fileDownload from 'js-file-download';

import config from '../config/config';

export default class APIHandler {
    static getExerciseData(exerciseID) {
        return axios.get(config.baseurl + 'exercise/' + exerciseID, {
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                }
            }
        ).catch(err => console.warn(err));
    }

    static getQRCode(exerciseID) {
        return axios.get(config.baseurl + 'qrCode/' + exerciseID, {
                headers: {
                    "Accept": "image/png",
                    'Content-Type': 'image/png'
                },
                responseType: 'arraybuffer'
            }
        ).then(res => fileDownload(res.data, 'qrCode' + exerciseID + '.png')
        ).catch(err => console.warn(err));
    }

    static getExercises(begin, end) {
        let requestURL = config.baseurl + 'exercise/';
        if (begin !== undefined && end !== undefined) {
            requestURL += '?start=' + begin + 'end=' + end;
        }
        return axios.get(requestURL, {
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                }
            }
        ).catch(err => console.warn(err));
    }

    static getStudents() {
        return axios.get(config.baseurl + 'person/', {
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                }
            }
        ).catch(err => console.warn(err));
    }

    static postData(data, path) {
        axios.post(config.baseurl + path + '/', data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).catch(err => console.error('Error:', err)
        ).then(res => {
            this.setState({fireRedirect: true});
        });
    }

    static prepareTeacherData(data) {
        return {
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