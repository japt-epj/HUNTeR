import axios from 'axios';
import fileDownload from 'js-file-download';

import config from '../config/config';

import getAxiosHeader from './getAxiosHeader';

export default {
  getExerciseArray(exerciseIDs) {
    return axios
      .get(config.apiURL + 'exercise/' + exerciseIDs, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.warn(err));
  },

  downloadQRCode(exerciseID) {
    return axios
      .get(config.apiURL + 'qrCode/' + exerciseID, {
        headers: getAxiosHeader('image/png'),
        responseType: 'arraybuffer'
      })
      .then(res => fileDownload(res.data, 'qrCode' + exerciseID + '.png'))
      .catch(err => console.warn(err));
  },

  getPaginatedElements(path, page, limit) {
    let requestURL = config.apiURL + path + '/';
    if (page !== undefined && limit !== undefined) {
      requestURL += '?page=' + (page - 1) + '&limit=' + limit;
    }
    return axios
      .get(requestURL, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.warn(err));
  },

  postData(data, path) {
    axios
      .post(config.apiURL + path + '/', data, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.error('Error:', err))
      .then(() => {
        this.setState({fireRedirect: true});
      });
  },

  postLoginData(data) {
    return axios
      .post(
        config.apiURL + 'auth/login/',
        {
          email: data.email,
          password: data.password
        },
        {
          headers: getAxiosHeader('application/json'),
          validateStatus: function(status) {
            return status === 401 || (status >= 200 && status < 300);
          }
        }
      )
      .catch(err => console.error('Error:', err));
  },

  prepareTeacherData(data) {
    return {
      name: data.name,
      question: data.question,
      answers: [
        {text: data.answer0},
        {text: data.answer1},
        {text: data.answer2},
        {text: data.answer3}
      ],
      correctAnswer: data.answerId
    };
  },

  prepareParticipantData(data) {
    return {
      participantId: data.participantId,
      exerciseId: data.exerciseId,
      answerId: data.answerId
    };
  },

  redirectAfterLogin() {
    return axios
      .get(config.apiURL + 'auth/entryPoint', {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.error(err));
  },

  getInformations() {
    return axios
      .get(config.apiURL + 'person/current', {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.warn(err));
  },

  putData(data, path) {
    axios
      .put(config.apiURL + path + '/', data, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.error('Error:', err))
      .then(() => {
        this.setState({fireRedirect: true});
      });
  }
};
