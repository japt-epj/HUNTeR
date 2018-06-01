import axios from 'axios';
import fileDownload from 'js-file-download';

import {numbers} from '../../config/hunterUiDefaults';
import pathConfig from '../../config/pathConfig';
import getAxiosHeader from './getAxiosHeader';

export default {
  getElementArray(path, ids) {
    return axios
      .get(pathConfig.apiURL + path + ids, {
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.warn(err));
  },

  downloadExecutionQRCodePDF(executionID) {
    return axios
      .get(pathConfig.apiURL + 'execution/' + executionID + '/print', {
        headers: getAxiosHeader('application/pdf'),
        responseType: 'arraybuffer'
      })
      .then(res => fileDownload(res.data, 'qrCodes-execution' + executionID + '.pdf'))
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

  getExecutions() {
    let requestURL = pathConfig.apiURL + 'execution?limit=' + numbers.executionLimit;
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
  }
};
