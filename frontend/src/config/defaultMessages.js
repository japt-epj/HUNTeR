import {isMobile} from 'react-device-detect';

let defaultMessages = {
  hideAgreement: () => {
    let hideAgreement = window.sessionStorage.getItem('HUNTeR-hideAgreement');
    return Boolean(JSON.parse(hideAgreement));
  },

  hideMobileError: () => {
    let hideMobileError = window.sessionStorage.getItem(
      'HUNTeR-hideMobileError'
    );
    return !isMobile || Boolean(JSON.parse(hideMobileError));
  }
};

export default Object.freeze(Object.assign({}, defaultMessages));
