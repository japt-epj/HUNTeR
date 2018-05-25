import axios from 'axios';
import fileDownload from 'js-file-download';
import {OK, UNAUTHORIZED} from 'http-status-codes';

import pathConfig from '../config/pathConfig';
import getAxiosHeader from './getAxiosHeader';
import defaultUIConfig from '../config/defaultUIConfig';

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
        fileDownload(res.data, 'qrCodes-execution' + executionID + '.pdf')
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

  getLeaderBoard(executionId) {
    let requestURL = pathConfig.apiURL + 'score/' + executionId;
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
        let successMessage = {...this.state.successMessage};
        successMessage.showModal = true;
        this.setState({successMessage});
        setTimeout(
          () => this.setState({fireRedirect: true}),
          defaultUIConfig.defaultTimeoutTime
        );
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

  getInformation() {
    return axios
      .get(pathConfig.apiURL + 'person/current', {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.warn(err));
  },

  putData(data, path) {
    axios
      .put(pathConfig.apiURL + path + '/', data, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.error('Error:', err))
      .then(() => {
        let successMessage = {...this.state.successMessage};
        successMessage.showModal = true;
        this.setState({successMessage});
        setTimeout(
          () => this.setState({fireRedirect: true}),
          defaultUIConfig.defaultTimeoutTime
        );
      });
  }
};
