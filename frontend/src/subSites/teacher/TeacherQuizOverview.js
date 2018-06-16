import React from 'react';
import {NavLink} from 'react-router-dom';

import {OK} from 'http-status-codes';
import {Button} from 'semantic-ui-react';

import {colors, numbers} from '../../config/hunterUiDefaults';
import {apiGetHandler} from '../../handlers/hunterApiHandlers';
import {paginationPageChangeHandler} from '../../handlers/hunterPaginationHandlers';
import {quizHandler} from '../../handlers/hunterViewHandlers';
import getLoadingScreen from '../../components/getLoadingScreen';

export default class TeacherQuizOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox: '',
      quizzes: [],
      loadingQuiz: true,
      pageNumber: numbers.pageNumber,
      minPage: 1,
      maxPageQuizzes: ''
    };

    this.pageChangeQuizzes = paginationPageChangeHandler.pageChangeQuizzes.bind(this);
    this.getQuizTable = quizHandler.getQuizTable.bind(this);
  }

  componentDidMount() {
    this.getQuizzes(this.state.pageNumber);
  }

  getQuizzes = page => {
    apiGetHandler.getPaginatedElements('quiz', page).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      this.setState({
        quizzes: resData.data.content,
        maxPageQuizzes: resData.data.totalPages,
        loadingQuiz: false
      });
    });
  };

  handleSelectChange = (event, {value}) => this.setState({checkBox: value});

  render() {
    return (
      <div>
        {this.state.loadingQuiz ? getLoadingScreen() : this.getQuizTable(false)}
        <NavLink to="/quiz">
          <Button
            color={colors.buttonColors.normal}
            icon="add square"
            labelPosition="right"
            label="Neues Quiz erstellen"
          />
        </NavLink>
      </div>
    );
  }
}
