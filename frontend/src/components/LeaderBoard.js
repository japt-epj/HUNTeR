import React from 'react';

import {Card, Dropdown, Grid, Icon, Menu} from 'semantic-ui-react';

import {colors, numbers} from '../config/hunterUiDefaults';
import {scoreHandler} from '../handlers/hunterDataHandlers';
import {apiGetHandler} from '../handlers/hunterApiHandler';
import getLoadingScreen from './getLoadingScreen';

export default class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      trophyColors: new Map([[1, 'golden'], [2, 'silver'], [3, 'bronze']]),
      leaderBoard: [],
      executionId: Boolean(this.props.location.state) ? this.props.location.state.executionId : 1,
      executions: [],
      execution: 'execution1',
      teacher: window.location.pathname.includes('teacher')
    };

    this.getLeaderBoard = scoreHandler.getLeaderBoard.bind(this);
    this.checkMoreParticipants = scoreHandler.checkMoreParticipants.bind(this);
    this.calculateLeaderBoard = scoreHandler.calculateLeaderBoard.bind(this);
    this.sortLeaderBoard = scoreHandler.sortLeaderBoard.bind(this);
    this.getScore = scoreHandler.getScore.bind(this);
  }

  componentDidMount() {
    this.getExecutions();
    this.getLeaderBoard(this.state.executionId);
  }

  getExecutions = () => {
    apiGetHandler.getExecutions().then(resData => {
      const executions = resData.data.content
        .map(element => {
          let returnValue = {};
          returnValue.key = element.id;
          returnValue.text = element.id + ' - ' + element.name;
          returnValue.value = element.id;
          return returnValue;
        })
        .sort((a, b) => a.key > b.key);
      this.setState({executions});
    });
  };

  changeExecutionState = (event, data) => {
    this.setState({loading: true, executionId: data.value});
    this.getLeaderBoard(data.value);
  };

  render() {
    return (
      <Grid padded>
        <Grid.Row>
          <Dropdown
            fluid
            search
            selection
            closeOnBlur
            scrolling
            options={this.state.executions}
            onChange={this.changeExecutionState}
            defaultValue={this.state.executionId}
          />
        </Grid.Row>
        <Grid.Row centered>
          {this.state.loading ? (
            getLoadingScreen()
          ) : (
            <Card.Group centered>
              {this.state.leaderBoard.map((element, index) => (
                <Card
                  key={'scoreCard' + element[1].userName}
                  color={element[1].me && !this.state.teacher ? colors.mainColor : null}
                  fluid={index >= numbers.maxTrophyValue}
                >
                  <Card.Content>
                    <Card.Header>
                      <Menu text>
                        <Menu.Item content={'Rang: ' + element.ranking} />
                        {element.ranking <= numbers.maxTrophyValue && (
                          <Menu.Item>
                            <Icon name="trophy" className={this.state.trophyColors.get(element.ranking) + 'Trophy'} />
                          </Menu.Item>
                        )}
                        <Menu.Item position="right" content={this.getScore(element[1].userScore)} />
                      </Menu>
                    </Card.Header>
                    <Card.Description className="userScoreName" content={element[1].userName} />
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Row>
      </Grid>
    );
  }
}
