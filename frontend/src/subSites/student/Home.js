import React, {Component} from 'react';
import {Route, NavLink, BrowserRouter} from 'react-router-dom';

import {Menu} from 'semantic-ui-react';

import Data from "../../data/Data";

class Home extends Component {
    render() {
        return (
            <div>
                <Menu fluid vertical>
                    {Data.getPathsStudent().map((element) =>
                        <Menu.Item key={'menuItem' + element.path}><NavLink key={'NavLink' + element.path}
                                                                            to={'/' + element.path}>{element.title}</NavLink></Menu.Item>
                    )}
                </Menu>
                <div className="content">
                    {Data.getPathsStudent().map((element) =>
                        <Route key={'Route' + element.path} path={'/' + element.path}
                               component={element.component}/>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;