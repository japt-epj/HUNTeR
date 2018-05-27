import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Grid, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import getHome from '../../components/getHome';
import UserSettings from '../../components/UserSettings';
import ParticipantScanExercise from './ParticipantScanExercise';
import LeaderBoard from '../../components/LeaderBoard';
import ParticipantExercise from './ParticipantExercise';

import Logout from '../Logout';
import DefaultUIPaths from '../../config/DefaultUIPaths';
import StructureHandler from '../../handlers/StructureHandler';
import NotFound from '../NotFound';
import ParticipantNextLocation from './ParticipantNextLocation';

export default class ParticipantStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      iconName: 'bars'
    };
    this.hideSidebar = StructureHandler.hideSidebar.bind(this);
    this.getHeader = StructureHandler.getHeader.bind(this);
    this.getSideBar = StructureHandler.getSideBar.bind(this);
    this.toggleVisibility = StructureHandler.toggleVisibility.bind(this);
    this.getStructurePaths = StructureHandler.getStructurePaths.bind(this);
  }

  render() {
    return (
      <BrowserRouter basename="/participant">
        <Grid className="siteGrid" padded>
          {this.getHeader(true)}
          <Grid.Row className="gridContent">
            <Grid.Column>
              <Sidebar.Pushable as={Segment}>
                {this.getSideBar(DefaultUIPaths.getPathsParticipant())}
                <Sidebar.Pusher onClick={this.hideSidebar}>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={props =>
                        getHome(DefaultUIPaths.getPathsParticipant())
                      }
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
                        return Logout();
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
