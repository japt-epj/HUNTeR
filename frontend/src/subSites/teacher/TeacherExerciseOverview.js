import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button} from 'semantic-ui-react';

import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import viewHandler from '../../handlers/viewHandler';

export default class TeacherExerciseOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      loading: true,
      pageNumber: 1,
      minPage: 1,
      maxPage: '',
      limit: 5
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
      if (resData.status === 200) {
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
            color="green"
            icon="add square"
            labelPosition="right"
            label="Aufgabe hinzufügen"
          />
        </NavLink>
      </div>
    );
  }
}
