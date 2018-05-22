let defaultUIConfig = {
  buttonColors: {
    normal: 'green',
    download: 'orange'
  },
  defaultNumbers: {
    pageNumber: 1,
    exerciseLimitPerPage: 5,
    defaultZoomSize: 19
  },
  defaultTimeoutTime: 2500,
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
      title: 'Ausführung erstellt',
      content: 'Die Ausführung wurde erfolgreich erstellt'
    }
  },
  showAgreement:
    window.sessionStorage.getItem('showAgreement') !== null
      ? JSON.parse(window.sessionStorage.getItem('showAgreement'))
      : true
};

export default Object.freeze(Object.assign({}, defaultUIConfig));
