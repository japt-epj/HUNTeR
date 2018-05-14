import axios from 'axios';
import fileDownload from 'js-file-download';

import config from '../config/config';

export default {
  getExerciseArray(exerciseIDs) {
    return axios
      .get(config.baseurl + 'exercise/' + exerciseIDs, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.warn(err));
  },

  getParticipant(participantId) {
    return axios
      .get(config.baseurl + 'person/' + participantId, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.warn(err));
  },

  downloadQRCode(exerciseID) {
    return axios
      .get(config.baseurl + 'qrCode/' + exerciseID, {
        headers: {
          Accept: 'image/png',
          'Content-Type': 'image/png'
        },
        responseType: 'arraybuffer'
      })
      .then(res => fileDownload(res.data, 'qrCode' + exerciseID + '.png'))
      .catch(err => console.warn(err));
  },

  getExercises(page, limit) {
    let requestURL = config.baseurl + 'exercise/';
    if (page !== undefined && limit !== undefined) {
      requestURL += '?page=' + (page - 1) + '&limit=' + limit;
    }
    return axios
      .get(requestURL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.warn(err));
  },

  getQuizzes(page, limit) {
    let requestURL = config.baseurl + 'quiz/';
    if (page !== undefined && limit !== undefined) {
      requestURL += '?page=' + (page - 1) + '&limit=' + limit;
    }
    return axios
      .get(requestURL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.warn(err));
  },

  getParticipants(page, limit) {
    let requestURL = config.baseurl + 'person/';
    if (page !== undefined && limit !== undefined) {
      requestURL += '?page=' + (page - 1) + '&limit=' + limit;
    }
    return axios
      .get(requestURL, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.warn(err));
  },

  postData(data, path) {
    axios
      .post(config.baseurl + path + '/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.error('Error:', err))
      .then(() => {
        this.setState({fireRedirect: true});
      });
  },

  putData(data, path) {
    axios
      .put(config.baseurl + path + '/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.error('Error:', err))
      .then(() => {
        this.setState({fireRedirect: true});
      });
  },

  prepareTeacherData(data) {
    return {
      name: data.name,
      question: data.question,
      answers: [
        {text: data.answer0, checked: data.checked0},
        {text: data.answer1, checked: data.checked1},
        {text: data.answer2, checked: data.checked2},
        {text: data.answer3, checked: data.checked3}
      ]
    };
  },

  prepareParticipantData(data) {
    console.log(data);

    return {
      personId: data.participantId,
      exerciseId: data.id,
      answers: [
        {text: data.answer0, checked: data.checked0},
        {text: data.answer1, checked: data.checked1},
        {text: data.answer2, checked: data.checked2},
        {text: data.answer3, checked: data.checked3}
      ]
    };
  }
};
