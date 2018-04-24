import React from 'react';
import {Redirect} from 'react-router';

import {Button, Dimmer, Form, Grid, Loader, Modal} from 'semantic-ui-react';

import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import TableHandler from "../../handlers/TableHandler";
import FormHandler from "../../handlers/FormHandler";


export default class TeacherQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            exercises: [],
            selectedExercises: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size="large">Loading</Loader>
                </Dimmer>
            )],
            loading: true,
            limit: 5,
            pageNumber: 1,
            minPage: 1,
            maxPage: '',
            endDate: new Date(),
            fireRedirect: false
        };
        this.getExerciseTable = ExerciseHandler.getExerciseTable.bind(this);
        this.handleSelection = ExerciseHandler.handleSelection.bind(this);
        this.getTablePageButtons = TableHandler.getTablePageButtons.bind(this);
        this.getQRCode = APIHandler.downloadQRCode;
        this.handlePageChange = this.handlePageChange.bind(this);
        this.resetPageNumber = this.resetPageNumber.bind(this);
        this.getExercises = this.getExercises.bind(this);


        this.handleSubmit = FormHandler.handleQuizSumbit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postData = APIHandler.postData.bind(this);
    }

    componentDidMount() {
        this.getExercises(this.state.pageNumber, this.state.limit);
    }

    handlePageChange(event, element) {
        this.setState({
            pageNumber: element.index
        });
        this.getExercises(element.index, this.state.limit);
    }

    getExercises(page, limit) {
        APIHandler.getExercises(page, limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    exercises: resData.data.content,
                    maxPage: resData.data.totalPages,
                    loading: false
                })
            }
        });
    }

    resetPageNumber() {
        this.setState({pageNumber: 1});
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Input fluid label="Titel" name="title" value={this.state.title}
                                        onChange={this.handleChange}
                                        placeholder="Bitte geben Sie einen Titel für das Quiz ein" required/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns="equal">
                        <Grid.Column>
                            <Modal size="fullscreen"
                                   trigger={<Button icocolor="green" icon="add square" positive labelPosition="right"
                                                    label="Aufgabe hinzufügen" onClick={this.resetPageNumber}/>}
                                   closeIcon>
                                {this.state.loading && this.state.loadingScreen}
                                <Modal.Header content="Aufgaben hinzufügen"/>
                                <Modal.Content scrolling>
                                    <div>
                                        {!this.state.loading && this.getExerciseTable(true)}
                                    </div>
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                        <Grid.Column>
                            <p>Ausgewählte Aufgaben:</p>
                            <p>{JSON.stringify(this.state.selectedExercises.sort((a, b) => a > b))}</p>
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