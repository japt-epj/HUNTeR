import React from 'react';
import {Redirect} from 'react-router-dom';

import {OK} from 'http-status-codes';
import {Form, Grid} from 'semantic-ui-react';

import {map, messages, modalOptions, numbers} from '../../config/hunterUiDefaults';
import {apiGetHandler, apiPostHandler} from '../../handlers/hunterApiHandlers';
import {formSubmitHandler, formChangeHandler} from '../../handlers/hunterFormHandlers';
import {
  mapInteractionHandler,
  mapLocationHandler,
  mapPositionHandler,
  mapViewHandler
} from '../../handlers/hunterMapHandlers';
import {paginationPageChangeHandler} from '../../handlers/hunterPaginationHandlers';
import {exerciseHandler, modalHandler, tableHandler} from '../../handlers/hunterViewHandlers';

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

    this.handleZoom = mapInteractionHandler.handleZoom.bind(this);
    this.locate = mapLocationHandler.locate.bind(this);
    this.teacherQuizHandleLocation = mapLocationHandler.teacherQuizHandleLocation.bind(this);
    this.addPosition = mapPositionHandler.addPosition.bind(this);
    this.getQuizMap = mapViewHandler.getQuizMap.bind(this);

    this.defaultPageNumber = numbers.pageNumber;
    this.exerciseLimitPerPage = numbers.exerciseLimitPerPage;
    this.getAddExerciseModal = modalHandler.getAddExerciseModal.bind(this);

    this.getExerciseTable = exerciseHandler.getExerciseTable.bind(this);
    this.getSelectedExerciseTable = exerciseHandler.getSelectedExerciseTable.bind(this);
    this.handleSingleSelection = exerciseHandler.handleSingleSelection.bind(this);
    this.handleBulkSelection = exerciseHandler.handleBulkSelection.bind(this);
    this.updateSelection = exerciseHandler.updateSelection.bind(this);

    this.getSubmitCancelButton = tableHandler.getSubmitCancelButton.bind(this);
    this.handleSubmit = formSubmitHandler.handleQuizSumbit.bind(this);
    this.handleChange = formChangeHandler.handleChange.bind(this);
    this.pageChangeSelectedExercises = paginationPageChangeHandler.pageChangeSelectedExercises.bind(this);
    this.pageChangeExercises = paginationPageChangeHandler.pageChangeExercises.bind(this);
    this.postData = apiPostHandler.postData.bind(this);
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
    apiGetHandler.getPaginatedElements('exercise', page).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      this.setState({
        exercises: resData.data.content,
        maxPage: resData.data.totalPages,
        loading: false
      });
    });
  };

  resetPageNumber = event => {
    event.preventDefault();
    const defaultPageNumber = numbers.pageNumber;
    this.getExercises(defaultPageNumber);
    this.setState({pageNumber: defaultPageNumber});
  };

  render() {
    return (
      <div>
        {this.state.successMessage.showModal && modalHandler.getSuccess(this.state.successMessage)}
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
