import axios from 'axios';
import {OK, UNAUTHORIZED} from 'http-status-codes';

import {numbers} from '../../config/hunterUiDefaults';
import pathConfig from '../../config/pathConfig';
import getAxiosHeader from './getAxiosHeader';

export default {
  postData(data, path) {
    axios
      .post(pathConfig.apiURL + path + '/', data, {
        headers: getAxiosHeader('application/json')
      })
      .then(() => {
        let successMessage = {...this.state.successMessage};
        successMessage.showModal = true;
        this.setState({successMessage});
        setTimeout(() => this.setState({fireRedirect: true}), numbers.timeoutTime);
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
  }
};
