import React from 'react';
import {Redirect} from 'react-router';

import {Button, Dimmer, Form, Grid, Loader, Modal} from 'semantic-ui-react';
import L from 'leaflet';
import {Map as LeafletMap, Marker, Tooltip, TileLayer} from 'react-leaflet';

import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import FormHandler from "../../handlers/FormHandler";
import pin from '../../images/icons/e-map.png'


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
            fireRedirect: false,
            selectedPositions: new Map(),
            map: {
                location: undefined,
                zoom: 19,
                clicked: false,
                currentExercise: undefined,
                popupText: undefined
            }
        };
        this.getExerciseTable = ExerciseHandler.getExerciseTable.bind(this);
        this.getSelectedExerciseTable = ExerciseHandler.getSelectedExerciseTable.bind(this);
        this.handleSelection = ExerciseHandler.handleSelection.bind(this);
        this.getQRCode = APIHandler.downloadQRCode;
        this.handlePageChange = this.handlePageChange.bind(this);
        this.resetPageNumber = this.resetPageNumber.bind(this);
        this.getExercises = this.getExercises.bind(this);

        this.handleSubmit = FormHandler.handleQuizSumbit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postData = APIHandler.postData.bind(this);
        this.mapref = React.createRef();
    }

    componentDidMount() {
        this.getExercises(this.state.pageNumber, this.state.limit);
        this.mapref.current.leafletElement.locate();
    }

    // these functions are defined as lambdas to keep the this scope on Component.
    handleClick = e => {
        let map = {...this.state.map};
        map.location = e.latlng;
        map.zoom = this.mapref.current.leafletElement.getZoom();
        map.clicked = true;
        this.setState({map});
    };

    handleZoom = e => {
        let map = {...this.state.map};
        map.zoom = this.mapref.current.leafletElement.getZoom();
        this.setState({map});
    };

    handleLocation = e => {
        let map = {...this.state.map};
        map.zoom = this.mapref.current.leafletElement.getZoom();
        map.location = e.latlng;
        map.clicked = false;
        this.setState({map});
    };


    handlePageChange(event, element) {
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

    resetPageNumber() {
        this.setState({pageNumber: 1});
    }

    render() {
        const image = L.icon({
            iconUrl: require('../../images/icons/e-map.png'),
            iconSize: [57, 50],
            iconAnchor: [25, 57]
        });

        const marker = this.state.map.location && (
            <Marker position={this.state.map.location} icon={image}>
                {this.state.map.popupText !== undefined &&
                <Tooltip direction='right' offset={[6, -45]} opacity={0.7} permanent>
                    <span>{this.state.map.popupText}</span>
                </Tooltip>}
            </Marker>
        );
        return (
            <div>
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
                                       trigger={<Button color="green" icon="add square" positive labelPosition="right"
                                                        label="Aufgabe hinzufügen" onClick={this.resetPageNumber}/>}
                                       closeIcon>
                                    {this.state.loading && this.state.loadingScreen}
                                    <Modal.Header content="Aufgaben hinzufügen"/>
                                    <Modal.Content scrolling>
                                        {!this.state.loading && this.getExerciseTable(true)}
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal" className="mapContainer">
                            <Grid.Column width={4}>
                                {!this.state.loading && this.state.selectedExercises.length !== 0 && this.getSelectedExerciseTable()}
                            </Grid.Column>
                            <Grid.Column>
                                <LeafletMap
                                    center={this.state.map.location || [0, 0]}
                                    onClick={this.handleClick}
                                    onLocationFound={this.handleLocation}
                                    zoom={this.state.map.zoom}
                                    onZoomEnd={this.handleZoom}
                                    ref={this.mapref}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                    {marker}
                                </LeafletMap>
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
            </div>
        );
    }
}