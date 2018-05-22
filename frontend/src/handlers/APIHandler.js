import axios from 'axios';
import fileDownload from 'js-file-download';
import {OK, UNAUTHORIZED} from 'http-status-codes';

import pathConfig from '../config/pathConfig';
import getAxiosHeader from './getAxiosHeader';

export default {
  getExerciseArray(exerciseIDs) {
    return axios
      .get(pathConfig.apiURL + 'exercise/' + exerciseIDs, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.warn(err));
  },

  downloadExecutionQRCodePDF(executionID) {
    return axios
      .get(pathConfig.apiURL + 'quiz/' + executionID + '/print', {
        headers: getAxiosHeader('application/pdf'),
        responseType: 'arraybuffer'
      })
      .then(res =>
        fileDownload(res.data, 'qrCodes-quiz' + executionID + '.pdf')
      )
      .catch(err => console.warn(err));
  },

  getPaginatedElements(path, page) {
    let requestURL = pathConfig.apiURL + path + '/';
    if (typeof page === 'number') {
      requestURL += '?page=' + (page - 1);
    }
    return axios
      .get(requestURL, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.warn(err));
  },

  getNextLocations(executionId) {
    let requestURL = pathConfig.apiURL + 'location/' + executionId;
    return axios
      .get(requestURL, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.warn(err));
  },

  postData(data, path) {
    axios
      .post(pathConfig.apiURL + path + '/', data, {
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
        pathConfig.apiURL + 'auth/login/',
        {
          email: data.email,
          password: data.password
        },
        {
          headers: getAxiosHeader('application/json'),
          validateStatus: function(status) {
            return status === UNAUTHORIZED || status === OK;
          }
        }
      )
      .catch(err => console.error('Error:', err));
  },

  redirectAfterLogin() {
    return axios
      .get(pathConfig.apiURL + 'auth/entryPoint', {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.error(err));
  },

  getParticipant(participantId) {
    return axios
      .get(pathConfig.apiURL + 'person/' + participantId, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.warn(err));
  },

  putData(data, path) {
    axios
      .put(pathConfig.apiURL + path + '/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(err => console.error('Error:', err))
      .then(() => {
        this.setState({fireRedirect: true});
      });
  }
};
