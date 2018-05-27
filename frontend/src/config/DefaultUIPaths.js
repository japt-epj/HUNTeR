export default class defaultUIPaths {
  static defaultInfoIcon = 'info';

  static getPersonalPaths() {
    return [
      {
        path: 'settings',
        name: 'Persönliches',
        icon: 'setting'
      },
      {path: 'logout', name: 'Ausloggen', icon: 'log out'}
    ];
  }

  static getPathsTeacher() {
    return [
      {
        name: 'Verwaltung von Aufgaben',
        icon: this.defaultInfoIcon,
        subPaths: [
          {path: 'exercise', name: 'Aufgabe erstellen', icon: 'tasks'},
          {
            path: 'exerciseOverview',
            name: 'Übersicht der Aufgaben',
            icon: 'stack exchange'
          }
        ]
      },
      {
        name: 'Verwaltung von Quizzes',
        icon: this.defaultInfoIcon,
        subPaths: [
          {path: 'quiz', name: 'Quiz erstellen', icon: 'tasks'},
          {
            path: 'quizOverview',
            name: 'Übersicht der Quizzes',
            icon: 'stack exchange'
          }
        ]
      },
      {
        name: 'Verwaltung von Ausführungen',
        icon: this.defaultInfoIcon,
        subPaths: [
          {path: 'execution', name: 'Ausführung erstellen', icon: 'calendar'},
          {
            path: 'executionOverview',
            name: 'Übersicht der Ausführungen',
            icon: 'stack exchange'
          },
          {
            path: 'teacherNavigation',
            name: 'Navigation zu einem QR-Code Standort',
            icon: 'camera retro'
          }
        ]
      },
      {
        name: 'Verwaltung von Studenten',
        icon: this.defaultInfoIcon,
        subPaths: [
          {
            path: 'participantLeaderBoard',
            name: 'Aktuelles Leaderboard',
            icon: 'browser'
          },
          {path: 'newUser', name: 'Schüler erstellen', icon: 'add user'}
        ]
      },
      {
        name: 'Konto-Einstellungen',
        subPaths: this.getPersonalPaths()
      }
    ];
  }

  static getPathsParticipant() {
    return [
      {
        name: 'Aufgabe lösen',
        icon: this.defaultInfoIcon,
        subPaths: [
          {
            path: 'nextLocation',
            name: 'Nächste Standorte',
            icon: 'point'
          },
          {
            path: 'scan',
            name: 'Aufgabe scannen',
            icon: 'camera retro'
          }
        ]
      },
      {
        name: 'LeaderBoard',
        icon: this.defaultInfoIcon,
        subPaths: [
          {
            path: 'score',
            name: 'Aktuelles Leaderboard',
            icon: 'trophy'
          }
        ]
      },
      {
        name: 'Konto-Einstellungen',
        subPaths: this.getPersonalPaths()
      }
    ];
  }
}
