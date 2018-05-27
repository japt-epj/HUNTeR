import {isMobile} from 'react-device-detect';

let defaultUIConfig = {
  buttonColors: {
    normal: 'green',
    download: 'orange',
    show: 'blue'
  },
  paginationColor: 'green',
  defaultNumbers: {
    pageNumber: 1,
    exerciseLimitPerPage: 5,
    defaultZoomSize: 19
  },
  defaultExecutionLimit: 200,
  defaultTimeoutTime: 2000,
  maxTrophyValue: 3,
  defaultSuccessMessages: {
    exercise: {
      showModal: false,
      title: 'Aufgabe erstellt',
      content: 'Die Aufgabe wurde erfolgreich erstellt'
    },
    quiz: {
      showModal: false,
      title: 'Quiz erstellt',
      content: 'Das Quiz wurde erfolgreich erstellt'
    },
    execution: {
      showModal: false,
      title: 'Durchführung erstellt',
      content: 'Die Durchführung wurde erfolgreich erstellt'
    },
    participant: {
      showModal: false,
      title: 'Teilnehmer erstellt',
      content: 'Der Teilnehmer wurde erfolgreich erstellt'
    }
  },
  showAgreement:
    window.sessionStorage.getItem('showAgreement') !== null
      ? JSON.parse(window.sessionStorage.getItem('showAgreement'))
      : true,
  showMobileError:
    window.sessionStorage.getItem('showMobileError') !== null
      ? JSON.parse(window.sessionStorage.getItem('showMobileError'))
      : isMobile
};

export default Object.freeze(Object.assign({}, defaultUIConfig));
