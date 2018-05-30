import {isMobile} from 'react-device-detect';

let defaultMessages = {
  showAgreement: Boolean(window.sessionStorage.getItem('showAgreement'))
    ? JSON.parse(window.sessionStorage.getItem('showAgreement'))
    : true,
  showMobileError: Boolean(window.sessionStorage.getItem('showMobileError'))
    ? JSON.parse(window.sessionStorage.getItem('showMobileError'))
    : isMobile
};

export default Object.freeze(Object.assign({}, defaultMessages));
