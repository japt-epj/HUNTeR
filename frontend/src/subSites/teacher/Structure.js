import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';

import {Grid, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import Home from './Home';
import Exercise from './Exercise';
import ExerciseOverview from './ExerciseOverview';
import Quiz from './Quiz';
import QuizOverview from './QuizOverview';

import Data from '../../data/Data';
import StructureHandler from '../../handlers/StructureHandler';


export default class Structure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            iconName: 'bars'
        };
        StructureHandler.hideSidebar = StructureHandler.hideSidebar.bind(this);
        StructureHandler.getHeader = StructureHandler.getHeader.bind(this);
        StructureHandler.getSideBar = StructureHandler.getSideBar.bind(this);
    }

    render() {
        return (
            <BrowserRouter basename="/teacher">
                <Grid className={"siteGrid"} padded>
                    {StructureHandler.getHeader()}
                    <Grid.Row className={'gridContent'}>
                        <Grid.Column>
                            <Sidebar.Pushable as={Segment}>
                                {StructureHandler.getSideBar(Data.getPathsTeacher())}
                                <Sidebar.Pusher onClick={StructureHandler.hideSidebar}>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/exercise" component={Exercise}/>
                                    <Route path="/exerciseOverview" component={ExerciseOverview}/>
                                    <Route path="/quiz" component={Quiz}/>
                                    <Route path="/quizOverview" component={QuizOverview}/>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </BrowserRouter>
        );
    }
}