import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

export default function getLoadingScreen() {
  return (
    <Dimmer active inverted key={'dimmer'}>
      <Loader size="large">Loading</Loader>
    </Dimmer>
  );
}
