import React from 'react';

import {
  Button,
  Card,
  Dropdown,
  Grid,
  Icon,
  Menu,
  Modal,
  Progress,
  Statistic
} from 'semantic-ui-react';

import Data from '../../data/Data';
import APIHandler from '../../handlers/APIHandler';

export default class ParticipantScore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      quiz: 'quiz1'
    };
  }

  componentDidMount() {
    this.getQuizzes(this.state.pageNumber, this.state.limit);
  }

  getQuizzes = () => {
    APIHandler.getPaginatedElements('quiz', 1, 200).then(resData => {
      if (resData.status === 200) {
        this.setState({
          quizzes: resData.data.content.map(element => {
            element.key = element.id;
            element.value = element.id;
            element.text = element.name;
            return element;
          }),
          maxPageQuizzes: resData.data.totalPages,
          loadingQuizzes: false
        });
      }
    });
  };

  getColor = (element, index) => {
    if (element.correctAnswers[index]) {
      return 'green';
    } else {
      return 'red';
    }
  };

  getUserAnswer = (element, index) => {
    if (element.userAnswers[index]) {
      return <Icon name="checkmark box" size="large" />;
    } else {
      return <Icon name="" />;
    }
  };

  buildScoreOverview = quizProgress => {
    return [
      {
        key: 'exercise',
        label: 'Aufgaben insgesammt',
        value: quizProgress.exercises
      },
      {
        key: 'solvedExercises',
        label: 'Aufgaben gelöst',
        value: quizProgress.solvedExercises
      },
      {key: 'points', label: 'Punkte insgesammt', value: quizProgress.points}
    ];
  };

  getScore = element => {
    let points = 0;
    element.correctAnswers.forEach(function(answer, index) {
      if (answer === element.userAnswers[index]) {
        points += 1;
      } else {
        points -= 1;
      }
    });
    return (points < 0 ? 0 : points) + '/4';
  };

  changeQuizState = value => {
    this.setState({quiz: value});
  };

  render() {
    return (
      <Grid padded>
        <Grid.Row centered>
          <Card.Group centered>
            {Data.getLeaderBoard().map(element => (
              <Card key={'scoreCard' + element.name}>
                <Card.Content>
                  <Card.Header>
                    <Menu text>
                      <Menu.Item header>{element.name}</Menu.Item>
                      <Menu.Item>
                        <Icon
                          name="trophy"
                          className={element.trophyColor + 'Trophy'}
                        />
                      </Menu.Item>
                    </Menu>
                  </Card.Header>
                  <Card.Description>{element.score}</Card.Description>
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
            upward={/Mobi/.test(navigator.userAgent)}
            options={this.state.quizzes}
          />
        </Grid.Row>
        <Grid.Row>
          <Modal
            style={{marginTop: 0}}
            size="fullscreen"
            trigger={<Button content="Resultate einsehen" />}
            closeIcon
          >
            <Modal.Header>
              {'Andi Hörler - ' + Data.getQuiz(this.state.quiz).text}
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Statistic.Group
                  items={this.buildScoreOverview(Data.getQuiz(this.state.quiz))}
                  size="mini"
                  horizontal
                />
                <Progress
                  value={Data.getProgress(this.state.quiz).value}
                  total={Data.getProgress(this.state.quiz).total}
                  progress="ratio"
                />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Grid.Row>
      </Grid>
    );
  }
}
