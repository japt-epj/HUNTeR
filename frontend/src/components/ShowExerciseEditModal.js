import React from 'react';

import {Button, Modal} from 'semantic-ui-react';

import {colors, modalOptions} from '../config/hunterUiDefaults';
import TeacherExercise from '../subSites/teacher/TeacherExercise';

export default class ShowExerciseEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseId: this.props.exerciseId,
      open: false
    };
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
        trigger={<Button color={colors.buttonColors.normal} icon="pencil" basic />}
      >
        <Modal.Header />
        <Modal.Content>
          <TeacherExercise editExercise={true} exerciseId={this.state.exerciseId} />
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content={modalOptions.thankYou} onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}
