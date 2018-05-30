import React from 'react';
import {Redirect} from 'react-router';

import {Form, Grid} from 'semantic-ui-react';
import {OK} from 'http-status-codes';

import defaultUIConfig from '../../config/defaultUIConfig';
import ExerciseHandler from '../../handlers/ExerciseHandler';
import APIHandler from '../../handlers/APIHandler';
import FormHandler from '../../handlers/FormHandler';
import ModalHandler from '../../handlers/ModalHandler';
import TableHandler from '../../handlers/TableHandler';
import MapHandler from '../../handlers/MapHandler';

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

    this.addPosition = MapHandler.addPosition.bind(this);
    this.defaultPageNumber = defaultUIConfig.defaultNumbers.pageNumber;
    this.exerciseLimitPerPage =
      defaultUIConfig.defaultNumbers.exerciseLimitPerPage;
    this.defaultZoomSize = 19;
    this.getAddExerciseModal = ModalHandler.getAddExerciseModal.bind(this);

    this.getExerciseTable = ExerciseHandler.getExerciseTable.bind(this);
    this.getSelectedExerciseTable = ExerciseHandler.getSelectedExerciseTable.bind(
      this
    );
    this.handleSingleSelection = ExerciseHandler.handleSingleSelection.bind(
      this
    );
    this.handleBulkSelection = ExerciseHandler.handleBulkSelection.bind(this);
    this.updateSelection = ExerciseHandler.updateSelection.bind(this);
    this.getQuizMap = MapHandler.getQuizMap.bind(this);

    this.getSubmitCancelButton = TableHandler.getSubmitCancelButton.bind(this);
    this.handleSubmit = FormHandler.handleQuizSumbit.bind(this);
    this.handleChange = FormHandler.handleChange.bind(this);
    this.postData = APIHandler.postData.bind(this);
    this.getJSONHeader = APIHandler.getJSONHeader;
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
    const defaultPageNumber = 1;
    this.getExercises(defaultPageNumber);
    this.setState({pageNumber: defaultPageNumber});
  };

  handleClick = event => {
    let map = {...this.state.map};
    map.location = event.latlng;
    map.zoom = this.mapref.current.leafletElement.getZoom();
    map.clicked = true;
    let newPositions = new Map(this.state.selectedPositions);
    if (Boolean(this.state.map.currentExercise)) {
      newPositions.set(this.state.map.currentExercise, this.state.map.location);
    }
    this.setState({
      selectedPositions: newPositions,
      map
    });
  };

  handleZoom = () => {
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

  handlePageChangeSelectedExercises = (event, element) => {
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
                    <Grid.Column>{this.getAddExerciseModal()}</Grid.Column>
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
              <Grid.Column>{this.getQuizMap()}</Grid.Column>
            </Grid.Row>
            {this.getSubmitCancelButton()}
          </Grid>
          {this.state.fireRedirect && <Redirect to="/" />}
        </Form>
      </div>
    );
  }
}
