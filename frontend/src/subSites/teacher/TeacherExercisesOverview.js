import React from 'react';
import {NavLink} from 'react-router-dom';

import {Button, Dimmer, Loader} from 'semantic-ui-react';

import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';


export default class TeacherExerciseOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size="large">Loading</Loader>
                </Dimmer>
            )],
            loading: true,
            pageNumber: 1,
            minPage: 1,
            maxPage: '',
            limit: 5,
        };
        this.getExerciseTable = ExerciseHandler.getExerciseTable.bind(this);
        this.getQRCode = APIHandler.downloadQRCode;
        this.getJSONHeader = APIHandler.getJSONHeader;
        this.handlePageChangeExercises = this.handlePageChangeExercises.bind(this);
        this.getExercises = this.getExercises.bind(this);
    }


    componentDidMount() {
        this.getExercises(this.state.pageNumber, this.state.limit);
    }

    handlePageChangeExercises(event, element) {
        this.setState({
            pageNumber: element.activePage
        });
        this.getExercises(element.activePage, this.state.limit);
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

    render() {
        return (
            <div>
                {this.state.loading && this.state.loadingScreen}
                {!this.state.loading && this.getExerciseTable(false)}
                <NavLink to="/exercise">
                    <Button color="green" icon="add square" positive labelPosition="right"
                            label="Aufgabe hinzufügen"/>
                </NavLink>
            </div>
        );
    }
}