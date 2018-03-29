import React, {Component} from "react";
import {Route, NavLink, HashRouter} from 'react-router-dom';
import {Sidebar, Segment, Button, Menu, Icon, Image, Grid} from 'semantic-ui-react';

import '../../style/index.css';

import Home from './Home';
import Exercise from './exercise';
import ExerciseOverview from './exerciseOverview';
import Quiz from './Quiz';
import QuizOverview from './QuizOverview';

import StructureHandler from '../../handlers/StructureHandler';
import Data from '../../data/Data';


class Structure extends Component {
    constructor(props) {
        super(props);
        this.state = {visible: false};
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.hideSidebar = this.hideSidebar.bind(this);
    }

    toggleVisibility() {
        this.setState({visible: !this.state.visible});
    }

    hideSidebar(){
        this.setState({visible: false});
    }

    render() {
        return (
            <HashRouter>
                <Grid className={"siteGrid"} padded>
                    <Grid.Row columns="equal" className="gridHeader">
                        <Menu fluid secondary size="tiny">
                            <Menu.Menu>
                                <NavLink to={'/teacher/'}>
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
                                    {StructureHandler.getStructurePaths('teacher', Data.getPathsTeacher())}
                                </Sidebar>
                                <Sidebar.Pusher>
                                    <Route exact path="/teacher/" component={Home}/>
                                    <Route path="/teacher/exercise" component={Exercise}/>
                                    <Route path="/teacher/exerciseOverview" component={ExerciseOverview}/>
                                    <Route path="/teacher/quiz" component={Quiz}/>
                                    <Route path="/teacher/quizOverview" component={QuizOverview}/>
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