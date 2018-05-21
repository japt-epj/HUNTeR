import React from 'react';

import pathConfig from '../config/pathConfig';

export default function Logout() {
  return (
    <div>
      {window.localStorage.removeItem('HUNTeR-Redirect')}
      {window.localStorage.removeItem('HUNTeR-Token')}
      {window.location.replace(pathConfig.mainURL)}
    </div>
  );
}
