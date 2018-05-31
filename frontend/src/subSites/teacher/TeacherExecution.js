import React from 'react';
import {Redirect} from 'react-router-dom';

import {OK} from 'http-status-codes';
import DateTime from 'react-datetime';
import {Button, Form, Grid, Header, Modal} from 'semantic-ui-react';
import moment from 'moment';
import 'moment/locale/de-ch';
import '../../style/react-datetime.css';

import {colors, modalOptions, numbers} from '../../config/hunterUiDefaults';
import {apiGetHandler, apiPostHandler} from '../../handlers/hunterApiHandler';
import {formHandler} from '../../handlers/hunterDataHandlers';
import {modalHandler, participantHandler, quizHandler, tableHandler} from '../../handlers/hunterViewHandlers';
import getLoadingScreen from '../../components/getLoadingScreen';

export default class TeacherExecution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successMessage: modalOptions.execution,
      formOK: true,
      name: '',
      participants: [],
      quizzes: [],
      bulkCheckboxes: [],
      selectedQuizId: undefined,
      selectedParticipants: [],
      loadingParticipants: true,
      loadingQuizzes: true,
      pageNumber: numbers.pageNumber,
      minPage: 1,
      maxPageQuizzes: '',
      maxPageParticipants: '',
      modifiers: {
        highlighted: new Date(),
        after: new Date().getDate() + 1
      },
      fireRedirect: false,
      startDate: moment(),
      endDate: moment().add(1, 'hour')
    };

    this.getParticipantTable = participantHandler.getParticipantTable.bind(this);
    this.handleSingleSelection = participantHandler.handleSingleSelection.bind(this);
    this.handleBulkSelection = participantHandler.handleBulkSelection.bind(this);
    this.getQuizTable = quizHandler.getQuizTable.bind(this);

    this.getSubmitCancelButton = tableHandler.getSubmitCancelButton.bind(this);
    this.handleSubmit = formHandler.handleExecutionSumbit.bind(this);
    this.handleChange = formHandler.handleChange.bind(this);
    this.handleQuizSelectChange = formHandler.handleQuizSelectChange.bind(this);
    this.postData = apiPostHandler.postData.bind(this);
    this.getFormError = modalHandler.getFormError.bind(this);
  }

  componentDidMount() {
    this.getParticipants(this.state.pageNumber);
    this.getQuizzes(this.state.pageNumber);
  }

  getParticipants = page => {
    apiGetHandler.getPaginatedElements('person', page).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      this.setState({
        participants: resData.data.content,
        maxPageParticipants: resData.data.totalPages,
        loadingParticipants: false
      });
    });
  };

  getQuizzes = page => {
    apiGetHandler.getPaginatedElements('quiz', page).then(resData => {
      if (resData.status !== OK) {
        return;
      }
      this.setState({
        quizzes: resData.data.content,
        maxPageQuizzes: resData.data.totalPages,
        loadingQuizzes: false
      });
    });
  };

  handlePageChangeParticipants = (event, element) => {
    this.setState({
      pageNumber: element.activePage
    });
    this.getParticipants(element.activePage);
  };

  handlePageChangeQuizzes = (event, element) => {
    this.setState({
      pageNumber: element.activePage
    });
    this.getQuizzes(element.activePage);
  };

  resetPageNumber = event => {
    event.preventDefault();
    const defaultPageNumber = 1;
    this.getParticipants(defaultPageNumber);
    this.getQuizzes(defaultPageNumber);
    this.setState({pageNumber: defaultPageNumber});
  };

  handleStartMomentChange = event => {
    if (event._d >= this.state.endDate) {
      this.setState({endDate: moment(event._d).add(1, 'hour')});
    }
    this.setState({startDate: moment(event._d)});
  };

  handleEndMomentChange = event => {
    this.setState({endDate: moment(event._d)});
  };

  isStartDateValid = current => {
    return current.isAfter(moment().add(-1, 'day'));
  };

  isEndDateValid = current => {
    return current.isAfter(this.state.startDate);
  };

  render() {
    return (
      <div>
        {this.state.successMessage.showModal && modalHandler.getCreationSuccess(this.state.successMessage)}
        {!this.state.formOK &&
          this.getFormError('Kein Quiz ausgewählt oder keine Teilnehmer der Durchführung zugeordnet.')}
        <Form onSubmit={this.handleSubmit}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <Form.Input
                  fluid
                  label="Name der Durchführung"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Bitte geben Sie einen Name für die Durchführung ein."
                  required
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal">
              <Grid.Column>
                <Modal
                  dimmer={modalOptions.dimmer}
                  size={modalOptions.size}
                  trigger={
                    <Button
                      color={colors.buttonColors.normal}
                      icon="add square"
                      labelPosition="right"
                      label="Quiz für die Durchführung auswählen"
                      onClick={this.resetPageNumber}
                    />
                  }
                  closeIcon
                >
                  <Modal.Header content="Quiz auswählen" />
                  <Modal.Content scrolling>
                    {this.state.loadingQuizzes ? getLoadingScreen() : this.getQuizTable(true)}
                  </Modal.Content>
                </Modal>
              </Grid.Column>
              <Grid.Column>
                <Modal
                  dimmer={modalOptions.dimmer}
                  size="fullscreen"
                  trigger={
                    <Button
                      color={colors.buttonColors.normal}
                      icon="add square"
                      labelPosition="right"
                      label="Benutzer zur Durchführung hinzufügen"
                      onClick={this.resetPageNumber}
                    />
                  }
                  closeIcon
                >
                  <Modal.Header content="Benutzer hinzufügen" />
                  <Modal.Content scrolling>
                    {this.state.loadingUser ? getLoadingScreen() : this.getParticipantTable(true)}
                  </Modal.Content>
                </Modal>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="equal" textAlign="center" id="dateTimePickerContainer">
              <Grid.Column>
                <Header content="Startdatum mit Uhrzeit eintragen" />
                <DateTime
                  isValidDate={this.isStartDateValid}
                  value={this.state.startDate}
                  onChange={this.handleStartMomentChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Header content="Enddatum mit Uhrzeit eintragen" />
                <DateTime
                  isValidDate={this.isEndDateValid}
                  value={this.state.endDate}
                  onChange={this.handleEndMomentChange}
                />
              </Grid.Column>
            </Grid.Row>
            {this.getSubmitCancelButton()}
          </Grid>
          {this.state.fireRedirect && <Redirect to="/" />}
        </Form>
      </div>
    );
  }
}
