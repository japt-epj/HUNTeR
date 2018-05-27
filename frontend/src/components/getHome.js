import React from 'react';
import {NavLink} from 'react-router-dom';

import {Grid, Menu} from 'semantic-ui-react';

import ShowInformationModal from './ShowInformationModal';

export default function getHome(paths) {
  return (
    <Menu fluid vertical size="massive">
      {paths.map(mainElement => (
        <Menu.Item key={mainElement.name}>
          <Menu.Header>
            <Menu.Item className="menuHeader">
              <Grid>
                <Grid.Row columns="equal">
                  <Grid.Column>{mainElement.name}</Grid.Column>
                  <Grid.Column width={1} textAlign="right">
                    <ShowInformationModal anchor={mainElement.name} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Menu.Item>
          </Menu.Header>
          <Menu.Menu>
            {mainElement.subPaths.map(subElement => (
              <NavLink
                key={'NavLink' + subElement.path}
                to={'/' + subElement.path}
              >
                <Menu.Item
                  className="menuItem"
                  content={subElement.name}
                  icon={subElement.icon}
                />
              </NavLink>
            ))}
          </Menu.Menu>
        </Menu.Item>
      ))}
    </Menu>
  );
}
