export default {
  handleEditParticipant() {
    this.putData(
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      },
      'person'
    );
  }
};
