import React from 'react';

import {Button, Dimmer, Form, Grid, Loader, Menu, Modal, Table} from 'semantic-ui-react';
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import StudentHandler from "../../handlers/StudentHandler";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseTable: [],
            studentTable: [],
            selectedExercises: [],
            selectedStudents: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size="large">Loading</Loader>
                </Dimmer>
            )],
            date: new Date(),
            loading: true,
            checkboxNeeded: true,
            menuNumber: 0,
            minPageNumber: 0,
            maxPageNumber: 10
        };
        this.getExerciseTableRows = ExerciseHandler.getExerciseTableRows.bind(this);
        this.getQRCode = APIHandler.getQRCode;
        this.getStudentRows = StudentHandler.getStudentRows.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.resetPageNumber = this.resetPageNumber.bind(this);
        this.dateChanger = this.dateChanger.bind(this);
    }

    componentDidMount() {
        this.getStudentRows();
        this.getExerciseTableRows();
    }

    dateChanger(date) {
        this.setState({date});
    }

    handlePageChange(event, element) {
        if (element.name <= this.state.maxPageNumber && element.name >= this.state.minPageNumber) {
            this.setState({
                menuNumber: element.name,
                loading: true
            });
            this.getExerciseTableRows();
            console.log(this.state.loading);
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
                            <Form.Input fluid label="Titel" placeholder="Bitte geben Sie einen Titel ein"/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                        <Grid.Column>
                            <Form.Input label="Quiz startet am" inline>
                                <DayPickerInput placeholder="DD.MM.YYYY" format="DD.MM.YYYY"/>
                            </Form.Input>
                        </Grid.Column>
                        <Grid.Column>
                            <Form.Input label="Quiz endet am" inline>
                                <DayPickerInput placeholder="DD.MM.YYYY" format="DD.MM.YYYY"/>
                            </Form.Input>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                        <Grid.Column>
                            <Modal size="fullscreen"
                                   trigger={<Button onClick={this.resetPageNumber}
                                                    content="Benutzer hinzufügen" icon="plus"/>}
                                   closeIcon>
                                {this.state.loading && this.state.loadingScreen}
                                <Modal.Content>
                                    <Modal.Description>
                                        <Table>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell colSpan="4">Benutzer
                                                        hinzufügen:</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>
                                            <Table.Body>
                                                {!this.state.loading && this.state.studentTable}
                                            </Table.Body>
                                            <Table.Footer>
                                                <Table.Row>
                                                    <Table.HeaderCell colSpan="5">
                                                        <Menu floated="right" pagination>
                                                            {(this.state.menuNumber - 1 >= this.state.minPageNumber && this.state.menuNumber - 1 <= this.state.maxPageNumber) &&
                                                            <Menu.Item as='a' icon="chevron left" content=""
                                                                       name={(this.state.menuNumber - 1).toString()}
                                                                       onClick={this.handlePageChange}/>}
                                                            {this.state.menuNumber !== this.state.minPageNumber &&
                                                            <Menu.Item as='a' content={this.state.menuNumber}
                                                                       name={this.state.menuNumber}
                                                                       onClick={this.handlePageChange}/>}
                                                            {(this.state.menuNumber + 1 >= this.state.minPageNumber && this.state.menuNumber + 1 <= this.state.maxPageNumber) &&
                                                            <Menu.Item as='a'
                                                                       content={(this.state.menuNumber + 1).toString()}
                                                                       name={this.state.menuNumber + 1}
                                                                       onClick={this.handlePageChange}/>}
                                                            {(this.state.menuNumber + 2 >= this.state.minPageNumber && this.state.menuNumber + 2 <= this.state.maxPageNumber) &&
                                                            <Menu.Item as='a'
                                                                       content={(this.state.menuNumber + 2).toString()}
                                                                       name={this.state.menuNumber + 2}
                                                                       onClick={this.handlePageChange}/>}
                                                            {(this.state.menuNumber + 1 >= this.state.minPageNumber && this.state.menuNumber + 2 <= this.state.maxPageNumber) &&
                                                            <Menu.Item as='a' icon="chevron right" content=""
                                                                       name={(this.state.menuNumber + 1).toString()}
                                                                       onClick={this.handlePageChange}/>}
                                                        </Menu>
                                                    </Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Footer>
                                        </Table>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="green" icon="refresh" label="Anpassen"/>
                                </Modal.Actions>
                            </Modal>
                        </Grid.Column>
                        <Grid.Column>
                            <Modal size="fullscreen"
                                   trigger={<Button onClick={this.resetPageNumber}
                                                    content="Benutzer hinzufügen" icon="plus"/>}
                                   closeIcon>
                                {this.state.loading && this.state.loadingScreen}
                                <Modal.Header>{'Aufgaben hinzufügen'}</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Table>
                                            <Table.Body>
                                                {!this.state.loading && this.state.exerciseTable}
                                            </Table.Body>
                                            <Table.Footer>
                                                <Table.Row>
                                                    <Table.HeaderCell colSpan="5">
                                                        <Menu floated="right" pagination>
                                                            {(this.state.menuNumber - 1 >= this.state.minPageNumber && this.state.menuNumber - 1 <= this.state.maxPageNumber) &&
                                                            <Menu.Item as='a' icon="chevron left" content=""
                                                                       name={this.state.menuNumber - 1}
                                                                       onClick={this.handlePageChange}/>}
                                                            {this.state.menuNumber !== this.state.minPageNumber &&
                                                            <Menu.Item as='a' content={this.state.menuNumber}
                                                                       name={this.state.menuNumber}
                                                                       onClick={this.handlePageChange}/>}
                                                            {(this.state.menuNumber + 1 >= this.state.minPageNumber && this.state.menuNumber + 1 <= this.state.maxPageNumber) &&
                                                            <Menu.Item as='a' content={this.state.menuNumber + 1}
                                                                       name={this.state.menuNumber + 1}
                                                                       onClick={this.handlePageChange}/>}
                                                            {(this.state.menuNumber + 2 >= this.state.minPageNumber && this.state.menuNumber + 2 <= this.state.maxPageNumber) &&
                                                            <Menu.Item as='a' content={this.state.menuNumber + 2}
                                                                       name={this.state.menuNumber + 2}
                                                                       onClick={this.handlePageChange}/>}
                                                            {(this.state.menuNumber + 1 >= this.state.minPageNumber && this.state.menuNumber + 2 <= this.state.maxPageNumber) &&
                                                            <Menu.Item as='a' icon="chevron right" content=""
                                                                       name={this.state.menuNumber + 1}
                                                                       onClick={this.handlePageChange}/>}
                                                        </Menu>
                                                    </Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Footer>
                                        </Table>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color="green" icon="refresh" label="Anpassen"/>
                                </Modal.Actions>
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