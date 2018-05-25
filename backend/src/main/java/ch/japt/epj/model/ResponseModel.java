package ch.japt.epj.model;

import ch.japt.epj.library.PersonHandler;
import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.data.Response;
import ch.japt.epj.model.dto.ResponseDto;
import ch.japt.epj.model.mapping.Mappings;
import ch.japt.epj.repository.AnswerRepository;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.ExerciseRepository;
import ch.japt.epj.repository.PersonRepository;
import ch.japt.epj.repository.ResponseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ResponseModel {

  private final ExerciseRepository exercises;
  private final AnswerRepository answers;
  private final PersonRepository persons;
  private final ResponseRepository responses;
  private final ExecutionRepository executions;
  private final ModelMapper mapper = Mappings.responseMapper();

  public ResponseModel(
      @Autowired ExerciseRepository exercises,
      @Autowired AnswerRepository answers,
      @Autowired PersonRepository persons,
      @Autowired ResponseRepository responses,
      @Autowired ExecutionRepository executions) {
    this.exercises = exercises;
    this.answers = answers;
    this.persons = persons;
    this.responses = responses;
    this.executions = executions;
  }

  public void addResponse(ResponseDto responseDto) {
    Response response = mapper.map(responseDto, Response.class);
    persons.findByPersonId(PersonHandler.getCurrentPersonId()).ifPresent(response::setPerson);
    exercises.findByExerciseId(responseDto.getExerciseId()).ifPresent(response::setExercise);
    answers.findByAnswerId(responseDto.getAnswerId()).ifPresent(response::setAnswerFromPerson);
    executions
        .findByExecutionId(responseDto.getExecutionId())
        .ifPresent(
            execution -> {
              if (isFirstAnswer(execution, response)) {
                responses.save(response);
                execution.addResponse(response);
                executions.save(execution);
              }
            });
  }

  private boolean isFirstAnswer(Execution execution, Response response) {
    Long currentPersonId = PersonHandler.getCurrentPersonId();
    Long exerciseId = response.getExercise().getExerciseId();
    return (execution
        .getResponses()
        .stream()
        .filter(response1 -> currentPersonId.equals(response.getPerson().getPersonId()))
        .map(Response::getExercise)
        .noneMatch(exercise -> exerciseId.equals(exercise.getExerciseId())));
  }
}
