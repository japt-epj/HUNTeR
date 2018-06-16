import React from 'react';

import {OK} from 'http-status-codes';

import {apiGetHandler} from '../handlers/hunterApiHandlers';
import {modalHandler} from '../handlers/hunterViewHandlers';

export default class ShowExerciseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: '',
      question: '',
      solution: '',
      open: false
    };

    this.getViewModal = modalHandler.getViewModal.bind(this);
  }

  componentDidMount() {
    apiGetHandler.getElementArray('exercise/teacher/', this.state.id).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      let exercise = resData.data[0];
      this.setState({
        title: exercise.name,
        question: exercise.question,
        solution: new Array(exercise.answers.filter(element => element.checked))[0][0].text,
        loading: false
      });
    });
  }

  open = () => this.setState({open: true});

  close = () => this.setState({open: false});

  render() {
    return this.getViewModal(this.state.title, this.state.question, 'Lösung: ' + this.state.solution);
  }
}
