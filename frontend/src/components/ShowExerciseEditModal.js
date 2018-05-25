import React from 'react';

import {Button, Modal} from 'semantic-ui-react';
import defaultUIConfig from '../config/defaultUIConfig';
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
        dimmer="blurring"
        open={this.state.open}
        onOpen={this.open}
        onClose={this.close}
        size="small"
        trigger={
          <Button
            color={defaultUIConfig.buttonColors.normal}
            icon="pencil"
            basic
          />
        }
      >
        <Modal.Header content="" />
        <Modal.Content>
          <TeacherExercise
            editExercise={true}
            exerciseId={this.state.exerciseId}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button icon="check" content="OK, danke" onClick={this.close} />
        </Modal.Actions>
      </Modal>
    );
  }
}
