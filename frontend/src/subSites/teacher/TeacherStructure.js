import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';

import {Grid, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import Home from '../../handlers/HomeHandler';
import TeacherExercise from './TeacherExercise';
import ExerciseOverview from './TeacherExercisesOverview';
import Quiz from './TeacherQuiz';
import TeacherQuizOverview from './TeacherQuizOverview';

import Data from '../../data/Data';
import StructureHandler from '../../handlers/StructureHandler';


export default class TeacherStructure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            iconName: 'bars'
        };
        this.hideSidebar = StructureHandler.hideSidebar.bind(this);
        this.getHeader = StructureHandler.getHeader.bind(this);
        this.getSideBar = StructureHandler.getSideBar.bind(this);
    }

    render() {
        return (
            <BrowserRouter basename="/teacher">
                <Grid className={"siteGrid"} padded>
                    {this.getHeader()}
                    <Grid.Row className={'gridContent'}>
                        <Grid.Column>
                            <Sidebar.Pushable as={Segment}>
                                {this.getSideBar(Data.getPathsTeacher())}
                                <Sidebar.Pusher onClick={this.hideSidebar}>
                                    <Route exact path="/" render={props => Home(Data.getPathsTeacher())}/>
                                    <Route path="/exercise" component={TeacherExercise}/>
                                    <Route path="/exerciseOverview" component={ExerciseOverview}/>
                                    <Route path="/quiz" component={Quiz}/>
                                    <Route path="/quizOverview" component={TeacherQuizOverview}/>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </BrowserRouter>
        );
    }
}