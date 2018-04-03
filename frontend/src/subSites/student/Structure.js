import React from 'react';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';

import {Button, Grid, Icon, Image, Menu, Segment, Sidebar} from 'semantic-ui-react';
import '../../style/index.css';

import Home from './Home';
import ScanExercise from './ScanExercise';
import Settings from './Setting';
import Score from './Score';
import Exercise from './Exercise';

import Data from '../../data/Data';
import Logo from '../../images/icons/e.jpg';
import StructureHandler from '../../handlers/StructureHandler';


export default class Structure extends React.Component {
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
            <BrowserRouter basename="/student">
                <Grid className={"siteGrid"} padded>
                    <Grid.Row columns="equal" className="gridHeader">
                        <Menu fluid secondary size="tiny">
                            <Menu.Menu>
                                <NavLink to={'/'}>
                                    <Image src={Logo} size="tiny"/>
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
                                    {StructureHandler(Data.getPathsStudent())}
                                </Sidebar>
                                <Sidebar.Pusher>
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