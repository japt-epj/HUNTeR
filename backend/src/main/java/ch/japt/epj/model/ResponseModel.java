package ch.japt.epj.model;

import ch.japt.epj.model.dto.ResponseDto;
import ch.japt.epj.repository.AnswerRepository;
import ch.japt.epj.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ResponseModel {
  private final ExerciseRepository exercises;
  private final AnswerRepository answers;

  public ResponseModel(
      @Autowired ExerciseRepository exercises, @Autowired AnswerRepository answers) {
    this.exercises = exercises;
    this.answers = answers;
  }

  public void addResponse(ResponseDto body) {
    return;
  }
}
