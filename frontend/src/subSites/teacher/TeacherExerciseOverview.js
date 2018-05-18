import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import config from '../../config/config';
import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import viewHandler from '../../handlers/viewHandler';

export default class TeacherExerciseOverview extends React.Component {
  constructor(props) {
    super(props);
    const defaultPageNumber = 1;
    this.state = {
      exercises: [],
      loading: true,
      pageNumber: defaultPageNumber,
      minPage: 1,
      maxPage: ''
    };

    this.getExerciseTable = ExerciseHandler.getExerciseTable.bind(this);
  }

  componentDidMount() {
    this.getExercises(this.state.pageNumber, this.state.limit);
  }

  handlePageChangeExercises = (event, element) => {
    this.setState({
      pageNumber: element.activePage
    });
    this.getExercises(element.activePage, this.state.limit);
  };

  getExercises = (page, limit) => {
    APIHandler.getPaginatedElements('exercise', page, limit).then(resData => {
      if (resData.status === OK) {
        this.setState({
          exercises: resData.data.content,
          maxPage: resData.data.totalPages,
          loading: false
        });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.loading
          ? viewHandler.getLoadingScreen()
          : this.getExerciseTable(false)}
        <NavLink to="/exercise">
          <Button
            color={config.buttonColors.normal}
            icon="add square"
            labelPosition="right"
            label="Aufgabe hinzufügen"
          />
        </NavLink>
      </div>
    );
  }
}
