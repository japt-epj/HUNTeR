import {isMobile} from 'react-device-detect';
import L from 'leaflet';

let defaultUIConfig = {
  buttonColors: {
    normal: 'green',
    cancel: 'red',
    download: 'orange',
    show: 'blue'
  },
  map: {
    icons: {
      pointer: {
        icon: L.icon({
          iconUrl: require('../images/icons/e-map.png'),
          iconSize: [50, 94],
          iconAnchor: [50, 0]
        }),
        offset: [-50, 75]
      },
      protagonist: {
        icon: L.icon({
          iconUrl: require('../images/icons/protagonist.png'),
          iconSize: [33, 92],
          iconAnchor: [16, 46]
        }),
        offset: [-16, 0]
      },
      opacity: 0.9
    },
    defaultMapLocation: [47.2233607, 8.8173627]
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
  showAgreement: Boolean(window.sessionStorage.getItem('showAgreement'))
    ? JSON.parse(window.sessionStorage.getItem('showAgreement'))
    : true,
  showMobileError: Boolean(window.sessionStorage.getItem('showMobileError'))
    ? JSON.parse(window.sessionStorage.getItem('showMobileError'))
    : isMobile
};

export default Object.freeze(Object.assign({}, defaultUIConfig));
