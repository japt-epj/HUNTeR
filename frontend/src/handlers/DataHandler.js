export default {
  prepareTeacherData(data) {
    return {
      name: data.name,
      question: data.question,
      answers: [
        {text: data.answer0},
        {text: data.answer1},
        {text: data.answer2},
        {text: data.answer3}
      ],
      correctAnswer: data.answerId
    };
  },

  prepareParticipantData(data) {
    return {
      executionId: data.executionId,
      exerciseId: data.exerciseId,
      answerId: data.answerId
    };
  }
};
