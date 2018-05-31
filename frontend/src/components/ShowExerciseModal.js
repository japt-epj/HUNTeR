import React from 'react';

import {Button, Modal} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import {colors, modalOptions} from '../config/hunterUiDefaults';
import {apiGetHandler} from '../handlers/hunterApiHandler';

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
    apiGetHandler.getExerciseArray(this.state.id).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      let exercise = resData.data[0];
      this.setState({
        title: exercise.name,
        question: exercise.question,
        loading: false
      });
    });
  }

  open = () => this.setState({open: true});

  close = () => this.setState({open: false});

  render() {
    return (
      <Modal
        dimmer={modalOptions.dimmer}
        open={this.state.open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={<Button color={colors.buttonColors.show} icon="eye" basic />}
      >
        <Modal.Header content={this.state.title} />
        <Modal.Content content={this.state.question} />
        <Modal.Actions>
          <Button icon="check" content={modalOptions.thankYou} onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}
