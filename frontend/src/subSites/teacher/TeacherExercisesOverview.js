import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Dimmer, Loader} from 'semantic-ui-react';

import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';


export default class TeacherExercisesOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            exerciseTable: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size="large">Loading</Loader>
                </Dimmer>
            )],
            loadingExercises: true,
            pageNumber: 1,
            minPage: 1,
            maxPageExercise: '',
            limit: 5,
        };
        this.getExerciseTable = ExerciseHandler.getExerciseTable.bind(this);
        this.getQRCode = APIHandler.downloadQRCode;
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(event, element) {
        this.setState({
            pageNumber: element.index,
            loadingStudents: true,
        });
        APIHandler.getExercises(element.index, this.state.limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    exercises: resData.data.content,
                    maxPageStudent: resData.data.totalPages,
                    loadingStudents: false
                })
            }
        });
    }

    componentDidMount() {
        APIHandler.getExercises(this.state.pageNumber, this.state.limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    exercises: resData.data.content,
                    maxPageExercise: resData.data.totalPages,
                    loadingExercises: false
                })
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.loadingExercises && this.state.loadingScreen}
                {!this.state.loadingExercises && this.getExerciseTable(false)}
                <NavLink to="/exercise">
                    <Button icocolor="green" icon="add square" positive labelPosition="right"
                            label="Aufgabe hinzufügen"/>
                </NavLink>
            </div>
        );
    }
}