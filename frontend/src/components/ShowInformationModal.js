import React from 'react';

import {Button, Modal} from 'semantic-ui-react';

import defaultUIConfig from '../config/defaultUIConfig';
import InfoPage from './InfoPage';

export default class ShowInformationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  open = () => this.setState({open: true});

  close = () => this.setState({open: false});

  render() {
    return (
      <Modal
        dimmer="blurring"
        open={this.state.open}
        onOpen={this.open}
        onClose={this.close}
        size="large"
        trigger={
          <Button
            color={defaultUIConfig.buttonColors.normal}
            icon="info"
            basic
            size="mini"
            circular
          />
        }
      >
        <Modal.Header className="infoHeader" content="Informationsseite" />
        <Modal.Content scrolling>
          <InfoPage />
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="OK, danke" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}
