import React from 'react';
import {NavLink} from 'react-router-dom';

import {OK} from 'http-status-codes';
import {Button} from 'semantic-ui-react';

import {colors, numbers} from '../../config/hunterUiDefaults';
import {apiGetHandler} from '../../handlers/hunterApiHandler';
import {exerciseHandler} from '../../handlers/hunterViewHandlers';
import getLoadingScreen from '../../components/getLoadingScreen';

export default class TeacherExerciseOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      loading: true,
      pageNumber: numbers.pageNumber,
      minPage: 1,
      maxPage: ''
    };

    this.getExerciseTable = exerciseHandler.getExerciseTable.bind(this);
  }

  componentDidMount() {
    this.getExercises(this.state.pageNumber);
  }

  handlePageChangeExercises = (event, element) => {
    this.setState({
      pageNumber: element.activePage
    });
    this.getExercises(element.activePage);
  };

  getExercises = page => {
    apiGetHandler.getPaginatedElements('exercise', page).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      this.setState({
        exercises: resData.data.content,
        maxPage: resData.data.totalPages,
        loading: false
      });
    });
  };

  render() {
    return (
      <div>
        {this.state.loading ? getLoadingScreen() : this.getExerciseTable(false)}
        <NavLink to="/exercise">
          <Button
            color={colors.buttonColors.normal}
            icon="add square"
            labelPosition="right"
            label="Neue Aufgabe erstellen"
          />
        </NavLink>
      </div>
    );
  }
}
