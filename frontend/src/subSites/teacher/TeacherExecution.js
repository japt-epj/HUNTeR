import React from 'react';
import {Redirect} from 'react-router';

import {Button, Dimmer, Form, Grid, Header, Loader, Modal} from 'semantic-ui-react';
import {BigInputMoment} from 'react-input-moment';
import moment from 'moment';

import APIHandler from '../../handlers/APIHandler';
import StudentHandler from "../../handlers/StudentHandler";
import QuizHandler from "../../handlers/QuizHandler";
import FormHandler from "../../handlers/FormHandler";


export default class TeacherExecution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            students: [],
            quizzes: [],
            selectedQuizId: '',
            selectedStudents: [],
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
            maxPage: '',
            modifiers: {
                highlighted: new Date(),
                after: (new Date()).getDate() + 1,
            },
            fireRedirect: false,
            startMoment: moment(),
            dueMoment: moment()
        };
        this.getStudentTable = StudentHandler.getStudentTable.bind(this);
        this.getQuizTable = QuizHandler.getQuizTable.bind(this);
        this.handleSelection = StudentHandler.handleSelection.bind(this);
        this.getQRCode = APIHandler.downloadQRCode;
        this.handlePageChange = this.handlePageChange.bind(this);
        this.resetPageNumber = this.resetPageNumber.bind(this);
        this.handleStartMomentChange = this.handleStartMomentChange.bind(this);
        this.handleDueMomentChange = this.handleDueMomentChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.getStudents = this.getStudents.bind(this);

        this.handleSubmit = FormHandler.handleQuizSumbit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postData = APIHandler.postData.bind(this);
    }

    componentDidMount() {
        this.getStudents(this.state.pageNumber, this.state.limit);
        this.getQuizzes(this.state.pageNumber, this.state.limit);
    }

    handlePageChange(event, element) {
        this.setState({
            pageNumber: element.activePage
        });
        this.getStudents(element.activePage, this.state.limit);
    }

    getStudents(page, limit) {
        APIHandler.getStudents(page, limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    students: resData.data.content,
                    maxPage: resData.data.totalPages,
                    loadingUser: false
                })
            }
        });
    }

    getQuizzes(page, limit) {
        APIHandler.getQuizzes(page, limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    quizzes: resData.data,
                    // maxPage: resData.data.totalPages,
                    loadingQuiz: false
                })
            }
        });
    }

    resetPageNumber(event) {
        event.preventDefault();
        this.setState({pageNumber: 1});
    }

    handleStartMomentChange(event) {
        this.setState({startMoment: moment(event._d)});
    }

    handleDueMomentChange(event) {
        this.setState({dueMoment: moment(event._d)});
    }

    handleDropdownChange(event, element) {
        this.setState({dueMoment: this.state.startMoment.clone().add(element.value.size, element.value.dimension)});
    }

    handleSelectChange = (e, {value}) => {
        this.setState({selectedQuizId: value});
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid label="Titel" name="title" value={this.state.title}
                                        onChange={this.handleChange}
                                        placeholder="Bitte geben Sie einen Titel für die Durchführung ein" required/>
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
                                    {!this.state.loadingUser && this.getStudentTable(true)}
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal" textAlign="center" id="dateTimePickerContainer">
                        <Grid.Column>
                            <Header content="Start Datum mit Uhrzeit eintragen"/>
                            <BigInputMoment moment={this.state.startMoment} onChange={this.handleStartMomentChange}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Header content="End Datum mit Uhrzeit eintragen"/>
                            <BigInputMoment moment={this.state.dueMoment} onChange={this.handleDueMomentChange}/>
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
        );
    }
}