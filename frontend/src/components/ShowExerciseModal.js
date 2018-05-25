import React from 'react';

import {Button, Modal} from 'semantic-ui-react';
import defaultUIConfig from '../config/defaultUIConfig';
import APIHandler from '../handlers/APIHandler';
import {OK} from 'http-status-codes/index';

export default class ShowExerciseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: '',
      question: '',
      open: false
    };
  }

  componentDidMount() {
    APIHandler.getExerciseArray(this.state.id).then(resData => {
      if (resData.status === OK) {
        let exercise = resData.data[0];
        this.setState({
          title: exercise.name,
          question: exercise.question,
          loading: false
        });
      }
    });
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
        size="small"
        trigger={
          <Button color={defaultUIConfig.buttonColors.show} icon="eye" basic />
        }
      >
        <Modal.Header content={this.state.title} />
        <Modal.Content content={this.state.question} />
        <Modal.Actions>
          <Button icon="check" content="OK, danke" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}
