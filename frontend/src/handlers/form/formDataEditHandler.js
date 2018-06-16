export default {
  handleEditParticipant() {
    const {firstName, lastName, email, currentPassword, newPassword, newPasswordRepeated} = this.state;
    if (newPassword !== newPasswordRepeated) {
      this.setState({newPasswordError: true});
      return;
    }
    if (this.state.passwordRating !== 1) {
      this.setState({ispasswordWeek: true});
      return;
    }
    this.putData({firstName, lastName, email, currentPassword, newPassword}, 'person');
  }
};
