import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button} from 'semantic-ui-react';

import ExecutionHandler from '../../handlers/ExecutionHandler';
import APIHandler from '../../handlers/APIHandler';
import viewHandler from '../../handlers/viewHandler';

export default class TeacherExecutionOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      executions: [],
      loading: true,
      pageNumber: 1,
      minPage: 1,
      maxPage: '',
      limit: 5
    };

    this.getExecutionTable = ExecutionHandler.getExecutionTable.bind(this);
  }

  componentDidMount() {
    this.getExecutions(this.state.pageNumber, this.state.limit);
  }

  handlePageChangeExecutions = (event, element) => {
    this.setState({
      pageNumber: element.activePage
    });
    this.getExecutions(element.activePage, this.state.limit);
  };

  getExecutions = (page, limit) => {
    APIHandler.getPaginatedElements('execution', page, limit).then(resData => {
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
        {this.state.loading
          ? viewHandler.getLoadingScreen()
          : this.getExecutionTable()}
        <NavLink to="/execution">
          <Button
            color="green"
            icon="add square"
            labelPosition="right"
            label="Ausführung hinzufügen"
          />
        </NavLink>
      </div>
    );
  }
}
