import React from 'react';
import {NavLink} from 'react-router-dom';

import {Menu} from 'semantic-ui-react';

export default function getHome(paths) {
  return (
    <Menu fluid vertical>
      {paths.map(element => (
        <NavLink key={'NavLink' + element.path} to={'/' + element.path}>
          <Menu.Item key={'menuItem' + element.path} content={element.name} />
        </NavLink>
      ))}
    </Menu>
  );
}
