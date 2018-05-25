package ch.japt.epj.model;

import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Response;
import ch.japt.epj.model.dto.ScoreDto;
import ch.japt.epj.repository.AnswerRepository;
import ch.japt.epj.repository.ExecutionRepository;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;
import javafx.util.Pair;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ScoreModel {

  private final ExecutionRepository executions;
  private final AnswerRepository answers;
  private final ModelMapper mapper = new ModelMapper();

  //  private final ResponseRepository responses;

  public ScoreModel(
      @Autowired ExecutionRepository executions,
      @Autowired AnswerRepository answers /*, @Autowired  ResponseRepository responses*/) {
    this.executions = executions;
    this.answers = answers;
    //    this.responses = responses;
  }

  public ScoreDto getScore(Long executionId, Long personId) {
    Map<String, Pair<Integer, Boolean>> scoreMap = new HashMap<>();
    Execution execution =
        executions
            .findByExecutionId(executionId)
            .orElseThrow(() -> new IllegalArgumentException("Illegal executionId"));
    Stream<Response> responses = execution.getResponses().stream().distinct();
    for (Person participant : execution.getParticipants()) {
      Integer rightAnswers =
          new Long(
                  responses
                      .filter(
                          response ->
                              response.getPerson().getPersonId() == participant.getPersonId()
                                  && response.getAnswerFromPerson().isChecked())
                      .count())
              .intValue();
      Boolean isEqualPerson = personId.equals(participant.getPersonId());
      scoreMap.put(
          Long.toString(participant.getPersonId()), new Pair<>(rightAnswers, isEqualPerson));
    }
    return mapper.map(scoreMap, ScoreDto.class);
  }
}
