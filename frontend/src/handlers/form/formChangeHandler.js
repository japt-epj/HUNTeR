export default {
  handleChange(event, target) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [target.name]: value
    });
  },

  handleAnswerSelectChange(event, {value}) {
    this.setState({answerId: value});
  },

  handleQuizSelectChange(event, {value}) {
    this.setState({selectedQuizId: value});
  }
};
