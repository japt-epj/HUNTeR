import React from 'react';
import {NavLink} from 'react-router-dom';

import {Menu} from 'semantic-ui-react';

export default function getHome(paths) {
  return (
    <Menu fluid vertical size="massive">
      {paths.map(mainElement => (
        <Menu.Item key={mainElement.name}>
          <Menu.Header className="menuHeader" content={mainElement.name} />
          <Menu.Menu>
            {mainElement.subPaths.map(subElement => (
              <NavLink
                key={'NavLink' + subElement.path}
                to={'/' + subElement.path}
              >
                <Menu.Item
                  className="menuItem"
                  icon={subElement.icon}
                  content={subElement.name}
                />
              </NavLink>
            ))}
          </Menu.Menu>
        </Menu.Item>
      ))}
    </Menu>
  );
}
