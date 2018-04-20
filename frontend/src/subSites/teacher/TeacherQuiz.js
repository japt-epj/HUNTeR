import React from 'react';
import {Redirect} from 'react-router';

import {Button, Dimmer, Form, Grid, Loader, Modal} from 'semantic-ui-react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {formatDate} from 'react-day-picker/moment';

import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import StudentHandler from "../../handlers/StudentHandler";
import TableHandler from "../../handlers/TableHandler";
import FormHandler from "../../handlers/FormHandler";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            exercises: [],
            selectedExercises: [],
            students: [],
            selectedStudents: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size="large">Loading</Loader>
                </Dimmer>
            )],
            loadingExercises: true,
            loadingStudents: true,
            menuNumber: 0,
            minPageNumber: 0,
            maxPageNumber: 10,
            endDate: new Date(),
            fireRedirect: false
        };
        this.getExerciseTable = ExerciseHandler.getExerciseTable.bind(this);
        this.getStudentTable = StudentHandler.getStudentTable.bind(this);
        this.handleExerciseSelectment = ExerciseHandler.handleSelectment.bind(this);
        this.handleStudentSelectment = StudentHandler.handleSelectment.bind(this);
        this.getTablePageButtons = TableHandler.getTablePageButtons.bind(this);
        this.getQRCode = APIHandler.getQRCode;
        this.handlePageChange = this.handlePageChange.bind(this);
        this.resetPageNumber = this.resetPageNumber.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);

        this.handleSubmit = FormHandler.handleQuizSumbit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postData = APIHandler.postData.bind(this);
    }

    componentDidMount() {
        APIHandler.getExercises().then(resData => {
            if (resData.status === 200) {
                this.setState({
                    exercises: resData.data,
                    loadingExercises: false
                })
            }
        });
        APIHandler.getStudents().then(resData => {
            if (resData.status === 200) {
                this.setState({
                    students: resData.data,
                    loadingStudents: false
                })
            }
        });
    }

    handleDayChange(day) {
        this.setState({endDate: day});
    }

    handlePageChange(event, element) {
        if (element.index <= this.state.maxPageNumber && element.index >= this.state.minPageNumber) {
            this.setState({
                menuNumber: element.index,
                loading: true
            });
            APIHandler.getExercises()

            this.getExerciseTable();
        }
    }

    resetPageNumber(event) {
        this.setState({menuNumber: 0});
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid label="Titel" name="title" value={this.state.title}
                                        onChange={this.handleChange}
                                        placeholder="Bitte geben Sie einen Titel ein" required/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                        <Grid.Column>
                            <Form.Input label="Quiz endet am" inline>
                                <DayPickerInput format="DD.MM.YYYY" formatDate={formatDate} value={this.state.endDate}
                                                onDayChange={this.handleDayChange}
                                                dayPickerProps={{showWeekNumbers: true, todayButton: 'Heute'}}/>
                            </Form.Input>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                        <Grid.Column>
                            <Modal size="fullscreen"
                                   trigger={<Button icocolor="green" icon="add square" positive labelPosition="right"
                                                    label="Aufgabe hinzufügen" onClick={this.resetPageNumber}/>}
                                   closeIcon>
                                {this.state.loadingExercises && this.state.loadingScreen}
                                <Modal.Header content="Aufgaben hinzufügen"/>
                                <Modal.Content>
                                    <div>
                                        {!this.state.loadingExercises && this.getExerciseTable(true)}
                                    </div>
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                        <Grid.Column>
                            <Modal size="fullscreen"
                                   trigger={<Button icocolor="green" icon="add square" positive labelPosition="right"
                                                    label="Aufgabe hinzufügen" onClick={this.resetPageNumber}/>}
                                   closeIcon>
                                {this.state.loadingStudents && this.state.loadingScreen}
                                <Modal.Header content="Benutzer hinzufügen"/>
                                <Modal.Content>
                                    <div>
                                        {!this.state.loadingStudents && this.getStudentTable(true)}
                                    </div>
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Button type="submit" content="Submit"/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {this.state.fireRedirect && (<Redirect to="/"/>)}
            </Form>
        );
    }
}