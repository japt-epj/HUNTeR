export default {
  getTeacherCredentials() {
    return {
      email: 'tobias.saladin@hsr.ch',
      password: 'tobias',
      correctCredentials: true,
      role: 'teacher'
    };
  },

  getParticipantCredentials() {
    return {
      email: 'andi.hoerler@hsr.ch',
      password: 'andi',
      correctCredentials: true,
      role: 'participant'
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
