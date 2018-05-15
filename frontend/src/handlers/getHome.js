import React from 'react';
import {NavLink} from 'react-router-dom';

import {Menu} from 'semantic-ui-react';

export default function getHome(paths) {
  return (
<<<<<<< HEAD
    <Menu fluid vertical>
      {paths.map(element => (
        <NavLink key={'NavLink' + element.path} to={'/' + element.path}>
          <Menu.Item key={'menuItem' + element.path} content={element.name} />
        </NavLink>
      ))}
    </Menu>
=======
    <div>
      <Menu fluid vertical>
        {paths.map(element => (
          <NavLink key={'NavLink' + element.path} to={'/' + element.path}>
            <Menu.Item key={'menuItem' + element.path}>
              {element.name}
            </Menu.Item>
          </NavLink>
        ))}
      </Menu>
      <div className="content">
        {paths.map(element => (
          <Route
            key={'Route' + element.path}
            path={'/' + element.path}
            component={element.component}
          />
        ))}
      </div>
    </div>
>>>>>>> master
  );
}
