import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Grid, Header, Icon, Image, Menu, Sidebar} from 'semantic-ui-react';

import Logo from '../images/icons/e.jpg';


export default {
    toggleVisibility() {
        let iconNames = new Map([["bars", "close"], ["close", "bars"]]);
        this.setState({visible: !this.state.visible});
        this.setState({iconName: iconNames.get(this.state.iconName)});
    },

    hideSidebar() {
        let iconNames = new Map([["bars", "close"], ["close", "bars"]]);
        this.setState({visible: false});
        this.setState({iconName: iconNames.get('close')});
    },

    getHeader() {
        return (
            <Grid.Row columns="equal" verticalAlign="middle" className="gridHeader">
                <Grid.Column textAlign="left">
                    <NavLink to="/">
                        <Image src={Logo} alt="HUNTeR Logo - Link to home site" className="logoImage"
                               onClick={this.hideSidebar.bind(this)}/>
                    </NavLink>
                </Grid.Column>
                <Grid.Column textAlign="center" className="headerElement">
                    <Header size="medium" color="green" content={'Pathname'}/>
                </Grid.Column>
                <Grid.Column textAlign="right">
                    <Button onClick={this.toggleVisibility} icon={this.state.iconName}
                            color="green"/>
                </Grid.Column>
            </Grid.Row>
        )
    },

    getLoginHeader() {
        return (
            <Grid.Row columns="equal" verticalAlign="middle" className="gridHeader">
                <Grid.Column textAlign="left">
                    <Image src={Logo} alt="HUNTeR Logo - Link to home site" className="logoImage"/>
                </Grid.Column>
                <Grid.Column textAlign="right" className="headerElement">
                    <Header size="medium" color="green" content="Login Seite"/>
                </Grid.Column>
            </Grid.Row>
        )
    },

    getSideBar(paths) {
        return (
            <Sidebar as={Menu} animation="overlay"
                     width="thin" direction="right"
                     visible={this.state.visible} icon="labeled"
                     vertical inverted>
                {this.getStructurePaths(paths)}
            </Sidebar>
        );
    },

    getStructurePaths(elements) {
        return elements.map((element) =>
            <NavLink key={'navLink' + element.path} to={'/' + element.path}>
                <Menu.Item name={element.path}><Icon name={element.icon} size="mini"/>
                    {element.name}
                </Menu.Item>
            </NavLink>
        );
    }
}