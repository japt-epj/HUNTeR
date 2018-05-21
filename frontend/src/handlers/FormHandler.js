import APIHandler from './APIHandler';

export default {
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  },

  handleAnswerSelectChange(event, {value}) {
    this.setState({answerId: value});
  },

  handleQuizSelectChange(event, {value}) {
    this.setState({selectedQuizId: value});
  },

  handleExerciseSubmit() {
    let isACheckboxSet = this.state.answerId >= 0 && this.state.answerId <= 3;
    if (isACheckboxSet) {
      let userType = window.location.pathname.split('/')[1];
      if (userType === 'teacher') {
        this.postData(APIHandler.prepareTeacherData(this.state), 'exercise');
      } else {
        this.postData(
          APIHandler.prepareParticipantData(this.state),
          'response'
        );
      }
    } else {
      this.setState({formOK: false});
    }
  },

  handleQuizSumbit() {
    if (
      this.state.selectedPositions.size !== 0 &&
      Array.from(this.state.selectedPositions.keys()).every(
        key => this.state.selectedPositions.get(key) !== undefined
      )
    ) {
      this.postData(
        {
          name: this.state.name,
          exercises: Array.from(this.state.selectedPositions.keys()).map(
            key => {
              return {
                exerciseId: key,
                lat: this.state.selectedPositions.get(key).lat,
                lng: this.state.selectedPositions.get(key).lng
              };
            }
          ),
          //TODO: Get currentPersonId and post
          creator: Math.floor(Math.random() * 15) + 1
        },
        'quiz'
      );
    } else {
      this.setState({formOK: false});
    }
  },

  handleExecutionSumbit() {
    if (
      this.state.selectedParticipants.length !== 0 &&
      this.state.selectedQuizId !== undefined
    ) {
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
      if (resData.status >= 200 && resData.status < 300) {
        window.localStorage.setItem(
          'HUNTeR-Token',
          resData.data.tokenType + ' ' + resData.data.token
        );
        this.setState({showSuccess: true});
        setTimeout(() => {
          this.redirectAfterLogin().then(redirectData => {
            window.localStorage.setItem(
              'HUNTeR-Redirect',
              redirectData.headers['x-hunter-redirect']
            );
            this.setState({fireRedirect: true});
          });
        }, 2500);
      } else {
        this.setState({showLoginError: true});
      }
    });
  },

  handleNewParticipantSubmit() {
    this.postData(this.state, 'person');
  },

  handleEditParticipant() {
    this.putData(
      {
        id: this.state.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      },
      'person'
    );
  }
};
