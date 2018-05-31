import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Grid, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import getHome from '../../components/getHome';
import NotFound from '../NotFound';
import LeaderBoard from '../../components/LeaderBoard';
import Logout from '../Logout';
import TeacherExecution from './TeacherExecution';
import TeacherExecutionOverview from './TeacherExecutionOverview';
import TeacherExercise from './TeacherExercise';
import TeacherExerciseOverview from './TeacherExerciseOverview';
import TeacherNavigation from './TeacherNavigation';
import TeacherNewParticipant from './TeacherNewParticipant';
import TeacherQuiz from './TeacherQuiz';
import TeacherQuizOverview from './TeacherQuizOverview';
import UserSettings from '../../components/UserSettings';

import {messages} from '../../config/hunterUiDefaults';
import {modalHandler, structureHandler} from '../../handlers/hunterHandlers';
import DefaultPaths from '../../config/DefaultPaths';

export default class TeacherStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideMobileError: messages.hideMobileError(),
      visible: false,
      iconName: 'bars'
    };
    this.getHeader = structureHandler.getHeader.bind(this);
    this.getSideBar = structureHandler.getSideBar.bind(this);
    this.hideSidebar = structureHandler.hideSidebar.bind(this);
    this.toggleVisibility = structureHandler.toggleVisibility.bind(this);
    this.getStructurePaths = structureHandler.getStructurePaths.bind(this);
    this.getMobileError = modalHandler.getMobileError.bind(this);
  }

  render() {
    return (
      <div>
        {!this.state.hideMobileError && this.getMobileError()}
        <BrowserRouter basename="/teacher">
          <Grid className="siteGrid" padded>
            {this.getHeader(true)}
            <Grid.Row className="gridContent">
              <Grid.Column>
                <Sidebar.Pushable as={Segment}>
                  {this.getSideBar(DefaultPaths.getPathsTeacher())}
                  <Sidebar.Pusher onClick={this.hideSidebar}>
                    <Switch>
                      <Route
                        exact
                        path="/"
                        render={() => getHome(DefaultPaths.getPathsTeacher())}
                      />
                      <Route path="/settings" component={UserSettings} />
                      <Route path="/exercise" component={TeacherExercise} />
                      <Route
                        path="/exerciseOverview"
                        component={TeacherExerciseOverview}
                      />
                      <Route path="/quiz" component={TeacherQuiz} />
                      <Route
                        path="/quizOverview"
                        component={TeacherQuizOverview}
                      />
                      <Route path="/execution" component={TeacherExecution} />
                      <Route
                        path="/executionOverview"
                        component={TeacherExecutionOverview}
                      />
                      <Route
                        path="/teacherNavigation"
                        component={TeacherNavigation}
                      />
                      <Route
                        path="/newUser"
                        component={TeacherNewParticipant}
                      />
                      <Route
                        path="/participantLeaderBoard"
                        component={LeaderBoard}
                      />
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
      </div>
    );
  }
}
