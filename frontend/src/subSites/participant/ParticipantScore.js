import React from 'react';
import {OK} from 'http-status-codes';

import {Card, Dropdown, Grid, Icon, Menu} from 'semantic-ui-react';
import {isMobile} from 'react-device-detect';

import APIHandler from '../../handlers/APIHandler';

export default class ParticipantScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trophyColors: ['golden', 'silver', 'bronze', 'red'],
      leaderBoard: [],
      executionId: 1,
      quizzes: [],
      quiz: 'quiz1'
    };
  }

  componentDidMount() {
    this.getLeaderBoard(this.state.executionId);
  }

  getLeaderBoard = executionId => {
    APIHandler.getLeaderBoard(executionId).then(resData => {
      const scoreList = Object.entries(resData.data)
        .sort((a, b) => a[1].userScore < b[1].userScore)
        .map((element, index) => {
          element.ranking = index + 1;
          return element;
        });
      let leaderBoard = scoreList.slice(0, 3);
      if (!leaderBoard.some(element => element[1].me)) {
        leaderBoard = leaderBoard.concat(
          scoreList.filter(element => element[1].me)
        );
      }
      if (resData.status === OK) {
        this.setState({leaderBoard});
      }
    });
  };

  changeExecutionState = value => {
    this.setState({quiz: value});
  };

  render() {
    return (
      <Grid padded>
        <Grid.Row centered>
          <Card.Group centered>
            {this.state.leaderBoard.map((element, index) => (
              <Card
                key={'scoreCard' + element[1].userName}
                color={element[1].me ? 'red' : 'green'}
              >
                <Card.Content>
                  <Card.Header>
                    <Menu text>
                      <Menu.Item header>{element[1].userName}</Menu.Item>
                      <Menu.Item>
                        <Icon
                          name="trophy"
                          className={this.state.trophyColors[index] + 'Trophy'}
                        />
                      </Menu.Item>
                      <Menu.Item content={element[1].userScore * 100 + '%'} />
                      <Menu.Item content={'Rang: ' + element.ranking} />
                    </Menu>
                  </Card.Header>
                  <Card.Description />
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Row>
        <Grid.Row>
          <Dropdown
            fluid
            selection
            closeOnBlur
            scrolling
            upward={isMobile}
            options={this.state.quizzes}
          />
        </Grid.Row>
      </Grid>
    );
  }
}
