import React from 'react';

import {Button, Dimmer, Form, Grid, Loader, Modal, Table} from 'semantic-ui-react';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import {formatDate} from 'react-day-picker/moment';

import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import StudentHandler from "../../handlers/StudentHandler";
import TableHandler from "../../handlers/TableHandler";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            startDate: new Date()
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
        this.setState({startDate: day});
    }

    handlePageChange(event, element) {
        if (element.index <= this.state.maxPageNumber && element.index >= this.state.minPageNumber) {
            this.setState({
                menuNumber: element.index,
                loading: true
            });
            this.getExerciseTable();
        }
    }

    resetPageNumber(event) {
        this.setState({menuNumber: 0});
    }

    render() {
        return (
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid label="Titel" placeholder="Bitte geben Sie einen Titel ein" required/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                        <Grid.Column>
                            <Form.Input label="Quiz endet am" inline>
                                <DayPickerInput format="DD.MM.YYYY" formatDate={formatDate} value={this.state.startDate}
                                                onDayChange={this.handleDayChange}
                                                dayPickerProps={{showWeekNumbers: true, todayButton: 'Heute'}}/>
                            </Form.Input>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                        <Grid.Column>
                            <Modal size="fullscreen"
                                   trigger={<Button onClick={this.resetPageNumber}
                                                    content="Aufgabe hinzufügen" icon="plus"/>}
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
                                   trigger={<Button onClick={this.resetPageNumber}
                                                    content="Benutzer hinzufügen" icon="plus"/>}
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
                            <Form.Button>Submit</Form.Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }
}