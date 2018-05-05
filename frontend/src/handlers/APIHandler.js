import axios from 'axios';
import fileDownload from 'js-file-download';

import config from '../config/config';

import getHeader from './getAxiosHeader';


export default {
    getExerciseArray(exerciseIDs) {
        return axios.get(config.apiURL + 'exercise/' + exerciseIDs, {
                headers: getHeader('application/json')
            }
        ).catch(err => console.warn(err));
    },

    downloadQRCode(exerciseID) {
        return axios.get(config.apiURL + 'qrCode/' + exerciseID, {
                headers: getHeader('image/png'),
                responseType: 'arraybuffer'
            }
        ).then(res => fileDownload(res.data, 'qrCode' + exerciseID + '.png')
        ).catch(err => console.warn(err));
    },

    getExercises(page, limit) {
        let requestURL = config.apiURL + 'exercise/';
        if (page !== undefined && limit !== undefined) {
            requestURL += '?page=' + (page - 1) + '&limit=' + limit;
        }
        return axios.get(requestURL, {
                headers: getHeader('application/json')
            }
        ).catch(err => console.warn(err));
    },

    getQuizzes(page, limit) {
        let requestURL = config.apiURL + 'quiz/';
        if (page !== undefined && limit !== undefined) {
            requestURL += '?page=' + (page - 1) + '&limit=' + limit;
        }
        return axios.get(requestURL, {
                headers: getHeader('application/json')
            }
        ).catch(err => console.warn(err));
    },

    getParticipants(page, limit) {
        let requestURL = config.apiURL + 'person/';
        if (page !== undefined && limit !== undefined) {
            requestURL += '?page=' + (page - 1) + '&limit=' + limit;
        }
        return axios.get(requestURL, {
                headers: getHeader('application/json')
            }
        ).catch(err => console.warn(err));
    },

    postData(data, path) {
        axios.post(config.apiURL + path + '/', data, {
            headers: getHeader('application/json')
        }).catch(err => console.error('Error:', err)
        ).then(() => {
            this.setState({fireRedirect: true});
        });
    },

    postLoginData(data) {
        return axios.post(config.apiURL + 'auth/login/',
            {
                email: data.email,
                password: data.password
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).catch(err => console.error('Error:', err));
    },

    prepareTeacherData(data) {
        return {
            name: data.name,
            question: data.question,
            answers: [
                {text: data.answer0, checked: data.checked0},
                {text: data.answer1, checked: data.checked1},
                {text: data.answer2, checked: data.checked2},
                {text: data.answer3, checked: data.checked3}]
        }
    },

    prepareParticipantData(data) {
        return {
            exerciseID: data.exerciseID,
            answers: [data.checked0, data.checked1, data.checked2, data.checked3]
        }
    },

    getRedirect() {
        return axios.get(config.apiURL + 'auth/entryPoint', {
            headers: getHeader('application/json')
        }).catch(err => console.error(err));
    }
}