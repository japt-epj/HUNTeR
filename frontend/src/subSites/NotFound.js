import React from 'react';
import {NavLink} from 'react-router-dom';

import {Grid, Image} from 'semantic-ui-react';
import {isMobile} from 'react-device-detect';

import ErrorDesktop from '../images/404Desktop.png';
import ErrorMobile from '../images/404Mobile.png';

export default function() {
  return (
    <NavLink to="/">
      <Grid centered className="errorBackground">
        <Grid.Row>
          <Image src={isMobile ? ErrorMobile : ErrorDesktop} />
        </Grid.Row>
      </Grid>
    </NavLink>
  );
}
