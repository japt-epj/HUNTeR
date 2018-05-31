import axios from 'axios';

import {numbers} from '../../config/hunterUiDefaults';
import pathConfig from '../../config/pathConfig';
import getAxiosHeader from './getAxiosHeader';

export default {
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
        setTimeout(() => this.setState({fireRedirect: true}), numbers.timeoutTime);
      });
  }
};
