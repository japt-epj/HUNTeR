import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button} from 'semantic-ui-react';

import ExecutionHandler from '../../handlers/ExecutionHandler';
import APIHandler from '../../handlers/APIHandler';
import getLoadingScreen from '../../components/getLoadingScreen';
import defaultColors from '../../config/defaultColors';

export default class TeacherExecutionOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      executions: [],
      loading: true,
      pageNumber: 1,
      minPage: 1,
      maxPage: ''
    };

    this.getExecutionTable = ExecutionHandler.getExecutionTable.bind(this);
  }

  componentDidMount() {
    this.getExecutions(this.state.pageNumber);
  }

  handlePageChangeExecutions = (event, element) => {
    this.setState({
      pageNumber: element.activePage
    });
    this.getExecutions(element.activePage);
  };

  getExecutions = page => {
    APIHandler.getPaginatedElements('execution', page).then(resData => {
      if (resData.status === 200) {
        this.setState({
          executions: resData.data.content,
          maxPage: resData.data.totalPages,
          loading: false
        });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.loading ? getLoadingScreen() : this.getExecutionTable()}
        <NavLink to="/execution">
          <Button
            color={defaultColors.buttonColors.normal}
            icon="add square"
            labelPosition="right"
            label="Neue Durchführung erstellen"
          />
        </NavLink>
      </div>
    );
  }
}
