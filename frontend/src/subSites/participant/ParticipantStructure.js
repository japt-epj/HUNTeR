import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Grid, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import getHome from '../../components/getHome';
import LeaderBoard from '../../components/LeaderBoard';
import Logout from '../Logout';
import NotFound from '../NotFound';
import ParticipantExercise from './ParticipantExercise';
import ParticipantNextLocation from './ParticipantNextLocation';
import ParticipantScanExercise from './ParticipantScanExercise';
import UserSettings from '../../components/UserSettings';

import {structureHandler} from '../../handlers/hunterHandlers';
import DefaultPaths from '../../config/DefaultPaths';

export default class ParticipantStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      iconName: 'bars'
    };
    this.hideSidebar = structureHandler.hideSidebar.bind(this);
    this.getHeader = structureHandler.getHeader.bind(this);
    this.getSideBar = structureHandler.getSideBar.bind(this);
    this.toggleVisibility = structureHandler.toggleVisibility.bind(this);
    this.getStructurePaths = structureHandler.getStructurePaths.bind(this);
  }

  render() {
    return (
      <BrowserRouter basename="/participant">
        <Grid className="siteGrid" padded>
          {this.getHeader(true)}
          <Grid.Row className="gridContent">
            <Grid.Column>
              <Sidebar.Pushable as={Segment}>
                {this.getSideBar(DefaultPaths.getPathsParticipant())}
                <Sidebar.Pusher onClick={this.hideSidebar}>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => getHome(DefaultPaths.getPathsParticipant())}
                    />
                    <Route path="/settings" component={UserSettings} />
                    <Route path="/scan" component={ParticipantScanExercise} />
                    <Route
                      path="/nextLocation"
                      component={ParticipantNextLocation}
                    />
                    <Route path="/score" component={LeaderBoard} />
                    <Route path="/exercise" component={ParticipantExercise} />
                    <Route
                      path="/logout"
                      render={() => {
                        return Logout.logout();
                      }}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </BrowserRouter>
    );
  }
}
