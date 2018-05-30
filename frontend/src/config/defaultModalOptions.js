let defaultModalOptions = {
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
  },
  dimmer: 'blurring',
  thankYou: 'OK, danke'
};

export default Object.freeze(Object.assign({}, defaultModalOptions));
