import React from 'react';
import {NavLink, Redirect} from 'react-router-dom';

import {Grid, Menu} from 'semantic-ui-react';

import ShowInformationModal from './ShowInformationModal';
import Logout from '../subSites/Logout';

export default function getHome(paths) {
  return (
    <div>
      {Logout.isTokenExpired() ? (
        <Redirect to={'/logout'} />
      ) : (
        <Menu fluid vertical size="massive">
          {paths.map(mainElement => (
            <Menu.Item key={mainElement.name}>
              <Menu.Header>
                <Menu.Item className="menuHeader">
                  <Grid>
                    <Grid.Row columns="equal">
                      <Grid.Column>{mainElement.name}</Grid.Column>
                      <Grid.Column width={4} textAlign="right">
                        <ShowInformationModal />
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
      )}
    </div>
  );
}
