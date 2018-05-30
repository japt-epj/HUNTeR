import React from 'react';

import ModalHandler from '../handlers/ModalHandler';
import pathConfig from '../config/pathConfig';
import defaultNumbers from '../config/defaultNumbers';

export default {
  logout() {
    return (
      <div>
        {window.localStorage.removeItem('HUNTeR-Redirect')}
        {window.localStorage.removeItem('HUNTeR-Token')}
        {this.isTokenExpired()
          ? ModalHandler.getTokenExpiration()
          : ModalHandler.getLogoutSuccess()}
        {setTimeout(() => {
          window.location.replace(pathConfig.mainURL);
        }, defaultNumbers.timeoutTime)}
      </div>
    );
  },

  isTokenExpired() {
    let tokenExpirationDate = window.localStorage.getItem(
      'HUNTeR-Token-Expiration'
    );
    return tokenExpirationDate - new Date().getTime() < 0;
  }
};
