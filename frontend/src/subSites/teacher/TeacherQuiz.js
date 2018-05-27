import React from 'react';
import {Redirect} from 'react-router';

import {Button, Form, Grid, Modal} from 'semantic-ui-react';
import L from 'leaflet';
import {Map as LeafletMap, Marker, Tooltip, TileLayer} from 'react-leaflet';
import {OK} from 'http-status-codes';

import defaultUIConfig from '../../config/defaultUIConfig';
import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import FormHandler from '../../handlers/FormHandler';
import ModalHandler from '../../handlers/ModalHandler';
import getLoadingScreen from '../../components/getLoadingScreen';

export default class TeacherQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: defaultUIConfig.defaultSuccessMessages.quiz,
      showAgreement: defaultUIConfig.showAgreement,
      formOK: true,
      name: '',
      exercises: [],
      selectedCheckboxes: [],
      bulkCheckboxes: [],
      selectedExercises: [],
      loading: true,
      pageNumber: defaultUIConfig.defaultNumbers.pageNumber,
      pageNumberSelectedExercises: defaultUIConfig.defaultNumbers.pageNumber,
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

    this.defaultPageNumber = defaultUIConfig.defaultNumbers.pageNumber;
    this.exerciseLimitPerPage =
      defaultUIConfig.defaultNumbers.exerciseLimitPerPage;
    this.defaultZoomSize = 19;

    this.getExerciseTable = ExerciseHandler.getExerciseTable.bind(this);
    this.getSelectedExerciseTable = ExerciseHandler.getSelectedExerciseTable.bind(
      this
    );
    this.handleSelection = ExerciseHandler.handleSelection.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
    this.handlePageChangeExercises = this.handlePageChangeExercises.bind(this);
    this.resetPageNumber = this.resetPageNumber.bind(this);
    this.getExercises = this.getExercises.bind(this);

    this.handleSubmit = FormHandler.handleQuizSumbit.bind(this);
    this.handleChange = FormHandler.handleChange.bind(this);
    this.postData = APIHandler.postData.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
    this.postData = APIHandler.postData.bind(this);
    this.handleChange = FormHandler.handleChange.bind(this);
    this.handleSubmit = FormHandler.handleQuizSumbit.bind(this);
    this.getAgreement = ModalHandler.getAgreement.bind(this);
    this.getFormError = ModalHandler.getFormError.bind(this);

    this.mapref = React.createRef();
  }

  componentDidMount() {
    this.getExercises(this.state.pageNumber);
  }

  getExercises = page => {
    APIHandler.getPaginatedElements('exercise', page).then(resData => {
      if (resData.status === OK) {
        this.setState({
          exercises: resData.data.content,
          maxPage: resData.data.totalPages,
          loading: false
        });
      }
    });
  };

  resetPageNumber = event => {
    event.preventDefault();
    this.setState({pageNumber: this.defaultPageNumber});
  };

  handleClick = event => {
    let map = {...this.state.map};
    map.location = event.latlng;
    map.zoom = this.mapref.current.leafletElement.getZoom();
    map.clicked = true;
    let newPositions = this.state.selectedPositions;
    if (this.state.map.currentExercise !== undefined) {
      newPositions.set(this.state.map.currentExercise, this.state.map.location);
    }
    this.setState({
      selectedPositions: newPositions,
      map
    });
  };

  handleZoom = event => {
    let map = {...this.state.map};
    map.zoom = this.mapref.current.leafletElement.getZoom();
    this.setState({map});
  };

  locate = () => this.mapref.current.leafletElement.locate();

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
    this.getExercises(element.activePage);
  };

  handlePageChangeSelected = (event, element) => {
    let currentPage = element.activePage;
    this.setState({pageNumberSelectedExercises: element.activePage});
    APIHandler.getExerciseArray(
      this.state.selectedCheckboxes.slice(
        (currentPage - 1) * this.exerciseLimitPerPage,
        currentPage * this.exerciseLimitPerPage
      )
    ).then(resData => {
      if (resData.status === OK) {
        this.setState({selectedExercises: resData.data});
      } else {
        console.error('Error:' + resData);
      }
    });
  };

  render() {
    const image = L.icon({
      iconUrl: require('../../images/icons/e-map.png'),
      iconSize: [50, 94],
      iconAnchor: [50, 0]
    });

    return (
      <div>
        {this.state.successMessage.showModal &&
          ModalHandler.getCreationSuccess(this.state.successMessage)}
        {!this.state.formOK &&
          this.getFormError(
            'Keine Aufgabe ausgewählt oder eine Location für eine Aufgabe vergessen.'
          )}
        <Form onSubmit={this.handleSubmit}>
          <Grid>
            {this.state.showAgreement && this.getAgreement()}
            <Grid.Row>
              <Grid.Column>
                <Form.Input
                  fluid
                  label="Name des Quiz"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Bitte geben Sie einen Name für das Quiz ein"
                  required
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal" id="mapContainer">
              <Grid.Column width={6}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Modal
                        size="fullscreen"
                        trigger={
                          <Button
                            color={defaultUIConfig.buttonColors.normal}
                            icon="add square"
                            positive
                            labelPosition="right"
                            label="Aufgabe hinzufügen"
                            onClick={this.resetPageNumber}
                          />
                        }
                        closeIcon
                      >
                        <Modal.Header content="Aufgaben hinzufügen" />
                        <Modal.Content scrolling>
                          {this.state.loading
                            ? getLoadingScreen()
                            : this.getExerciseTable(true)}
                        </Modal.Content>
                      </Modal>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      {!this.state.loading &&
                        this.state.selectedCheckboxes.length !== 0 &&
                        this.getSelectedExerciseTable()}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <LeafletMap
                  center={this.state.map.location || [0, 0]}
                  onClick={this.handleClick}
                  onLocationFound={this.handleLocation}
                  zoom={this.state.map.zoom}
                  onZoomEnd={this.handleZoom}
                  ref={this.mapref}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {this.state.map.location !== undefined && (
                    <Marker position={this.state.map.location} icon={image}>
                      {this.state.map.popupText !== undefined && (
                        <Tooltip
                          direction="left"
                          offset={[-50, 75]}
                          opacity={0.9}
                          permanent
                        >
                          <span>{this.state.map.popupText}</span>
                        </Tooltip>
                      )}
                    </Marker>
                  )}
                </LeafletMap>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Form.Button content="Submit" />
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Form.Button
                  content="Abbrechen"
                  onClick={() => this.setState({fireRedirect: true})}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.fireRedirect && <Redirect to="/" />}
        </Form>
      </div>
    );
  }
}
