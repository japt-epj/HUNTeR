import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import QuizHandler from '../../handlers/QuizHandler';
import APIHandler from '../../handlers/APIHandler';
import viewHandler from '../../handlers/viewHandler';

export default class TeacherQuizOverview extends React.Component {
  constructor(props) {
    super(props);
    const defaultPageNumber = 1;
    this.state = {
      checkBox: '',
      quizzes: [],
      loadingQuiz: true,
      pageNumber: defaultPageNumber,
      minPage: 1,
      maxPageQuiz: ''
    };

    this.getQuizTable = QuizHandler.getQuizTable.bind(this);
  }

  componentDidMount() {
    this.getQuizzes(this.state.pageNumber, this.state.limit);
  }

  handlePageChangeQuizzes = (event, element) => {
    this.setState({
      pageNumber: element.activePage
    });
    this.getQuizzes(element.activePage, this.state.limit);
  };

  getQuizzes = (page, limit) => {
    APIHandler.getPaginatedElements('quiz', page, limit).then(resData => {
      if (resData.status === OK) {
        this.setState({
          quizzes: resData.data.content,
          maxPageQuiz: resData.data.totalPages,
          loadingQuiz: false
        });
      }
    });
  };

  handleSelectChange = (event, {value}) => this.setState({checkBox: value});

  render() {
    return (
      <div>
        {this.state.loadingQuiz
          ? viewHandler.getLoadingScreen()
          : this.getQuizTable(false)}
        <NavLink to={'/quiz'}>
          <Button basic positive content="Neues Quiz eröffnen" />
        </NavLink>
      </div>
    );
  }
}
