import {passwordOptions} from '../../config/hunterUiDefaults';

export default {
  handleEditParticipant() {
    const {firstName, lastName, email, currentPassword, newPassword, newPasswordRepeated} = this.state;
    if (newPassword !== newPasswordRepeated) {
      this.setState({newPasswordError: true});
      return;
    }
    console.log(this.state.passwordRating);
    if (this.state.passwordRating !== passwordOptions.minComplexity) {
      this.setState({isPasswordWeak: true});
      return;
    }
    this.putData({firstName, lastName, email, currentPassword, newPassword}, 'person');
  }
};
