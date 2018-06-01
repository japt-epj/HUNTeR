export default class DefaultPaths {
  static infoIcon = 'info';
  static getPersonalPaths() {
    return [
      {path: 'settings', name: 'Persönliches', icon: 'setting'},
      {path: 'logout', name: 'Ausloggen', icon: 'log out'}
    ];
  }
  static getPathsTeacher() {
    return [
      {
        name: 'Verwaltung von Aufgaben',
        icon: this.infoIcon,
        subPaths: [
          {path: 'exercise', name: 'Aufgabe erstellen', icon: 'tasks'},
          {path: 'exerciseOverview', name: 'Übersicht der Aufgaben', icon: 'stack exchange'}
        ]
      },
      {
        name: 'Verwaltung von Quizzes',
        icon: this.infoIcon,
        subPaths: [
          {path: 'quiz', name: 'Quiz erstellen', icon: 'tasks'},
          {path: 'quizOverview', name: 'Übersicht der Quizzes', icon: 'stack exchange'}
        ]
      },
      {
        name: 'Verwaltung von Durchführungen',
        icon: this.infoIcon,
        subPaths: [
          {path: 'execution', name: 'Durchführung erstellen', icon: 'calendar'},
          {
            path: 'executionOverview',
            name: 'Übersicht der Durchführungen',
            icon: 'stack exchange'
          },
          {path: 'teacherNavigation', name: 'Navigation zu einem QR-Code Standort', icon: 'camera retro'}
        ]
      },
      {
        name: 'Verwaltung von Teilnehmern',
        icon: this.infoIcon,
        subPaths: [
          {
            path: 'leaderBoard',
            name: 'Aktuelles Leaderboard',
            icon: 'browser'
          },
          {path: 'newUser', name: 'Teilnehmer erstellen', icon: 'add user'}
        ]
      },
      {name: 'Konto-Einstellungen', subPaths: this.getPersonalPaths()}
    ];
  }
  static getPathsParticipant() {
    return [
      {
        name: 'Aufgabe lösen',
        icon: this.infoIcon,
        subPaths: [
          {
            path: 'nextLocation',
            name: 'Nächste Standorte',
            icon: 'point'
          },
          {path: 'scan', name: 'Aufgabe scannen', icon: 'camera retro'}
        ]
      },
      {
        name: 'Leaderboard',
        icon: this.infoIcon,
        subPaths: [{path: 'leaderBoard', name: 'Aktuelles Leaderboard', icon: 'trophy'}]
      },
      {
        name: 'Konto-Einstellungen',
        subPaths: this.getPersonalPaths()
      }
    ];
  }
}
