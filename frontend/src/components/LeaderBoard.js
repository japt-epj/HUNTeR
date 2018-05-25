import React from 'react';
import {OK} from 'http-status-codes';

import {Card, Dropdown, Grid, Icon, Menu} from 'semantic-ui-react';

import APIHandler from '../handlers/APIHandler';
import viewHandler from '../handlers/viewHandler';

export default class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      trophyColors: ['golden', 'silver', 'bronze'],
      leaderBoard: [],
      executionId: 1,
      executions: [],
      execution: 'execution1',
      teacher: window.location.pathname.includes('teacher')
    };
  }

  componentDidMount() {
    this.getExecutions();
    this.getLeaderBoard(this.state.executionId);
  }

  getExecutions = () => {
    APIHandler.getExecutions().then(resData => {
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

  getLeaderBoard = executionId => {
    APIHandler.getLeaderBoard(executionId).then(resData => {
      const scoreList = Object.entries(resData.data)
        .sort((a, b) => a[1].userScore < b[1].userScore)
        .map((element, index) => {
          element.ranking = index + 1;
          return element;
        });
      let leaderBoard = scoreList.splice(0, 3);
      if (this.state.teacher) {
        leaderBoard = leaderBoard.concat(scoreList);
      } else if (!leaderBoard.some(element => element[1].me)) {
        let trophyColors = [...this.state.trophyColors];
        trophyColors.push('red');
        this.setState({trophyColors});
        leaderBoard = leaderBoard.concat(
          scoreList.filter(element => element[1].me)
        );
      }
      if (resData.status === OK) {
        this.setState({leaderBoard, loading: false});
      }
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
            selection
            closeOnBlur
            scrolling
            options={this.state.executions}
            onChange={this.changeExecutionState}
            defaultValue={1}
          />
        </Grid.Row>
        <Grid.Row centered>
          {this.state.loading ? (
            viewHandler.getLoadingScreen()
          ) : (
            <Card.Group centered>
              {this.state.leaderBoard.map((element, index) => (
                <Card
                  key={'scoreCard' + element[1].userName}
                  color={element[1].me && !this.state.teacher ? 'red' : 'green'}
                  fluid={index >= 3}
                >
                  <Card.Content>
                    <Card.Header>
                      <Menu text>
                        <Menu.Item content={'Rang: ' + element.ranking} />
                        <Menu.Item>
                          <Icon
                            name="trophy"
                            className={
                              this.state.trophyColors[index] + 'Trophy'
                            }
                          />
                        </Menu.Item>
                        <Menu.Item
                          position="right"
                          content={element[1].userScore * 100 + '%'}
                        />
                      </Menu>
                    </Card.Header>
                    <Card.Description
                      className="userScoreName"
                      content={element[1].userName}
                    />
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
