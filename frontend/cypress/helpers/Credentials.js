export default {
  getTeacherCredentials() {
    return {
      HSR: {
        firstName: 'Tobias',
        lastName: 'Saladin',
        email: 'tobias.saladin@hsr.ch',
        password: 'tobias',
        school: 'Hochschule für Technik Rapperswil',
        correctCredentials: true,
        role: 'teacher'
      },
      PersonOfInterest: {
        firstName: 'Harold',
        lastName: 'Finch',
        email: 'harold.finch@personofinterest.com',
        password: 'harold',
        school: 'IFT',
        correctCredentials: true,
        role: 'teacher'
      },
      Westworld: {
        firstName: 'Robert',
        lastName: 'Ford',
        email: 'robert.ford@creator.westworld.com',
        password: 'robert',
        school: 'Westworld Inc',
        correctCredentials: true,
        role: 'teacher'
      }
    };
  },

  getParticipantCredentials() {
    return {
      HSR: {
        firstName: 'Andi',
        lastName: 'Hörler',
        email: 'andi.hoerler@hsr.ch',
        password: 'andi',
        school: 'Hochschule für Technik Rapperswil',
        correctCredentials: true,
        role: 'participant'
      },
      PersonOfInterest: {
        firstName: 'John',
        lastName: 'Reese',
        email: 'john.reese@personofinterest.com',
        password: 'john',
        school: 'IFT',
        correctCredentials: true,
        role: 'participant'
      },
      Westworld: {
        firstName: 'Maeve',
        lastName: 'Millay',
        email: 'maeve.millay@host.westworld.com',
        password: 'maeve',
        school: 'Westworld Inc',
        correctCredentials: true,
        role: 'participant'
      }
    };
  },

  getWrongCredentials() {
    return {
      email: 'andi.hoerler@hsr.ch',
      password: 'Andi',
      correctCredentials: false,
      role: 'participant'
    };
  }
};
