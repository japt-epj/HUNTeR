package ch.japt.epj.model;

import ch.japt.epj.model.data.Execution;
import ch.japt.epj.model.data.Person;
import ch.japt.epj.model.data.Response;
import ch.japt.epj.model.dto.ScoreDto;
import ch.japt.epj.repository.AnswerRepository;
import ch.japt.epj.repository.ExecutionRepository;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
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

  public ScoreDto getScore(Long executionId) {
    Map<Long, Integer> scoreMap = new HashMap<>();
    Execution execution =
        executions
            .findByExecutionId(executionId)
            .orElseThrow(() -> new IllegalArgumentException("Illegal executionId"));
    Collection<Response> responses = execution.getResponses();
    Collection<Person> participants = execution.getParticipants();
    for (Person participant : participants) {
      scoreMap.put(participant.getPersonId(), 0);

      for (Response response : responses) {
        if (response.getPerson().getPersonId() == participant.getPersonId()
            && response.getAnswerFromPerson().isChecked()) {
          scoreMap.put(participant.getPersonId(), scoreMap.get(participant.getPersonId()) + 1);
        }
      }
    }
    return mapper.map(execution, ScoreDto.class);
  }
}
