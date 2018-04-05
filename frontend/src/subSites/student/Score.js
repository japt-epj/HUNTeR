import React from 'react';

import {Button, Card, Dropdown, Grid, Icon, Menu, Modal, Progress, Segment, Statistic, Tab} from 'semantic-ui-react';

import Data from '../../data/Data';


export default class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {quiz: 'quiz1'};
        this.changeQuizState = this.changeQuizState.bind(this);
    }

    static getColor(element, index) {
        if (element.correctAnswers[index] === true) {
            return 'green';
        } else {
            return 'red';
        }
    }

    static getUserAnswer(element, index) {
        if (element.userAnswers[index] === true) {
            return <Icon name="checkmark box" size="large"/>;
        } else {
            return <Icon name=""/>;
        }
    }

    static buildScoreOverview(quizProgress) {
        return [
            {key: 'exercise', label: 'Aufgaben insgesammt', value: quizProgress.exercises},
            {key: 'solvedExercises', label: 'Aufgaben gelöst', value: quizProgress.solvedExercises},
            {key: 'points', label: 'Punkte insgesammt', value: quizProgress.points}
        ];
    }

    static getScore(element) {
        let points = 0;
        element.correctAnswers.forEach(function (answer, index) {
            if (answer === element.userAnswers[index]) {
                points += 1;
            } else {
                points -= 1;
            }
        });
        return ((points < 0) ? 0 : points) + "/4";
    }

    changeQuizState(value) {
        this.setState({quiz: value});
    };

    getTabs() {
        return (
            <Tab panes={Data.getResults(this.state.quiz).map((element, index) =>
                <Tab.Pane attached={false} key={'tab' + element.key}>
                    Lösungen Aufgabe {index + 1} | Punkte: {Score.getScore(element)}
                    <Segment.Group horizontal>
                        {Array.apply(null, Array(element.correctAnswers.length)).map(function (item, i) {
                            return (
                                <Segment inverted color={Score.getColor(element, i)}
                                         key={element.key + 'Answer' + i}>{
                                    Score.getUserAnswer(element, i)}</Segment>
                            );
                        })}
                    </Segment.Group>
                </Tab.Pane>
            )}/>
        );
    }

    render() {
        return (
            <Grid>
                <Grid.Row centered>
                    <Card.Group centered>
                        {Data.getLeaderBoard().map(element =>
                            <Card key={'scoreCard' + element.name}>
                                <Card.Content>
                                    <Card.Header>
                                        <Menu text>
                                            <Menu.Item header>{element.name}</Menu.Item>
                                            <Menu.Item><Icon name="trophy"
                                                             className={element.trophyColor + 'Trophy'}/></Menu.Item>
                                        </Menu>
                                    </Card.Header>
                                    <Card.Description>
                                        {element.score}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        )}
                    </Card.Group>
                </Grid.Row>
                <Grid.Row>
                    <Dropdown
                        fluid selection closeOnBlur scrolling upward={/Mobi/.test(navigator.userAgent)}
                        options={Data.getQuizzes()}
                        onChange={(e, {value}) => this.changeQuizState(value)}
                        defaultValue={this.state.quiz}
                    />
                </Grid.Row>
                <Grid.Row>
                    <Modal style={{marginTop: 0}} size="fullscreen"
                           trigger={<Button>Resultate einsehen</Button>}
                           closeIcon>
                        <Modal.Header>{'Andi Hörler - ' + Data.getQuiz(this.state.quiz).text}</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <Statistic.Group items={Score.buildScoreOverview(Data.getQuiz(this.state.quiz))}
                                                 size="mini"
                                                 horizontal/>
                                <Progress value={Data.getProgress(this.state.quiz).value}
                                          total={Data.getProgress(this.state.quiz).total}
                                          progress="ratio"/>
                                {this.getTabs()}
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Grid.Row>
            </Grid>
        );
    }
}