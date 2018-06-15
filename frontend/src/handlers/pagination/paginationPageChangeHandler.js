import {apiGetHandler} from '../hunterApiHandlers';
import {OK} from 'http-status-codes/index';

export default {
  pageChangeQuizzes(event, element) {
    this.setState({
      pageNumber: element.activePage
    });
    this.getQuizzes(element.activePage);
  },

  pageChangeExercises(event, element) {
    this.setState({
      pageNumber: element.activePage
    });
    this.getExercises(element.activePage);
  },

  pageChangeParticipants(event, element) {
    this.setState({
      pageNumber: element.activePage
    });
    this.getParticipants(element.activePage);
  },

  pageChangeExecutions(event, element) {
    this.setState({
      pageNumber: element.activePage
    });
    this.getExecutions(element.activePage);
  },

  pageChangeSelectedExercises(event, element) {
    let currentPage = element.activePage;
    this.setState({pageNumberSelectedExercises: element.activePage});
    apiGetHandler
      .getElementArray(
        'exercise/',
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
  }
};
