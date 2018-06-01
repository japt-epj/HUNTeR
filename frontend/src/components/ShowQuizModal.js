import React from 'react';

import {OK} from 'http-status-codes';

import {apiGetHandler} from '../handlers/hunterApiHandler';
import {modalHandler} from '../handlers/hunterViewHandlers';
import TeacherExerciseOverview from '../subSites/teacher/TeacherExerciseOverview';

export default class ShowQuizModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: '',
      exerciseIds: [],
      exercises: [],
      open: false
    };

    this.getViewModal = modalHandler.getViewModal.bind(this);
  }

  componentDidMount() {
    let exerciseIds = [];
    apiGetHandler.getElementArray('quiz/', this.state.id).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      let quiz = resData.data[0];
      exerciseIds = quiz.exercises;
      this.setState({
        title: quiz.name,
        exerciseIds
      });
    });
    apiGetHandler.getElementArray('exercise/', exerciseIds.toString()).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      this.setState({
        exercises: resData.data.content.map(element => {
          return <p key={element.name}>{element.name + ' - ' + element.question}</p>;
        })
      });
    });
  }

  open = () => this.setState({open: true});

  close = () => this.setState({open: false});

  render() {
    return this.getViewModal(
      'Quiz einsehen',
      this.state.title,
      <TeacherExerciseOverview modalView={true} exerciseIds={this.state.exerciseIds} />
    );
  }
}
