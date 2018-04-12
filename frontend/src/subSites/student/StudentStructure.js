import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {Grid, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import Home from '../../handlers/HomeHandler';
import StudentScanExercise from './StudentScanExercise';
import Settings from './StudentSetting';
import StudentScore from './StudentScore';
import StudentExercise from './StudentExercise';

import Data from '../../data/Data';
import StructureHandler from '../../handlers/StructureHandler';


export default class StudentStructure extends React.Component {
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
            <BrowserRouter basename="/student">
                <Grid className={"siteGrid"} padded>
                    {this.getHeader(true)}
                    <Grid.Row className="gridContent">
                        <Grid.Column>
                            <Sidebar.Pushable as={Segment}>
                                {this.getSideBar(Data.getPathsStudent())}
                                <Sidebar.Pusher onClick={this.hideSidebar}>
                                    <Route exact path="/" render={props => Home(Data.getPathsStudent())}/>
                                    <Route path="/settings" component={Settings}/>
                                    <Route path="/scan" component={StudentScanExercise}/>
                                    <Route path="/score" component={StudentScore}/>
                                    <Route path="/exercise" component={StudentExercise}/>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </BrowserRouter>
        );
    }
}