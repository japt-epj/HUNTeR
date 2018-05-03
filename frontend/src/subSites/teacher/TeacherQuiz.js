import React from 'react';
import {Redirect} from 'react-router';

import {Button, Dimmer, Form, Grid, Loader, Modal} from 'semantic-ui-react';
import L from 'leaflet';
import {Map as LeafletMap, Marker, Tooltip, TileLayer} from 'react-leaflet';

import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import FormHandler from "../../handlers/FormHandler";
import ModalHandler from "../../handlers/ModalHandler";


export default class TeacherQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formOK: true,
            name: '',
            exercises: [],
            selected: [],
            bulkCheckbox: '',
            selectedExercises: [],
            loadingScreen: [(
                <Dimmer active inverted key={'dimmer'}>
                    <Loader size="large">Loading</Loader>
                </Dimmer>
            )],
            loading: true,
            limit: 5,
            pageNumber: 1,
            pageNumberSelected: 1,
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
        this.getJSONHeader = APIHandler.getJSONHeader;
        this.handlePageChangeExercises = this.handlePageChangeExercises.bind(this);
        this.resetPageNumber = this.resetPageNumber.bind(this);
        this.getExercises = this.getExercises.bind(this);

        this.handleSubmit = FormHandler.handleQuizSumbit.bind(this);
        this.handleChange = FormHandler.handleChange.bind(this);
        this.postData = APIHandler.postData.bind(this);
        this.getJSONHeader = APIHandler.getJSONHeader;
        this.getFormError = ModalHandler.getFormError.bind(this);

        this.mapref = React.createRef();
    }

    componentDidMount() {
        this.getExercises(this.state.pageNumber, this.state.limit);
        this.mapref.current.leafletElement.locate();
    }

    getExercises = (page, limit) => {
        APIHandler.getExercises(page, limit).then(resData => {
            if (resData.status === 200) {
                this.setState({
                    exercises: resData.data.content,
                    maxPage: resData.data.totalPages,
                    loading: false
                })
            }
        });
    };

    resetPageNumber = event => {
        event.preventDefault();
        this.setState({pageNumber: 1});
    };

    handleClick = event => {
        let map = {...this.state.map};
        map.location = event.latlng;
        map.zoom = this.mapref.current.leafletElement.getZoom();
        map.clicked = true;
        let newPositions = this.state.selectedPositions;
        newPositions.set(this.state.map.currentExercise, this.state.map.location);
        this.setState({
            selectedPositions: newPositions,
            map: map
        });
    };

    handleZoom = event => {
        let map = {...this.state.map};
        map.zoom = this.mapref.current.leafletElement.getZoom();
        this.setState({map});
    };

    handleLocation = event => {
        let map = {...this.state.map};
        map.zoom = this.mapref.current.leafletElement.getZoom();
        map.location = event.latlng;
        map.clicked = false;
        this.setState({map});
    };

    handlePageChangeExercises = (event, element) => {
        this.setState({
            pageNumber: element.activePage
        });
        this.getExercises(element.activePage, this.state.limit);
    };

    handlePageChangeSelected = (event, element) => {
        let currentPage = element.activePage;
        let limit = this.state.limit;
        this.setState({
            pageNumberSelected: element.activePage
        });
        APIHandler.getExerciseArray(this.state.selected.slice((currentPage - 1) * limit, currentPage * limit)).then(resData => {
            if (resData.status === 200) {
                this.setState({selectedExercises: resData.data})
            } else {
                console.log('Error:' + resData);
            }
        });
    };


    render() {
        const image = L.icon({
            iconUrl: require('../../images/icons/e-map.png'),
            iconSize: [50, 94],
            iconAnchor: [50, 0]
        });

        const marker = this.state.map.location !== undefined ? (
            <Marker position={this.state.map.location} icon={image}>
                {this.state.map.popupText !== undefined &&
                <Tooltip direction="left" offset={[-50, 75]} opacity={0.9} permanent>
                    <span>{this.state.map.popupText}</span>
                </Tooltip>}
            </Marker>
        ) : null;

        return (
            <div>
                {!this.state.formOK && this.getFormError('Keine Aufgabe ausgewählt oder eine Location für eine Aufgabe vergessen.')}
                <Form onSubmit={this.handleSubmit}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Input fluid label="Name" name="name" value={this.state.name}
                                            onChange={this.handleChange}
                                            placeholder="Bitte geben Sie einen Name für das Quiz ein" required/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns="equal" id="mapContainer">
                            <Grid.Column width={4}>
                                {!this.state.loading && this.state.selected.length !== 0 && this.getSelectedExerciseTable()}
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
                        <Grid.Row columns="equal">
                            <Grid.Column>
                                <Modal size="fullscreen"
                                       trigger={<Button color="green" icon="add square" positive
                                                        labelPosition="right"
                                                        label="Aufgabe hinzufügen" onClick={this.resetPageNumber}/>}
                                       closeIcon>
                                    {this.state.loading && this.state.loadingScreen}
                                    <Modal.Header content="Aufgaben hinzufügen"/>
                                    <Modal.Content scrolling>
                                        {!this.state.loading && this.getExerciseTable(true)}
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
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