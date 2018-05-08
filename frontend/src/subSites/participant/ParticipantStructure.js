import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Grid, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import getHome from '../../handlers/getHome';
import ParticipantScanExercise from './ParticipantScanExercise';
import Settings from './ParticipantSetting';
import ParticipantScore from './ParticipantScore';
import ParticipantExercise from './ParticipantExercise';

import config from '../../config/config';
import Data from '../../data/Data';
import StructureHandler from '../../handlers/StructureHandler';
import NotFound from "../NotFound";


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
                                {this.getSideBar(Data.getPathsParticipant())}
                                <Sidebar.Pusher onClick={this.hideSidebar}>
                                    <Switch>
                                        <Route exact path="/" render={props => getHome(Data.getPathsParticipant())}/>
                                        <Route path="/settings" component={Settings}/>
                                        <Route path="/scan" component={ParticipantScanExercise}/>
                                        <Route path="/score" component={ParticipantScore}/>
                                        <Route path="/exercise" component={ParticipantExercise}/>
                                        <Route path="/logout" render={() => {
                                            return (
                                                <div>
                                                    {window.localStorage.removeItem('HUNTeR-Redirect')}
                                                    {window.localStorage.removeItem('HUNTeR-Token')}
                                                    {window.location.replace(config.mainURL)}
                                                </div>
                                            )
                                        }}/>
                                        <Route component={NotFound}/>
                                    </Switch>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </BrowserRouter>
        )
            ;
    }
}