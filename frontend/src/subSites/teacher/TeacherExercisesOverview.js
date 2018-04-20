import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Dimmer, Loader} from 'semantic-ui-react';

import TableHandler from '../../handlers/TableHandler';
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
            menuNumber: 0,
            minPageNumber: 0,
            maxPageNumber: 10
        };
        this.handleSelectmentChange = this.handleSelectmentChange.bind(this);
        this.getExerciseTable = ExerciseHandler.getExerciseTable.bind(this);
        this.getTablePageButtons = TableHandler.getTablePageButtons.bind(this);
        this.getQRCode = APIHandler.getQRCode;
    }

    handleSelectmentChange = (event, {value}) => this.setState({qrCodeCheckBox: value});

    componentDidMount() {
        APIHandler.getExercises().then(resData => {
            if (resData.status === 200) {
                this.setState({
                    exercises: resData.data,
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