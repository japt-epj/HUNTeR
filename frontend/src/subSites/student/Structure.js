import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {Grid, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import Home from './Home';
import ScanExercise from './ScanExercise';
import Settings from './Setting';
import Score from './Score';
import Exercise from './Exercise';

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
            <BrowserRouter basename="/student">
                <Grid className={"siteGrid"} padded>
                    {StructureHandler.getHeader()}
                    <Grid.Row className={'gridContent'}>
                        <Grid.Column>
                            <Sidebar.Pushable as={Segment}>
                                {StructureHandler.getSideBar(Data.getPathsStudent())}
                                <Sidebar.Pusher onClick={StructureHandler.hideSidebar}>
                                    <Route exact path="/" component={Home}/>
                                    <Route path="/settings" component={Settings}/>
                                    <Route path="/scan" component={ScanExercise}/>
                                    <Route path="/score" component={Score}/>
                                    <Route path="/exercise" component={Exercise}/>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </BrowserRouter>
        );
    }
}