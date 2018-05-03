import React from 'react';
import {Redirect} from 'react-router';

import {Button, Dimmer, Form, Grid, Header, Loader, Modal} from 'semantic-ui-react';
import DateTime from 'react-datetime';
import moment from 'moment';
import 'moment/locale/de-ch';
import '../../style/react-datetime.css';

import APIHandler from '../../handlers/APIHandler';
import ParticipantHandler from "../../handlers/ParticipantHandler";
import QuizHandler from "../../handlers/QuizHandler";
import FormHandler from "../../handlers/FormHandler";
import ModalHandler from "../../handlers/ModalHandler";


export default class TeacherExecution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formOK: true,
            name: '',
            participants: [],
            quizzes: [],
            bulkCheckbox: '',
            selectedQuizId: undefined,
            selectedParticipants: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size="large">Loading</Loader>
                </Dimmer>
            )],
            loadingUser: true,
            loadingQuiz: true,
            limit: 5,
            pageNumber: 1,
            minPage: 1,
            maxPageQuiz: '',
            maxPageParticipant: '',
            modifiers: {
                highlighted: new Date(),
                after: (new Date()).getDate() + 1,
            },
            fireRedirect: false,
            startDate: moment(),
            endDate: moment().add(1, "hour")
        };
        this.getParticipantTable = ParticipantHandler.getParticipantTable.bind(this);
        this.handleSelection = ParticipantHandler.handleSelection.bind(this);
        this.getQuizTable = QuizHandler.getQuizTable.bind(this);

        this.handleSubmit = FormHandler.handleExecutionSumbit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postData = APIHandler.postData.bind(this);
        this.getFormError = ModalHandler.getFormError.bind(this);
    }

    componentDidMount() {
        this.getParticipants(this.state.pageNumber, this.state.limit);
        this.getQuizzes(this.state.pageNumber, this.state.limit);
    }

    getParticipants = (page, limit) => {
        APIHandler.getParticipants(page, limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    participants: resData.data.content,
                    maxPageParticipant: resData.data.totalPages,
                    loadingUser: false
                })
            }
        });
    };

    getQuizzes = (page, limit) => {
        APIHandler.getQuizzes(page, limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    quizzes: resData.data.content,
                    maxPageQuiz: resData.data.totalPages,
                    loadingQuiz: false
                })
            }
        });
    };

    handlePageChangeParticipants = (event, element) => {
        this.setState({
            pageNumber: element.activePage
        });
        this.getParticipants(element.activePage, this.state.limit);
    };

    handlePageChangeQuizzes = (event, element) => {
        this.setState({
            pageNumber: element.activePage
        });
        this.getQuizzes(element.activePage, this.state.limit);
    };

    resetPageNumber = event => {
        event.preventDefault();
        this.setState({pageNumber: 1});
    };

    handleStartMomentChange = event => {
        if (event._d >= this.state.endDate) {
            this.setState({endDate: moment(event._d).add(1, "hour")});
        }
        this.setState({startDate: moment(event._d)});
    };

    handleEndMomentChange = event => {
        this.setState({endDate: moment(event._d)});
    };

    handleSelectChange = (e, {value}) => {
        this.setState({selectedQuizId: value});
    };

    isStartDateValid = current => {
        return current.isAfter(moment().add(-1, "day"));
    };

    isEndDateValid = current => {
        return current.isAfter(this.state.startDate);
    };

    render() {
        return (
            <div>
                {!this.state.formOK && this.getFormError('Kein Quiz ausgewählt oder keine Schüler der Execution zugeordnet.')}
                <Form onSubmit={this.handleSubmit}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input fluid label="Name" name="name" value={this.state.name}
                                            onChange={this.handleChange}
                                            placeholder="Bitte geben Sie einen Name für die Durchführung ein" required/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal">
                            <Grid.Column>
                                <Modal size="fullscreen"
                                       trigger={<Button color="green" icon="add square" positive labelPosition="right"
                                                        label="Quiz für die Durchführung auswählen"

                                                        onClick={this.resetPageNumber}/>}
                                       closeIcon>
                                    {this.state.loadingQuiz && this.state.loadingScreen}
                                    <Modal.Header content="Quiz auswählen"/>
                                    <Modal.Content scrolling>
                                        {!this.state.loadingQuiz && this.getQuizTable(true)}
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                            <Grid.Column>
                                <Modal size="fullscreen"
                                       trigger={<Button color="green" icon="add square" positive labelPosition="right"
                                                        label="Benutzer zur Durchführung hinzufügen"
                                                        onClick={this.resetPageNumber}/>}
                                       closeIcon>
                                    {this.state.loadingUser && this.state.loadingScreen}
                                    <Modal.Header content="Benutzer hinzufügen"/>
                                    <Modal.Content scrolling>
                                        {!this.state.loadingUser && this.getParticipantTable(true)}
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal" textAlign="center" id="dateTimePickerContainer">
                            <Grid.Column>
                                <Header content="Start Datum mit Uhrzeit eintragen"/>
                                <DateTime isValidDate={this.isStartDateValid} value={this.state.startDate}
                                          onChange={this.handleStartMomentChange}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Header content="End Datum mit Uhrzeit eintragen"/>
                                <DateTime isValidDate={this.isEndDateValid} value={this.state.endDate}
                                          onChange={this.handleEndMomentChange}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Button content="Submit"/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {this.state.fireRedirect && (<Redirect to="/"/>)}
                </Form>
            </div>
        );
    }
}