import React from 'react';
import {NavLink} from 'react-router-dom';

import {Image, Grid, Message} from 'semantic-ui-react';

import ErrorDesktop from '../images/404Desktop.png';
import ErrorMobile from '../images/404Mobile.png';


export default function () {
    return (
        <Grid centered>
            <Grid.Row>
                <NavLink to="/">
                    <Image
                        src={/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? ErrorMobile : ErrorDesktop}/>
                </NavLink>
            </Grid.Row>
        </Grid>
    )
}