import React from 'react';

import ModalHandler from '../handlers/ModalHandler';
import pathConfig from '../config/pathConfig';
import defaultUIConfig from '../config/defaultUIConfig';

export default function Logout() {
  return (
    <div>
      {window.localStorage.removeItem('HUNTeR-Redirect')}
      {window.localStorage.removeItem('HUNTeR-Token')}
      {ModalHandler.getLogoutSuccess()}
      {setTimeout(() => {
        window.location.replace(pathConfig.mainURL);
      }, defaultUIConfig.defaultTimeoutTime)}
    </div>
  );
}
