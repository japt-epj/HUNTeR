import React from 'react';

import {numbers} from '../config/hunterUiDefaults';
import {modalHandler} from '../handlers/hunterViewHandlers';
import pathConfig from '../config/pathConfig';

export default {
  logout() {
    return (
      <div>
        {window.localStorage.removeItem('HUNTeR-Redirect')}
        {window.localStorage.removeItem('HUNTeR-Token')}
        {this.isTokenExpired() ? modalHandler.getTokenExpiration() : modalHandler.getLogoutSuccess()}
        {setTimeout(() => {
          window.location.replace(pathConfig.mainURL);
        }, numbers.timeoutTime)}
      </div>
    );
  },

  isTokenExpired() {
    let tokenExpirationDate = window.localStorage.getItem('HUNTeR-Token-Expiration');
    return tokenExpirationDate - new Date().getTime() < 0;
  }
};
