import React from 'react';

import config from '../config/config';

export default function Logout() {
  return (
    <div>
      {window.localStorage.removeItem('HUNTeR-Redirect')}
      {window.localStorage.removeItem('HUNTeR-Token')}
      {window.location.replace(config.mainURL)}
    </div>
  );
}
