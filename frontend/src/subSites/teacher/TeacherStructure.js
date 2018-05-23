import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Grid, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import getHome from '../../handlers/getHome';
import UserSettings from '../../components/UserSettings';
import TeacherExercise from './TeacherExercise';
import TeacherExerciseOverview from './TeacherExerciseOverview';
import TeacherNewParticipant from './TeacherNewParticipant';
import TeacherQuiz from './TeacherQuiz';
import TeacherQuizOverview from './TeacherQuizOverview';
import TeacherExecution from './TeacherExecution';
import TeacherExecutionOverview from './TeacherExecutionOverview';
import TeacherNavigation from './TeacherNavigation';

import Logout from '../Logout';
import Data from '../../data/Data';
import StructureHandler from '../../handlers/StructureHandler';
import NotFound from '../NotFound';
import ModalHandler from '../../handlers/ModalHandler';
import defaultUIConfig from '../../config/defaultUIConfig';

export default class TeacherStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMobileError: defaultUIConfig.showMobileError,
      visible: false,
      iconName: 'bars'
    };
    this.getHeader = StructureHandler.getHeader.bind(this);
    this.getSideBar = StructureHandler.getSideBar.bind(this);
    this.hideSidebar = StructureHandler.hideSidebar.bind(this);
    this.toggleVisibility = StructureHandler.toggleVisibility.bind(this);
    this.getStructurePaths = StructureHandler.getStructurePaths.bind(this);
    this.getMobileError = ModalHandler.getMobileError.bind(this);
  }

  render() {
    return (
      <div>
        {this.state.showMobileError && this.getMobileError()}
        <BrowserRouter basename="/teacher">
          <Grid className="siteGrid" padded>
            {this.getHeader(true)}
            <Grid.Row className="gridContent">
              <Grid.Column>
                <Sidebar.Pushable as={Segment}>
                  {this.getSideBar(Data.getPathsTeacher())}
                  <Sidebar.Pusher onClick={this.hideSidebar}>
                    <Switch>
                      <Route
                        exact
                        path="/"
                        render={props => getHome(Data.getPathsTeacher())}
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
      </div>
    );
  }
}
