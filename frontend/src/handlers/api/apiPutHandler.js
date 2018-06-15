import axios from 'axios';

import {MULTIPLE_CHOICES, OK, UNAUTHORIZED} from 'http-status-codes';

import {numbers} from '../../config/hunterUiDefaults';
import pathConfig from '../../config/pathConfig';
import getAxiosHeader from './getAxiosHeader';

export default {
  putData(data, path) {
    axios
      .put(pathConfig.apiURL + path + '/', data, {
        validateStatus: function(status) {
          return (status >= OK && status < MULTIPLE_CHOICES) || status === UNAUTHORIZED;
        },
        headers: getAxiosHeader('application/json')
      })
      .catch(err => console.error('Error:', err))
      .then(resData => {
        if (resData.status === UNAUTHORIZED) {
          this.setState({oldPasswordError: true});
          return;
        }
        let successMessage = {...this.state.successMessage};
        successMessage.showModal = true;
        this.setState({successMessage});
        setTimeout(() => this.setState({fireRedirect: true}), numbers.timeoutTime);
      });
  }
};
