package ch.japt.epj.model;

import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Response;
import ch.japt.epj.model.dto.ScoreDto;
import ch.japt.epj.repository.ExecutionRepository;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

@Component
public class ScoreModel {

  private final ExecutionRepository executions;
  private final ModelMapper mapper = new ModelMapper();

  public ScoreModel(@Autowired ExecutionRepository executions) {
    this.executions = executions;
  }

  public ScoreDto getScore(Long executionId, Long personId) {
    Map<String, Pair<Double, Boolean>> scoreMap = new HashMap<>();
    Execution execution =
        executions
            .findByExecutionId(executionId)
            .orElseThrow(() -> new IllegalArgumentException("Illegal executionId"));
    Integer numberOfTasks = execution.getQuiz().getTasks().size();
    for (Person participant : execution.getParticipants()) {
      Collection<Response> responses = execution.getResponses();
      Stream<Response> responsesStream = responses.stream().distinct();
      Double rightAnswers =
          Long.valueOf(
                  responsesStream
                      .filter(response -> correctResponse(response, participant))
                      .count())
              .doubleValue();
      Boolean isEqualPerson = personId.equals(participant.getPersonId());
      scoreMap.put(
          Long.toString(participant.getPersonId()),
          Pair.of(rightAnswers / numberOfTasks, isEqualPerson));
    }
    return mapper.map(scoreMap, ScoreDto.class);
  }

  private boolean correctResponse(Response response, Person participant) {
    return response.getPerson().getPersonId() == participant.getPersonId()
        && response.getAnswerFromPerson().isChecked();
  }
}
