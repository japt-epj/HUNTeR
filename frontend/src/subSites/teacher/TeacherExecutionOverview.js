import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import {colors} from '../../config/hunterUiDefaults';
import {apiGetHandler} from '../../handlers/hunterApiHandlers';
import {paginationPageChangeHandler} from '../../handlers/hunterPaginationHandlers';
import {executionHandler} from '../../handlers/hunterViewHandlers';
import getLoadingScreen from '../../components/getLoadingScreen';

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

    this.pageChangeExecutions = paginationPageChangeHandler.pageChangeExecutions.bind(this);
    this.getExecutionTable = executionHandler.getExecutionTable.bind(this);
  }

  componentDidMount() {
    this.getExecutions(this.state.pageNumber);
  }

  getExecutions = page => {
    apiGetHandler.getPaginatedElements('execution', page).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      this.setState({
        executions: resData.data.content,
        maxPage: resData.data.totalPages,
        loading: false
      });
    });
  };

  render() {
    return (
      <div>
        {this.state.loading ? getLoadingScreen() : this.getExecutionTable()}
        <NavLink to="/execution">
          <Button
            color={colors.buttonColors.normal}
            icon="add square"
            labelPosition="right"
            label="Neue Durchführung erstellen"
          />
        </NavLink>
      </div>
    );
  }
}
