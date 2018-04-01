import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu, Icon} from 'semantic-ui-react';


class StructureHandler extends Component {
    constructor(props) {
        super(props);
    }

    static getStructurePaths(elements) {
        return elements.map((element) =>
            <NavLink key={'navLink' + element.path} to={'/' + element.path}>
                <Menu.Item name={element.path}><Icon name={element.icon}/>
                    {element.title}
                </Menu.Item>
            </NavLink>
        );
    }
}

export default StructureHandler