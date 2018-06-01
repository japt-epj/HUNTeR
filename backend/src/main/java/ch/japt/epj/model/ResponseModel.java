package ch.japt.epj.model;

import ch.japt.epj.library.PersonHandler;
import ch.japt.epj.model.data.Response;
import ch.japt.epj.model.dto.ResponseDto;
import ch.japt.epj.repository.ExecutionRepository;
import ch.japt.epj.repository.ResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ResponseModel {

  private final ResponseRepository responses;
  private final ExecutionRepository executions;

  public ResponseModel(
      @Autowired ResponseRepository responses, @Autowired ExecutionRepository executions) {
    this.responses = responses;
    this.executions = executions;
  }

  public void addResponse(ResponseDto responseDto) {
    Response response =
        responses.fromDtoData(
            PersonHandler.getCurrentPersonId(),
            responseDto.getExerciseId(),
            responseDto.getAnswerId());

    if (unanswered(responseDto)) {
      executions
          .findByExecutionId(responseDto.getExecutionId())
          .ifPresent(
              e -> {
                responses.save(response);
                e.addResponse(response);
                executions.save(e);
              });
    }
  }

  private boolean unanswered(ResponseDto dto) {
    return !responses
        .answerExists(PersonHandler.getCurrentPersonId(), dto.getExerciseId())
        .isPresent();
  }
}
