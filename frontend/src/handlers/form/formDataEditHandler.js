export default {
  handleEditParticipant() {
    this.putData(
      {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      },
      'person'
    );
  }
};
