export default {
  handleEditParticipant() {
    const {firstName, lastName, email, oldPassword, newPassword, newPasswordRepeated} = this.state;
    if (newPassword !== newPasswordRepeated) {
      this.setState({passwordError: true});
      return;
    }
    this.putData({firstName, lastName, email, oldPassword, newPassword}, 'person');
  }
};
