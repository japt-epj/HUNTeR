import {OK} from 'http-status-codes';

import {dataHandler} from '../hunterDataHandlers';
import {numbers} from '../../config/hunterUiDefaults';

export default {
  handleExerciseSubmit() {
    const routes = {
      '/participant': () => this.postData(dataHandler.prepareParticipantData({...this.state}), 'response'),
      '/teacher': () => this.postData(dataHandler.prepareTeacherData(this.state), 'exercise')
    };

    if (this.state.answerId < numbers.minAnswerId) {
      this.setState({formOk: false});
      return;
    }

    if (!Boolean(routes[window.localStorage.getItem('HUNTeR-Redirect')])) {
      console.error(
        'No correct HUNTeR-Redirect in window.localStorage: ' + window.localStorage.getItem('HUNTeR-Redirect')
      );
      return;
    }

    routes[window.localStorage.getItem('HUNTeR-Redirect')]();
  },

  handleQuizSumbit() {
    if (
      this.state.selectedPositions.size !== 0 &&
      Array.from(this.state.selectedPositions.keys()).every(key => Boolean(this.state.selectedPositions.get(key)))
    ) {
      this.postData(
        {
          name: this.state.name,
          exercises: Array.from(this.state.selectedPositions.keys()).map(key => {
            return {
              exerciseId: key,
              lat: this.state.selectedPositions.get(key).lat,
              lng: this.state.selectedPositions.get(key).lng
            };
          })
        },
        'quiz'
      );
    } else {
      this.setState({formOK: false});
    }
  },

  handleExecutionSumbit() {
    if (this.state.selectedParticipants.length !== 0 && Boolean(this.state.selectedQuizId)) {
      this.postData(
        {
          name: this.state.name,
          quizId: this.state.selectedQuizId,
          participants: this.state.selectedParticipants,
          startDate: this.state.startDate,
          endDate: this.state.endDate
        },
        'execution'
      );
    } else {
      this.setState({formOK: false});
    }
  },

  handleLoginSubmit() {
    this.postLoginData(this.state).then(resData => {
      if (resData.status !== OK) {
        this.setState({showLoginError: true});
        return;
      }

      window.localStorage.setItem('HUNTeR-Token', resData.data.tokenType + ' ' + resData.data.token);
      let now = new Date();
      window.localStorage.setItem(
        'HUNTeR-Token-Expiration',
        now.setMilliseconds(now.getMilliseconds() + resData.data.tokenLifetime).toString()
      );
      this.setState({showSuccess: true});
      setTimeout(() => {
        this.redirectAfterLogin().then(redirectData => {
          window.localStorage.setItem('HUNTeR-Redirect', redirectData.headers['x-hunter-redirect']);
          this.setState({fireRedirect: true});
        });
      }, numbers.timeoutTime);
    });
  },

  handleNewParticipantSubmit() {
    this.postData(
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      },
      'auth/register'
    );
  }
};
