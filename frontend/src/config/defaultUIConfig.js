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
    settings: {
      showModal: false,
      title: 'Daten wurden aktualisiert',
      content: 'Die persönlichen Daten wurden erfolgreich aktualisiert.'
    },
    exercise: {
      showModal: false,
      title: 'Aufgabe erstellt',
      content: 'Die Aufgabe wurde erfolgreich erstellt.'
    },
    quiz: {
      showModal: false,
      title: 'Quiz erstellt',
      content: 'Das Quiz wurde erfolgreich erstellt.'
    },
    execution: {
      showModal: false,
      title: 'Durchführung erstellt',
      content: 'Die Durchführung wurde erfolgreich erstellt.'
    },
    participant: {
      showModal: false,
      title: 'Teilnehmer erstellt',
      content: 'Der Teilnehmer wurde erfolgreich erstellt.'
    },
    response: {
      showModal: false,
      title: 'Antwort wurde übermittelt',
      content: 'Die Antwort wurde erfolgreich übermittelt.'
    },
    scan: {
      showModal: false,
      title: 'Aufgabe wurde gefunden',
      content: 'Der QR-Code hat eine passende Aufgabe gefunden.'
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
