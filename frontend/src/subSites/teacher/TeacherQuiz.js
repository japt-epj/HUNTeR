import React from 'react';
import {Redirect} from 'react-router-dom';

import {OK} from 'http-status-codes';
import {Form, Grid} from 'semantic-ui-react';

import {map, messages, modalOptions, numbers} from '../../config/hunterUiDefaults';
import {
  apiHandler,
  exerciseHandler,
  formHandler,
  mapHandler,
  modalHandler,
  tableHandler
} from '../../handlers/hunterHandlers';

export default class TeacherQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: modalOptions.quiz,
      hideAgreement: messages.hideAgreement(),
      formOK: true,
      name: '',
      exercises: [],
      selectedCheckboxes: [],
      bulkCheckboxes: [],
      selectedExercises: [],
      loading: true,
      pageNumber: numbers.pageNumber,
      pageNumberSelectedExercises: numbers.pageNumber,
      minPage: 1,
      maxPage: '',
      fireRedirect: false,
      selectedPositions: new Map(),
      map: {
        location: undefined,
        zoom: numbers.zoomSize,
        clicked: false,
        currentExercise: undefined,
        popupText: undefined
      }
    };

    this.addPosition = mapHandler.addPosition.bind(this);
    this.defaultPageNumber = numbers.pageNumber;
    this.exerciseLimitPerPage = numbers.exerciseLimitPerPage;
    this.getAddExerciseModal = modalHandler.getAddExerciseModal.bind(this);

    this.getExerciseTable = exerciseHandler.getExerciseTable.bind(this);
    this.getSelectedExerciseTable = exerciseHandler.getSelectedExerciseTable.bind(this);
    this.handleSingleSelection = exerciseHandler.handleSingleSelection.bind(this);
    this.handleBulkSelection = exerciseHandler.handleBulkSelection.bind(this);
    this.updateSelection = exerciseHandler.updateSelection.bind(this);
    this.getQuizMap = mapHandler.getQuizMap.bind(this);

    this.getSubmitCancelButton = tableHandler.getSubmitCancelButton.bind(this);
    this.handleSubmit = formHandler.handleQuizSumbit.bind(this);
    this.handleChange = formHandler.handleChange.bind(this);
    this.postData = apiHandler.postData.bind(this);
    this.getJSONHeader = apiHandler.getJSONHeader;
    this.getAgreement = modalHandler.getAgreement.bind(this);
    this.getFormError = modalHandler.getFormError.bind(this);

    this.mapref = React.createRef();
  }

  componentDidMount() {
    if (this.state.hideAgreement) {
      this.locate();
    }
    this.getExercises(this.state.pageNumber);
  }

  getExercises = page => {
    apiHandler.getPaginatedElements('exercise', page).then(resData => {
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
    const defaultPageNumber = numbers.pageNumber;
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
    apiHandler
      .getExerciseArray(
        this.state.selectedCheckboxes.slice(
          (currentPage - 1) * this.exerciseLimitPerPage,
          currentPage * this.exerciseLimitPerPage
        )
      )
      .then(resData => {
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
        {this.state.successMessage.showModal && modalHandler.getCreationSuccess(this.state.successMessage)}
        {!this.state.formOK &&
          this.getFormError('Keine Aufgabe ausgewählt oder eine Location für eine Aufgabe vergessen.')}
        <Form onSubmit={this.handleSubmit}>
          <Grid>
            {!this.state.hideAgreement && this.getAgreement()}
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
              <Grid.Column width={map.quizWidth}>
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
