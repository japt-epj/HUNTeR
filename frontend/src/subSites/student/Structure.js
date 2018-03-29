import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import {Sidebar, Segment, Button, Menu, Icon, Image, Grid} from 'semantic-ui-react';

import '../../style/index.css';

import Home from './Home';
import ScanExercise from './ScanExercise';
import Settings from './Setting';
import Score from './Score';
import Exercise from './Exercise';
import Data from '../../data/Data';
import StructureHandler from '../../handlers/StructureHandler';


class Structure extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false};
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        return (
            <HashRouter>
                <Grid className={"siteGrid"} padded>
                    <Grid.Row columns="equal" className="gridHeader">
                        <Menu fluid secondary size="tiny">
                            <Menu.Menu>
                                <NavLink to={'/student'}>
                                    <Image src="/pictures/e.jpg" size="tiny"/>
                                </NavLink>
                            </Menu.Menu>
                            <Menu.Menu>
                                <h1>Header</h1>
                            </Menu.Menu>
                            <Menu.Menu position="right">
                                <Button onClick={this.toggleVisibility}><Icon name="bars" size="large"/></Button>
                            </Menu.Menu>
                        </Menu>
                    </Grid.Row>
                    <Grid.Row className={'gridContent'}>
                        <Grid.Column>
                            <Sidebar.Pushable as={Segment}>
                                <Sidebar as={Menu} animation="overlay"
                                         width="thin" direction="right"
                                         visible={this.state.visible} icon="labeled"
                                         vertical inverted>
                                    {StructureHandler.getStructurePaths('student', Data.getPathsStudent())}
                                </Sidebar>
                                <Sidebar.Pusher>
                                    <Route exact path="/student/" component={Home}/>
                                    <Route path="/student/settings" component={Settings}/>
                                    <Route path="/student/scan" component={ScanExercise}/>
                                    <Route path="/student/score" component={Score}/>
                                    <Route path="/student/exercise" component={Exercise}/>
                                </Sidebar.Pusher>
                            </Sidebar.Pushable>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </HashRouter>
        );
    }
}

export default Structure;