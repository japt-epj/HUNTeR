import React from 'react';
import {NavLink} from 'react-router-dom';

import {Menu, Icon} from 'semantic-ui-react';


export default function getStructurePaths(elements) {
    return elements.map((element) =>
        <NavLink key={'navLink' + element.path} to={'/' + element.path}>
            <Menu.Item name={element.path}><Icon name={element.icon}/>
                {element.title}
            </Menu.Item>
        </NavLink>
    );
}